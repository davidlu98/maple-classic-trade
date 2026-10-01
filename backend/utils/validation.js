function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function isPositiveIntegerBelow(value, max) {
  return Number.isInteger(value) && value > 0 && value < max;
}

function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

module.exports = {
  isPositiveInteger,
  isPositiveIntegerBelow,
  isNonNegativeInteger,
};
