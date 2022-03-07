export function nonNullable<T>(object: T): T {
  for (const key of Object.keys(object) as (keyof T)[]) {
    if (object[key] === null || object[key] === undefined) delete object[key];
  }
  return object;
}

console.log('one')
console.log('one')
console.log('one')
