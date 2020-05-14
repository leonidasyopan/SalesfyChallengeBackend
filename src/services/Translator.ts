import { hundredToString } from "./HundredToString";
import { digitSeparator } from "../utils/digitSeparator";
import {
  extraDigitsExtractor,
  mainDigitsExtractor,
  arrayOfTriosCreator,
} from "./DigitsOrganizor";
import { translatorOfHundreds } from "./TranslatorOfHundreds";
import { occurenceOfZeros } from "../utils/occurenceOfZeros";
import { translateSequenceOfOnlyZeros } from "./SequenceOfZeros";
import { translationConcatenator } from "./TranslationConcatenator";

/**
 * Function to tranlate any natural number to English
 * @param naturalNumber
 */
export const translate = (naturalNumber: string) => {
  if (Number(naturalNumber) === 0) return "zero";

  const separatedDigits = digitSeparator(naturalNumber);

  const extraDigits = extraDigitsExtractor(separatedDigits);

  const mainDigits = mainDigitsExtractor(separatedDigits);

  const arrayOfTrios = arrayOfTriosCreator(mainDigits);

  const arrayOfTriosTranslated = translatorOfHundreds(arrayOfTrios);

  const extraDigitsTranslated = hundredToString(extraDigits);

  const occurrencesOfZero = occurenceOfZeros(naturalNumber);

  /**
   * This is taking into account the occurence of big numbers
   * with only ZEROS after the first digit.
   */
  if (occurrencesOfZero?.length === naturalNumber.length - 1) {
    const longZerosTranslation = translateSequenceOfOnlyZeros(
      occurrencesOfZero,
      naturalNumber,
      arrayOfTrios,
      extraDigitsTranslated
    );

    return longZerosTranslation
      ? longZerosTranslation
      : "There was an error. Please try again.";
  }

  return translationConcatenator(
    naturalNumber,
    arrayOfTriosTranslated,
    arrayOfTrios,
    extraDigitsTranslated
  );
};
