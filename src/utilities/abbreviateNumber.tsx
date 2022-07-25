import React from "react";

export const abbreviateNumber = (value: number, integar = false) => {
  var newValue = value.toFixed(1);
  if (value >= 1000) {
    var suffixes = ["", "k", "m", "b", "t"];
    const shortenValue = value.toFixed(0);
    var suffixNum = Math.floor(("" + shortenValue).length / 3);
    var shortValue;
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? Number(shortenValue) / Math.pow(1000, suffixNum)
          : Number(shortenValue)
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue && shortValue % 1 != 0) {
      shortValue = shortValue.toFixed(1);
    }
    newValue = shortValue + suffixes[suffixNum];
  } else if (integar) {
    newValue = value.toFixed(0);
  } else if (value >= 10) {
    newValue = value.toFixed(1);
  } else if (value >= 0.1) {
    newValue = value.toFixed(2);
  } else if (value == 0) {
    newValue = "0";
  } else if (value < 0.1) {
    newValue = value.toFixed(3);
  }
  return newValue;
};
