export function isPositiveNumberInput(value) {
  return value !== "" && Number(value) > 0;
}

export function isNonNegativeNumberInput(value) {
  return value !== "" && Number(value) >= 0;
}
