import { oneThroughNineTeen } from "./UniqueNamesOfNumbers";
import { hundredToString } from "./TranslatorOfHundreds";
import { keyWords } from "./KeyWords";

/**
 * Function to tranlate any natural number to English
 * @param naturalNumber
 */
export const translate = (naturalNumber: string) => {
  let numberTranslated = "";
  const numberConvertedFromString = Number(naturalNumber);

  if (numberConvertedFromString === 0) return "zero";

  // Separate each digit of the number and store all of them in order
  // in a Array.
  const separatedDigits = ("" + naturalNumber).split("");

  // Declare an empty variable for storing the extra digits from groups
  // of hundreds. Example, if I have 1234 or 1234234, the two pairs of
  // 234 are going to be translated using the same pattern (trios/hundreds)
  // but the 1 is extra, meaning it's translated differently.
  const extraDigits = [];

  // Loop through the array of separated digits to add just the first
  // one or two extra digits to its own array
  if (separatedDigits.length > 3 && separatedDigits.length % 3) {
    const extraHouses = separatedDigits.length % 3;
    for (let i = 0; i < extraHouses; i++) {
      extraDigits.push(separatedDigits[i]);
    }
    for (let i = 0; i < extraHouses; i++) {
      separatedDigits.shift();
    }
  }

  // Creates a constant prepared to store the trios of hundreds
  // This is very useful for big numbers like 1,234,567 where we
  // have 3 pairs of hundreds that we need to translate
  let arrayOfParts = [];

  // Create three variables necessary to create a loop that divides the
  // array of separated digits and stores them in trios in a our
  // arrayOfParts.
  let i,
    j,
    hundredHouses,
    parts = 3;
  for (i = 0, j = separatedDigits.length; i < j; i += parts) {
    hundredHouses = separatedDigits.slice(i, i + parts);
    arrayOfParts.push(hundredHouses);
  }

  // Here we sue the map() method to go through each of the the positions
  // of our object and translate each trio. Storing the translations in order
  // into this new wholeNumberInParts variable
  let wholeNumberInParts = arrayOfParts.map((item) => {
    let usefulTrio = "";
    const convertedTrio = hundredToString(item);
    if (convertedTrio !== " hundred ") {
      usefulTrio = convertedTrio;
    }
    return usefulTrio;
  });

  // This variable stores the translation for our isolated first or
  // 2 first digits
  const extraDigistsTogether = hundredToString(extraDigits);

  // This part is responsible for checking if the natural number only has 0s
  // after the first character.
  const naturalNumberString = naturalNumber.toString();
  const regexForSequenceOfMultipleZeros = /0/g;
  let occurrencesOfZero = naturalNumberString.match(
    regexForSequenceOfMultipleZeros
  );

  const LIMIT_FOR_TRIO_SEPARATION = 999;

  // If this is the case (only 0 after the first character) AND the number is 1000
  // or more AND the number of digits IS divided by 3 , it will not need
  // to compute anything. Just add the keyword to the end
  if (
    numberConvertedFromString >= LIMIT_FOR_TRIO_SEPARATION &&
    occurrencesOfZero?.length === naturalNumberString.length - 1 &&
    naturalNumberString.length % 3 === 0
  ) {
    const fisrtDigitTranslated = oneThroughNineTeen(Number(arrayOfParts[0][0]));
    return (
      fisrtDigitTranslated + " hundred " + keyWords[arrayOfParts.length - 1]
    );
  }

  // Similar case to previous one, but this one is for the cases where the number
  // of digits IS NOT divided by 3
  if (
    numberConvertedFromString > LIMIT_FOR_TRIO_SEPARATION &&
    occurrencesOfZero?.length === naturalNumberString.length - 1
  ) {
    numberTranslated =
      extraDigistsTogether + " " + keyWords[arrayOfParts.length];
    return numberTranslated;
  }

  // Here I'm checking whether the number is bigger or smaller than 999
  // If it's smaller I won't need to concatenate any keywords
  if (numberConvertedFromString <= LIMIT_FOR_TRIO_SEPARATION) {
    for (let i = 0; i < wholeNumberInParts.length; i++) {
      numberTranslated += wholeNumberInParts[i];
    }
    // ELSE, I will need to add the keywords to the trios of translated numbers
  } else {
    numberTranslated +=
      extraDigistsTogether.length == 0
        ? ""
        : extraDigistsTogether + " " + keyWords[arrayOfParts.length] + " ";

    // this is the loop that allows adding as many keywords as necssary.
    for (let i = 0; i < wholeNumberInParts.length; i++) {
      if (wholeNumberInParts[i] === "" || wholeNumberInParts.length == 0) {
        numberTranslated += "";
      } else {
        numberTranslated +=
          wholeNumberInParts[i] +
          " " +
          keyWords[arrayOfParts.length - (i + 1)] +
          " ";
      }
    }
  }
  // Here I return the complete translated word after all
  // the necessary concatenation
  return numberTranslated;
};
