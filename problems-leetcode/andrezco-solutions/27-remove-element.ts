function removeElement(nums: number[], val: number): number {
  let insertPosition = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[insertPosition] = nums[i];
      insertPosition++;
    }
  }

  return insertPosition;
}

export { removeElement };
