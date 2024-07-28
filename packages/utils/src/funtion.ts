export function removeT<T>(
  arr: Array<T>,
  keys: string[] = ["createTime", "updateTime"],
) {
  for (const foo of arr) {
    for (const key of keys) {
      foo[key] = foo[key]?.replace("T", " ");
    }
  }
  return arr;
}
