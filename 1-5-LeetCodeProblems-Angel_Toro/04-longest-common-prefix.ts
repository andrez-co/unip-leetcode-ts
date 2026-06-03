export function longestCommonPrefix(strs: string[]): string {
  let prefix = strs[0];

  for (let index = 1; index < strs.length; index += 1) {
    while (!strs[index].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);

      if (prefix === '') {
        return '';
      }
    }
  }

  return prefix;
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));
