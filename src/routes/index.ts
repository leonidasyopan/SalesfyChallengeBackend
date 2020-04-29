import { Router } from "express";

const routes = Router();

routes.post("/", (request, response) => {
  // Store the natural number sent by the user
  const naturalNumber = request.query.translate;

  if (isNaN(naturalNumber)) {
    response.json({ error: "Please provide a NATURAL NUMBER for translation" });
  }

  // Access the translate functions responsible for giruing out
  // how to translate the number properly
  const translated = translate(Number(naturalNumber));
  // Clean any extra space that may result from translation
  let cleanedTranslation = translated.replace(/\s+/g, " ").trim();

  // Return the translation so the API can show it to the user
  response.json({ translation: cleanedTranslation });
});

function translate(naturalNumber: number) {
  // Creates an empty variable to store the translation in the end
  let numberTranslated = "";

  // Zero is a very unique situation
  if (naturalNumber === 0) {
    numberTranslated = "zero";
    return numberTranslated;
  }

  // Separate each digit of the number and store all of them in order
  // in a Array.
  const separatedDigits = ("" + naturalNumber).split("");

  // the keyWords is our list of unique words used for multiples of thousand
  // example: 1,000 (thousand) | 1,000,000 (million) | 1,000,000,000 (billion), etc
  const keyWords = [
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "qeptillion",
    "octillion",
    "nonillion",
    "decillion",
    "undecillion",
    "duodecillion",
    "tredecillion",
    "quattuordecillion",
    "quindecillion",
    "sexdecillion",
    "septendecillion",
    "octodecillion",
    "novemdecillion",
    "vigintillion",
    "centillion",
  ];

  // Declare and empty variable for storing the extra digits from groups
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
  // array of separated digits and stores them in an trios in a our
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
  let occurrencesOfZero = naturalNumberString.match(/0/g);

  // If this is the case (only 0 after the first character) AND the number is 1000
  // or more AND the number of digits IS divided by 3 , it will not need
  // to compute anything. Just add the keyword to the end
  if (
    naturalNumber >= 999 &&
    occurrencesOfZero?.length === naturalNumberString.length - 1 &&
    naturalNumberString.length % 3 === 0
  ) {
    return "one hundred " + keyWords[arrayOfParts.length - 1];
  }

  // Similar case to previous one, but this one is for the cases where the number
  // of digits IS NOT divided by 3
  if (
    naturalNumber > 999 &&
    occurrencesOfZero?.length === naturalNumberString.length - 1
  ) {
    numberTranslated =
      extraDigistsTogether + " " + keyWords[arrayOfParts.length];
    return numberTranslated;
  }

  // Here I'm checking whether the number is bigger or smaller than 999
  // If it's smaller I won't need to concatenate any keywords
  if (naturalNumber <= 999) {
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
}

// This is the most important function in the transtalion
// it receisves an array with a trio of numbers and
// and translates it following many specific rules
function hundredToString(arrayOfParts: Array<string>) {
  let hundredTranslated = "";

  // Everything happens inside the loop
  for (let i = 1; i <= arrayOfParts.length; i++) {
    // first I separate the trio and store each one in a variable
    const lastDigit = arrayOfParts[arrayOfParts.length - 1];
    const decimalDigit = arrayOfParts[arrayOfParts.length - 2];
    const hundredthDigit = arrayOfParts[arrayOfParts.length - 3];

    // the decimal digits (10, 12, 21, 46, etc...) are the most
    // important and complicaded part. These are the rules:

    // Here I concatenate them into a pair (since they came)
    //  separated within the array.
    const lastTwoDigitsTogether =
      arrayOfParts.length == 1
        ? Number(lastDigit)
        : Number(decimalDigit + lastDigit);

    // This variable only waits for the translation
    let lastTwoDigitsTranslated = "";

    // This part translates the unique numbers that have specific
    // translations (1 through 19). They are unique words.
    if (lastTwoDigitsTogether >= 1 && lastTwoDigitsTogether <= 19) {
      lastTwoDigitsTranslated = oneThroughNineTeen(
        Number(lastTwoDigitsTogether)
      );
      // If the number is big than 20. We have the first part that is
      // not unique (20, 21,..., 30, 31,..., 40, 41, .. etc)
      // and the second part that is unique the 1-9 part
    } else {
      const decimalDigitTranslated = twoDigits(Number(decimalDigit));
      const lastDigitTranslated = oneThroughNineTeen(Number(lastDigit));
      lastTwoDigitsTranslated =
        Number(lastDigit) == 0
          ? decimalDigitTranslated
          : decimalDigitTranslated + "-" + lastDigitTranslated;
    }

    // This part is very simple. Here we translated the hundreth number
    // If we have 123, for example. We simply translate 1 to one.
    const hundredthDigitTranslated = oneThroughNineTeen(Number(hundredthDigit));

    // This is an extra test before adding the word "hundred". We test for the cases
    // where we have numbers smaller than 100 - these don't need "hundred".
    if (arrayOfParts.length < 3) {
      hundredTranslated = lastTwoDigitsTranslated;
      // This is another extra rule for the trios of numbers that are composed
      // of only 000. In numbers like 100,000 we receive such a case.
    } else if (
      hundredthDigitTranslated === "" ||
      hundredthDigitTranslated.length == 0
    ) {
      hundredTranslated = lastTwoDigitsTranslated;
      // This is the most common case, where we DO need to add the "hundred"
    } else {
      hundredTranslated =
        hundredthDigitTranslated + " hundred " + lastTwoDigitsTranslated;
    }
  }

  // This returns the trio properly translated after all the necessary concatenation
  return hundredTranslated;
}

// This is only separated into a function to avoid repeatitions and to
// make it more readable.
function oneThroughNineTeen(lastDigit: number) {
  let result = "";

  switch (lastDigit) {
    case 1:
      result = "one";
      break;
    case 2:
      result = "two";
      break;
    case 3:
      result = "three";
      break;
    case 4:
      result = "four";
      break;
    case 5:
      result = "five";
      break;
    case 6:
      result = "six";
      break;
    case 7:
      result = "seven";
      break;
    case 8:
      result = "eight";
      break;
    case 9:
      result = "nine";
      break;
    case 10:
      result = "ten";
      break;
    case 11:
      result = "eleven";
      break;
    case 12:
      result = "twelve";
      break;
    case 13:
      result = "thirteen";
      break;
    case 14:
      result = "fourteen";
      break;
    case 15:
      result = "fifteen";
      break;
    case 16:
      result = "sixteen";
      break;
    case 17:
      result = "seventeen";
      break;
    case 18:
      result = "eighteen";
      break;
    case 19:
      result = "nineteen";
      break;
    default:
      result = "";
      break;
  }

  return result;
}

// This is only separated into a function to avoid repeatitions and to
// make it more readable.
function twoDigits(preLastDigit: number) {
  let result = "";
  switch (preLastDigit) {
    case 2:
      result = "twenty";
      break;
    case 3:
      result = "thirty";
      break;
    case 4:
      result = "fourty";
      break;
    case 5:
      result = "fifty";
      break;
    case 6:
      result = "sixty";
      break;
    case 7:
      result = "seventy";
      break;
    case 8:
      result = "eighty";
      break;
    case 9:
      result = "ninety";
      break;
    default:
      result = "";
      break;
  }
  return result;
}

export default routes;
