import { oneThroughNineTeen } from "./UniqueNamesOfNumbers";
import { hundredToString } from "./HundredToString";
import { digitSeparator } from "../utils/digitSeparator";
import { keyWords } from "./KeyWords";
import {
  extraDigitsExtractor,
  mainDigitsExtractor,
  arrayOfTriosCreator,
} from "./DigitsOrganizor";
import { translatorOfHundreds } from "./TranslatorOfHundreds";

/**
 * Function to tranlate any natural number to English
 * @param naturalNumber
 */
export const translate = (naturalNumber: string) => {
  let numberTranslated = "";
  const numberConvertedFromString = Number(naturalNumber);

  if (numberConvertedFromString === 0) return "zero";

  const separatedDigits = digitSeparator(naturalNumber);

  const extraDigits = extraDigitsExtractor(separatedDigits);

  const mainDigits = mainDigitsExtractor(separatedDigits);

  const arrayOfTrios = arrayOfTriosCreator(mainDigits);

  const arrayOfTriosTranslated = translatorOfHundreds(arrayOfTrios);

  const extraDigitsTranslated = hundredToString(extraDigits);

  // This part is responsible for checking if the natural number only has 0s
  // after the first character.
  // const naturalNumberString = naturalNumber.toString();
  const regexForSequenceOfMultipleZeros = /0/g;
  let occurrencesOfZero = naturalNumber.match(regexForSequenceOfMultipleZeros);
  console.log(occurrencesOfZero);

  const LIMIT_FOR_TRIO_SEPARATION = 999;

  // If this is the case (only 0 after the first character) AND the number is 1000
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
