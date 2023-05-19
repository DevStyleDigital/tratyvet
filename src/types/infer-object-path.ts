type Primitives = string | number | bigint | boolean | undefined | symbol;
export type InferObjectPath<T, Prefix = ''> = {
  [K in keyof T]: T[K] extends Primitives | Array<any>
    ? `${string & Prefix}${string & K}`
    :
        | `${string & Prefix}${string & K}`
        | InferObjectPath<T[K], `${string & Prefix}${string & K}.`>;
}[keyof T];
