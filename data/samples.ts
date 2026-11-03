import arithmetic from "./programs/int_arith.lf?raw";
import bounds from "./programs/bounded_types.lf?raw";
import collatz from "./programs/while_collatz.lf?raw";
import comptime from "./programs/comptime_const.lf?raw";
import factorial from "./programs/factorial.lf?raw";
import fibonacci from "./programs/fibonacci.lf?raw";
import fizzbuzz from "./programs/fizzbuzz.lf?raw";
import hello from "./programs/hello.lf?raw";
import lists from "./programs/list_basics.lf?raw";
import logs from "./programs/logs.lf?raw";
import macros from "./programs/splice.lf?raw";
import matchOpen from "./programs/match_open.lf?raw";
import nominalInt from "./programs/nominal_int.lf?raw";
import nominalText from "./programs/nominal_text.lf?raw";
import primes from "./programs/primes.lf?raw";
import records from "./programs/records.lf?raw";
import results from "./programs/result_match.lf?raw";
import sums from "./programs/sum_payload.lf?raw";
import text from "./programs/text_trim_lower.lf?raw";

export interface Sample {
  readonly id: string;
  readonly label: string;
  readonly module: string;
  readonly source: string;
}

export const samples: readonly Sample[] = [
  { id: "hello", label: "Hello", module: "hello", source: hello },
  { id: "factorial", label: "Factorial", module: "factorial", source: factorial },
  { id: "fibonacci", label: "Fibonacci", module: "fibonacci", source: fibonacci },
  { id: "fizzbuzz", label: "FizzBuzz", module: "fizzbuzz", source: fizzbuzz },
  { id: "primes", label: "Primes", module: "primes", source: primes },
  { id: "int_arith", label: "Arithmetic", module: "int_arith", source: arithmetic },
  { id: "logs", label: "Text log", module: "logs", source: logs },
  { id: "list_basics", label: "Lists", module: "list_basics", source: lists },
  { id: "records", label: "Records", module: "records", source: records },
  { id: "sum_payload", label: "Sums", module: "sum_payload", source: sums },
  { id: "match_open", label: "Match", module: "match_open", source: matchOpen },
  { id: "result_match", label: "Results", module: "result_match", source: results },
  { id: "nominal_text", label: "Nominal text", module: "nominal_text", source: nominalText },
  { id: "nominal_int", label: "Nominal integers", module: "nominal_int", source: nominalInt },
  { id: "bounded_types", label: "Bounds", module: "bounded_types", source: bounds },
  { id: "text_trim_lower", label: "Trim and lower", module: "text_trim_lower", source: text },
  { id: "while_collatz", label: "Collatz", module: "while_collatz", source: collatz },
  { id: "comptime_const", label: "Comptime", module: "comptime_const", source: comptime },
  { id: "splice", label: "Macros", module: "splice", source: macros },
];

export const initialSampleId = "factorial";
