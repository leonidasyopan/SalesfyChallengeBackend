/**
 * Function responsible for separating each digit of the string
 * and storing them into an array. Returns an Array of digits.
 * @param naturalNumber
 */
export const digitSeparator = (naturalNumber: string) => {
  const separatedDigits = ("" + naturalNumber).split("");

  return separatedDigits;
};
