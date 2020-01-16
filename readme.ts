export type UnpackPromise<T> = T extends Promise<Array<infer U>>
  ? U[]
  : T extends Promise<infer D>
  ? D
  : T;

type DeltaFn<ARG extends any[], R> = (
  ...args: UnpackPromise<ARG>
) => R | PromiseLike<R>;

function s() {}
export default s;
