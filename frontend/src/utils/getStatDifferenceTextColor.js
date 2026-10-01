export function getStatDifferenceTextColor(totalStatDifference, scrollsUsed) {
  if (totalStatDifference < 0) {
    return "#bbbbbb";
  } else if (totalStatDifference <= 5 && !scrollsUsed) {
    return "white";
  } else if (totalStatDifference <= 5) {
    return "#ff8811";
  } else if (totalStatDifference <= 22) {
    return "#55aaff";
  } else if (totalStatDifference <= 39) {
    return "#cc66ff";
  } else if (totalStatDifference <= 54) {
    return "#ffff11";
  } else if (totalStatDifference <= 69) {
    return "#55ff55";
  } else {
    return "#ff5555";
  }
}
