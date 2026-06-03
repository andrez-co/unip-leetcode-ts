export function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs = new Map<string, string>([
    [')', '('],
    ['}', '{'],
    [']', '['],
  ]);

  for (const char of s) {
    const expectedOpen = pairs.get(char);

    if (expectedOpen === undefined) {
      stack.push(char);
      continue;
    }

    if (stack.pop() !== expectedOpen) {
      return false;
    }
  }

  return stack.length === 0;
}

console.log(isValid('()'));
console.log(isValid('()[]{}'));
console.log(isValid('(]'));
console.log(isValid('([])'));
console.log(isValid('([)]'));
