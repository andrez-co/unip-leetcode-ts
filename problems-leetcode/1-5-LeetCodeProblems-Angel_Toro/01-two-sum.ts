export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();

  for (let index = 0; index < nums.length; index += 1) {
    const current = nums[index];
    const complement = target - current;
    const complementIndex = seen.get(complement);

    if (complementIndex !== undefined) {
      return [complementIndex, index];
    }

    seen.set(current, index);
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([3, 3], 6));
