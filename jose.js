// var missingNumber = function (numbers) {
//   const arr = numbers.sort()

//   for (let i = numbers.length - 1; i >= 0; i--) {
//     const prev = arr[i - 1]

//     if (!(arr[i] - 1 === prev)) {
//       return i
//     }
//   }
// }

var missingNumber = function (nums) {
  const n = nums.length
  const expectedSum = (n * (n + 1)) / 2
  let actualSum = 0

  for (let i = 0; i < nums.length; i++) {
    actualSum = actualSum + nums[i]
  }

  return expectedSum - actualSum
}

console.log(missingNumber([0, 1]))
