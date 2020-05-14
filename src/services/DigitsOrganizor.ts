/**
 * Function responsible for receiving the whole collection of digits
 * and extracting the 1 or 2 that don't work for a trio of hundred.
 * (Example: 12,345 => the 12 would be extracted from the trio (345))
 * @param separatedDigits
 */
export const extraDigitsExtractor = (separatedDigits: string[]) => {
  const extraDigits = [];

  if (separatedDigits.length > 3 && separatedDigits.length % 3) {
    const extraHouses = separatedDigits.length % 3;
    for (let i = 0; i < extraHouses; i++) {
      extraDigits.push(separatedDigits[i]);
    }
  }
  return extraDigits;
};

/**
 * Function responsible to keep the main digits of the number,
 * excluding those listed in the "Extra Digits".
 * @param separatedDigits
 */
export const mainDigitsExtractor = (separatedDigits: string[]) => {
  if (separatedDigits.length > 3 && separatedDigits.length % 3) {
    const extraHouses = separatedDigits.length % 3;
    for (let i = 0; i < extraHouses; i++) {
      separatedDigits.shift();
    }
  }

  return separatedDigits;
};

/**
 * Function responsible for receiving the main digits (excluding the
 * extra digits) and organizing them in sub-arrays of TRIOS (hundreds).
 * @param mainDigits
 */
export const arrayOfTriosCreator = (mainDigits: string[]) => {
  let arrayOfTrios = [];

  let i,
    j,
    hundredHouses,
    parts = 3;
  for (i = 0, j = mainDigits.length; i < j; i += parts) {
    hundredHouses = mainDigits.slice(i, i + parts);
    arrayOfTrios.push(hundredHouses);
  }

  return arrayOfTrios;
};
