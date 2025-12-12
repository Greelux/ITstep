function isPerfectNumber(n) {
  if (n <= 1) return false; // досконалі числа починаються з 6

  let sum = 1; // 1 завжди дільник (крім n = 1)

  for (let i = 2; i <= n - 1; i++) {
    if (n % i === 0) {
      sum += i;
    }
  }

  return sum === n;
}

// Приклади
console.log(isPerfectNumber(6));   // true (1 + 2 + 3 = 6)
console.log(isPerfectNumber(28));  // true (1 + 2 + 4 + 7 + 14 = 28)
console.log(isPerfectNumber(12));  // false
