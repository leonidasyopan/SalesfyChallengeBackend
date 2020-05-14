/**
 * Function responsible for checking the occurrence of Zeros by
 * listing them inside an Array of ONLY zeros.
 * @param naturalNumber
 */
export const occurenceOfZeros = (naturalNumber: string) => {
  const regexForIdentifyingZeros = /0/g;

  const occurrencesOfZero = naturalNumber.match(regexForIdentifyingZeros);

  return occurrencesOfZero;
};
