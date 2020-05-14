import { oneThroughNineTeen } from "./UniqueNamesOfNumbers";
import { keyWords } from "./KeyWords";

/**
 * Function responsible for translating cases of big numbers
 * composed of only ZEROS after the first digit. (EXCEPTION).
 * @param occurrencesOfZero
 * @param naturalNumber
 * @param numberConvertedFromString
 * @param arrayOfTrios
 * @param extraDigitsTranslated
 */
export const translateSequenceOfOnlyZeros = (
  occurrencesOfZero: RegExpMatchArray | null,
  naturalNumber: string,
  arrayOfTrios: string[][],
  extraDigitsTranslated: string
) => {
  const LIMIT_FOR_TRIO_SEPARATION = 999;
  let numberTranslated = "";
  const numberConvertedFromString = Number(naturalNumber);

  // If there are only 0s after the first character AND the number is 1000
  // or more AND the number of digits IS divided by 3 , it will not need
  // to compute anything. Just add the keyword to the end
  if (
    numberConvertedFromString >= LIMIT_FOR_TRIO_SEPARATION &&
    occurrencesOfZero?.length === naturalNumber.length - 1 &&
    naturalNumber.length % 3 === 0
  ) {
    const fisrtDigitTranslated = oneThroughNineTeen(Number(arrayOfTrios[0][0]));
    return (
      fisrtDigitTranslated + " hundred " + keyWords[arrayOfTrios.length - 1]
    );
  }

  // Similar case to previous one, but this one is for the cases where the number
  // of digits IS NOT divided by 3
  if (
    numberConvertedFromString > LIMIT_FOR_TRIO_SEPARATION &&
    occurrencesOfZero?.length === naturalNumber.length - 1
  ) {
    numberTranslated =
      extraDigitsTranslated + " " + keyWords[arrayOfTrios.length];
    return numberTranslated;
  }
};
