export function isPalindrome(x: number): boolean {
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let remaining = x;
  let reversedHalf = 0;

  while (remaining > reversedHalf) {
    reversedHalf = reversedHalf * 10 + (remaining % 10);
    remaining = Math.trunc(remaining / 10);
  }

  return (
    remaining === reversedHalf || remaining === Math.trunc(reversedHalf / 10)
  );
}

console.log(isPalindrome(121));
console.log(isPalindrome(-121));
console.log(isPalindrome(10));
