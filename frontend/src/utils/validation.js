export function isPositiveNumberInput(value) {
  return value !== "" && Number(value) > 0;
}

export function isPositiveNumberBelow(value, max) {
  return value !== "" && Number(value) > 0 && Number(value) < max;
}

export function isNonNegativeNumberInput(value) {
  return value !== "" && Number(value) >= 0;
}
