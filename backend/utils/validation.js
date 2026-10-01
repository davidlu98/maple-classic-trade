function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

module.exports = {
  isPositiveInteger,
  isNonNegativeInteger,
};
