/**
 * Function to change double spaces for single spaces in a string
 * @param translation
 */
export const extraSpaceCleaner = (translation: string) => {
  const regexForDoubleSpaces = /\s+/g;

  return translation.replace(regexForDoubleSpaces, " ").trim();
};

/**
 * Function to remove commas and periods from a number
 * @param naturalNumber
 */
export const commasAndPeriodsCleaner = (naturalNumber: string) => {
  const regexForCommasAndPeriods = /[.,\s]/g;

  return naturalNumber.replace(regexForCommasAndPeriods, "");
};

/**
 * Function to remove commas and periods from a number
 * @param naturalNumber
 */
export const commasCleaner = (naturalNumber: string) => {
  const regexForCommas = /,/g;

  return naturalNumber.replace(regexForCommas, "");
};
