/**
 * LeetCode 1 - Two Sum
 *
 * Given an array of integers and a target, returns the indexes of the two
 * numbers that add up to the target.
 *
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
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

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
console.log(twoSum([3, 3], 6)); // [0, 1]
