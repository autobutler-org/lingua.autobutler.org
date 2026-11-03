/**
 * The browser compiler. `public/lingua.wasm` is the `lingua-wasm` cdylib.
 * A module key and source go in. JSON for that module comes out.
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
  readonly lingua_compile_in: (key: number, keyLen: number, src: number, srcLen: number) => number;
  readonly lingua_free: (ptr: number) => void;
}

export async function loadCompiler(
  bytes: BufferSource
): Promise<(module: string, source: string) => CompilerViews> {
  const { instance } = await WebAssembly.instantiate(bytes, {});
  const wasm = instance.exports as unknown as WasmExports;
  return (module: string, source: string) => compile(wasm, module, source);
}

function writeBytes(wasm: WasmExports, bytes: Uint8Array): number {
  const ptr = wasm.lingua_alloc(bytes.length);
  new Uint8Array(wasm.memory.buffer).set(bytes, ptr);
  return ptr;
}

function compile(wasm: WasmExports, module: string, source: string): CompilerViews {
  const key = new TextEncoder().encode(module);
  const encoded = new TextEncoder().encode(source);
  const keyPtr = writeBytes(wasm, key);
  const srcPtr = writeBytes(wasm, encoded);
  const out = wasm.lingua_compile_in(keyPtr, key.length, srcPtr, encoded.length);
  wasm.lingua_dealloc(keyPtr, key.length);
  wasm.lingua_dealloc(srcPtr, encoded.length);
  const view = new DataView(wasm.memory.buffer);
  const length = view.getUint32(out, true);
  const json = new TextDecoder().decode(new Uint8Array(wasm.memory.buffer, out + 4, length));
  wasm.lingua_free(out);
  return JSON.parse(json) as CompilerViews;
}
