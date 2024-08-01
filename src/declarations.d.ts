declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'papaparse' {
  const Papa: any;
  export = Papa;
}

// // src/types/papaparse.d.ts
// declare module 'papaparse' {
//   export interface ParseConfig {
//     complete?: (results: ParseResult) => void;
//     // add other config properties as needed
//   }

//   export interface ParseResult {
//     data: any[];
//     // add other result properties as needed
//   }

//   export function parse(input: string | File, config?: ParseConfig): void;
// }


