/**
 * Function responsible for receiving the whole collection of digits
 * and extracting the 1 or 2 that won't for a trio for a hundred.
 * (Example: 12,345 => the 12 would be extracted from the trio (345))
 * @param separatedDigits
 */
export const extraDigitsExtractor = (separatedDigits: string[]) => {
  const extraDigits = [];

  // Loop through the array of separated digits to add just the first
  // one or two extra digits to its own array
  if (separatedDigits.length > 3 && separatedDigits.length % 3) {
    const extraHouses = separatedDigits.length % 3;
    for (let i = 0; i < extraHouses; i++) {
      extraDigits.push(separatedDigits[i]);
    }
  }
  return extraDigits;
};
