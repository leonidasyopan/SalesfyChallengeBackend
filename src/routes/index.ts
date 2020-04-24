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

  let separatedDigits = ("" + naturalNumber).split("");

  let decimalPlaces = separatedDigits.length;

  if (naturalNumber == 0) {
    numberTranslated = "zero";
    return numberTranslated;
  }

  if (naturalNumber >= 10 && naturalNumber <= 19) {
    numberTranslated = tenThroughNineteen(Number(naturalNumber));
    return numberTranslated;
  }

  if (decimalPlaces == 1) {
    numberTranslated = oneThroughNine(Number(naturalNumber));
  } else if (decimalPlaces == 2) {
    const preLastDigitTranslated = twoDigits(Number(separatedDigits[0]));
    if (Number(separatedDigits[1]) == 0) {
      numberTranslated = preLastDigitTranslated;
    } else {
      const lastDigitTranslated = oneThroughNine(Number(separatedDigits[1]));
      numberTranslated = preLastDigitTranslated + "-" + lastDigitTranslated;
    }
  } else if (decimalPlaces == 3) {
    const firstDigitTranslated = oneThroughNine(Number(separatedDigits[0]));
    const preLastDigitTranslated = twoDigits(Number(separatedDigits[1]));
    const lastDigitTranslated = oneThroughNine(Number(separatedDigits[2]));
    if (Number(separatedDigits[2]) == 0 && Number(separatedDigits[1]) == 0) {
      return firstDigitTranslated + " hundred ";
    } else if (
      Number(separatedDigits[2]) == 0 &&
      Number(separatedDigits[1]) != 1
    ) {
      return firstDigitTranslated + " hundred " + preLastDigitTranslated;
    } else if (Number(separatedDigits[1]) == 0) {
      return firstDigitTranslated + " hundred " + lastDigitTranslated;
    } else if (Number(separatedDigits[1]) == 1) {
      const teens = tenThroughNineteen(Number(separatedDigits[2]));
      return firstDigitTranslated + " hundred " + teens;
    } else {
      return (
        firstDigitTranslated +
        " hundred " +
        preLastDigitTranslated +
        "-" +
        lastDigitTranslated
      );
    }
  }

  return numberTranslated;
}

function oneThroughNine(lastDigit: number) {
  let lastDigitTranslated = "";

  switch (lastDigit) {
    case 0:
      lastDigitTranslated = "";
      break;
    case 1:
      lastDigitTranslated = "one";
      break;
    case 2:
      lastDigitTranslated = "two";
      break;
    case 3:
      lastDigitTranslated = "three";
      break;
    case 4:
      lastDigitTranslated = "four";
      break;
    case 5:
      lastDigitTranslated = "five";
      break;
    case 6:
      lastDigitTranslated = "six";
      break;
    case 7:
      lastDigitTranslated = "seven";
      break;
    case 8:
      lastDigitTranslated = "eight";
      break;
    case 9:
      lastDigitTranslated = "nine";
      break;
    default:
      lastDigitTranslated = "";
      break;
  }

  return lastDigitTranslated;
}

function tenThroughNineteen(lastDigit: number) {
  let lastDigitTranslated = "";

  switch (lastDigit) {
    case 10:
      lastDigitTranslated = "ten";
      break;
    case 11:
      lastDigitTranslated = "eleven";
      break;
    case 12:
      lastDigitTranslated = "twelve";
      break;
    case 13:
      lastDigitTranslated = "thirteen";
      break;
    case 14:
      lastDigitTranslated = "fourteen";
      break;
    case 15:
      lastDigitTranslated = "fifteen";
      break;
    case 16:
      lastDigitTranslated = "sixteen";
      break;
    case 17:
      lastDigitTranslated = "seventeen";
      break;
    case 18:
      lastDigitTranslated = "eighteen";
      break;
    case 19:
      lastDigitTranslated = "nineteen";
      break;
    default:
      lastDigitTranslated = "";
      break;
  }

  return lastDigitTranslated;
}

function twoDigits(preLastDigit: number) {
  let preLastDigitTranslated = "";
  switch (preLastDigit) {
    case 1:
      preLastDigitTranslated = "one";
      break;
    case 2:
      preLastDigitTranslated = "twenty";
      break;
    case 3:
      preLastDigitTranslated = "thirty";
      break;
    case 4:
      preLastDigitTranslated = "fourty";
      break;
    case 5:
      preLastDigitTranslated = "fifty";
      break;
    case 6:
      preLastDigitTranslated = "sixty";
      break;
    case 7:
      preLastDigitTranslated = "seventy";
      break;
    case 8:
      preLastDigitTranslated = "eighty";
      break;
    case 9:
      preLastDigitTranslated = "ninety";
      break;
    default:
      preLastDigitTranslated = "Sorry, couldn't handle this number";
      break;
  }
  return preLastDigitTranslated;
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
