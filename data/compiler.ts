/**
 * The browser compiler. `public/lingua.wasm` is the `lingua-wasm` cdylib:
 * source bytes in, JSON out for module `factorial`.
 */

export interface CompilerViews {
  readonly tokens: string;
  readonly ast: string;
  readonly tir: string;
  readonly lir: string;
  readonly assembly: string;
  readonly run: string;
}

interface WasmExports {
  readonly memory: WebAssembly.Memory;
  readonly lingua_alloc: (size: number) => number;
  readonly lingua_dealloc: (ptr: number, size: number) => void;
  readonly lingua_compile: (ptr: number, len: number) => number;
  readonly lingua_free: (ptr: number) => void;
}

export async function loadCompiler(
  bytes: BufferSource
): Promise<(source: string) => CompilerViews> {
  const { instance } = await WebAssembly.instantiate(bytes, {});
  const wasm = instance.exports as unknown as WasmExports;
  return (source: string) => compile(wasm, source);
}

function compile(wasm: WasmExports, source: string): CompilerViews {
  const encoded = new TextEncoder().encode(source);
  const ptr = wasm.lingua_alloc(encoded.length);
  new Uint8Array(wasm.memory.buffer).set(encoded, ptr);
  const out = wasm.lingua_compile(ptr, encoded.length);
  wasm.lingua_dealloc(ptr, encoded.length);
  const view = new DataView(wasm.memory.buffer);
  const length = view.getUint32(out, true);
  const json = new TextDecoder().decode(new Uint8Array(wasm.memory.buffer, out + 4, length));
  wasm.lingua_free(out);
  return JSON.parse(json) as CompilerViews;
}
