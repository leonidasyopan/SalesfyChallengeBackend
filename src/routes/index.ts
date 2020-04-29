import { Router } from "express";

const routes = Router();

routes.post("/", (request, response) => {
  // Store the natural number sent by the user
  const naturalNumber = request.query.translate;

  // Access the translate functions responsible for giruing out
  // how to translate the number properly
  const translated = translate(Number(naturalNumber));
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
  console.log(separatedDigits.length);

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

  console.log(separatedDigits.length);
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

  if (
    naturalNumber >= 100000 &&
    occurrencesOfZero?.length === naturalNumberString.length - 1 &&
    separatedDigits.length % 3 === 0
  ) {
    console.log(occurrencesOfZero?.length);
    console.log(naturalNumberString.length - 1);

    return "one hundred " + keyWords[arrayOfParts.length - 1];
  }

  // If this is the case (only 0 after the first character) and the number is 1000
  // or more, it will not need to compute anything. Just add the keyword to the end
  if (
    naturalNumber > 999 &&
    occurrencesOfZero?.length === naturalNumberString.length - 1
  ) {
    numberTranslated =
      extraDigistsTogether + " " + keyWords[arrayOfParts.length];
    console.log(occurrencesOfZero?.length);
    console.log(naturalNumberString.length - 1);
    return numberTranslated;
  }

  if (naturalNumber <= 999) {
    for (let i = 0; i < wholeNumberInParts.length; i++) {
      numberTranslated += wholeNumberInParts[i];
    }
  } else {
    numberTranslated +=
      extraDigistsTogether.length == 0
        ? ""
        : extraDigistsTogether + " " + keyWords[arrayOfParts.length] + " ";

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

  return numberTranslated;
}

function hundredToString(arrayOfParts: Array<string>) {
  let hundredTranslated = "";

  for (let i = 1; i <= arrayOfParts.length; i++) {
    const lastDigit = arrayOfParts[arrayOfParts.length - 1];
    const decimalDigit = arrayOfParts[arrayOfParts.length - 2];
    const hundredthDigit = arrayOfParts[arrayOfParts.length - 3];
    const lastTwoDigitsTogether =
      arrayOfParts.length == 1
        ? Number(lastDigit)
        : Number(decimalDigit + lastDigit);
    let lastTwoDigitsTranslated = "";

    if (lastTwoDigitsTogether >= 1 && lastTwoDigitsTogether <= 19) {
      lastTwoDigitsTranslated = oneThroughNineTeen(
        Number(lastTwoDigitsTogether)
      );
    } else {
      const decimalDigitTranslated = twoDigits(Number(decimalDigit));
      const lastDigitTranslated = oneThroughNineTeen(Number(lastDigit));
      lastTwoDigitsTranslated =
        Number(lastDigit) == 0
          ? decimalDigitTranslated
          : decimalDigitTranslated + "-" + lastDigitTranslated;
    }

    const hundredthDigitTranslated = oneThroughNineTeen(Number(hundredthDigit));

    if (arrayOfParts.length < 3) {
      hundredTranslated = lastTwoDigitsTranslated;
    } else if (
      hundredthDigitTranslated === "" ||
      hundredthDigitTranslated.length == 0
    ) {
      hundredTranslated = lastTwoDigitsTranslated;
    } else {
      hundredTranslated =
        hundredthDigitTranslated + " hundred " + lastTwoDigitsTranslated;
    }
  }

  return hundredTranslated;
}

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
