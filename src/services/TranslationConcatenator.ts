import { keyWords } from "./KeyWords";
/**
 * Function responsible for concatenating the TRIOS
 * translated and adding the proper keywords.
 * @param naturalNumber
 * @param arrayOfTriosTranslated
 * @param arrayOfTrios
 * @param extraDigitsTranslated
 */
export const translationConcatenator = (
  naturalNumber: string,
  arrayOfTriosTranslated: string[],
  arrayOfTrios: string[][],
  extraDigitsTranslated: string
) => {
  let numberTranslated = "";
  const LIMIT_FOR_TRIO_SEPARATION = 999;
  const numberConvertedFromString = Number(naturalNumber);

  // Here I'm checking whether the number is bigger or smaller than 999
  // If it's smaller I won't need to concatenate any keywords
  if (numberConvertedFromString <= LIMIT_FOR_TRIO_SEPARATION) {
    for (let i = 0; i < arrayOfTriosTranslated.length; i++) {
      numberTranslated += arrayOfTriosTranslated[i];
    }
    // ELSE, I will need to add the keywords to the trios of translated numbers
  } else {
    numberTranslated +=
      extraDigitsTranslated.length == 0
        ? ""
        : extraDigitsTranslated + " " + keyWords[arrayOfTrios.length] + " ";

    // this is the loop that allows adding as many keywords as necssary.
    for (let i = 0; i < arrayOfTriosTranslated.length; i++) {
      if (
        arrayOfTriosTranslated[i] === "" ||
        arrayOfTriosTranslated.length == 0
      ) {
        numberTranslated += "";
      } else {
        numberTranslated +=
          arrayOfTriosTranslated[i] +
          " " +
          keyWords[arrayOfTrios.length - (i + 1)] +
          " ";
      }
    }
  }

  return numberTranslated;
};
