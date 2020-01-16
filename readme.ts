import { F } from "ts-toolbelt";

function createBaraFormula<Fn extends F.Function>(f: Fn) {
  return <T>(payload: T): PromiseLike<ReturnType<typeof f>> => Promise.resolve(f(payload))
}

export default function s<Fns extends F.Function[]>(
  ...args: F.Piper<Fns, "async">
): F.Piped<Fns, "async"> {
  return async payload => {
    let last = payload;
    for (const f of args) {
      last = await createBaraFormula(f)(last);
    }
    return await Promise.resolve(last);
  };
}

(async () => {
  const result = await s(
    async (a1: number) => Promise.resolve(`${a1}`),
    async (z) => `${z} + meo` !== '',
    async (b) => b === false
  )(42);
  result;
})();
