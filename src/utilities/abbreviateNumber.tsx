export const abbreviateNumber = (value: number, integar = false) => {
  const getDecimalPointLength = function (number: number) {
    const numbers = String(number).split(".");
    return numbers[1] ? numbers[1].length : 0;
  };
  const numbers = getDecimalPointLength(value);

  let newValue = numbers > 0 && value.toFixed(1);
  if (value >= 1000) {
    const suffixes = ["", "k", "m", "b", "t"];
    const shortenValue = value.toFixed(0);
    const suffixNum = Math.floor(("" + shortenValue).length / 3);
    let shortValue;
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0 ? Number(shortenValue) / Math.pow(1000, suffixNum) : Number(shortenValue)).toPrecision(
          precision
        )
      );
      const dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
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
    if (numbers > 2) {
      newValue = value.toFixed(3);
    } else {
      if (value != null) {
        newValue = value.toString();
      }
    }
  }
  return newValue;
};
