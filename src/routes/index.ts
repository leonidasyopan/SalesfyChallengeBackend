import { Router } from "express";

const routes = Router();

routes.post("/", (request, response) => {
  // Store the natural number sent by the user
  const naturalNumber = request.query.translate;

  // Access the translate functions responsible for giruing out
  // how to translate the number properly
  const translated = translate(Number(naturalNumber));
  console.log(translated);

  // Return the translation so the API can show it to the user
  response.json({ translation: translated });
});

function translate(naturalNumber: number) {
  let numberTranslated = "";

  const separatedDigits = ("" + naturalNumber).split("");

  const decimalPlaces = separatedDigits.length;

  if (naturalNumber === 0) {
    numberTranslated = "zero";
    return numberTranslated;
  }

  // let i,
  //   j,
  //   hundredHouses,
  //   parts = 3;
  // for (i = 0, j = decimalPlaces; i < j; i += parts) {
  //   hundredHouses = separatedDigits.slice(i, i + parts);

  // }

  let hundredTranslated = "";

  for (let i = 1; i <= decimalPlaces; i++) {
    const lastDigit = separatedDigits[decimalPlaces - 1];
    const decimalDigit = separatedDigits[decimalPlaces - 2];
    const hundredthDigit = separatedDigits[decimalPlaces - 3];
    const lastTwoDigitsTogether =
      decimalPlaces == 1 ? Number(lastDigit) : Number(decimalDigit + lastDigit);
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

    hundredTranslated =
      decimalPlaces < 3
        ? lastTwoDigitsTranslated
        : hundredthDigitTranslated + " hundred " + lastTwoDigitsTranslated;
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

/* 
    case 100:
      numberTranslated = "one hundred";
      break;
    case 500:
      numberTranslated = "five hundred";
      break;
    case 1000:
      numberTranslated = "one thousand";
      break;
    case 1500:
      numberTranslated = "one thousand five hundred, or fifteen hundred";
      break;
    case 100000:
      numberTranslated = "one hundred thousand";
      break;
    case 1000000:
      numberTranslated = "one million";
      break;
    default:
      numberTranslated = "Sorry, couldn't handle this number";
      break;
  }

*/
