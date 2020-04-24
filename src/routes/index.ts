import { Router } from "express";

const routes = Router();

routes.post("/", (request, response) => {
  // Store the natural number sent by the user
  const naturalNumber = request.query.translate;
  console.log(naturalNumber);

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

  switch (decimalPlaces) {
    case 1:
      switch (naturalNumber) {
        case 0:
          numberTranslated = "zero";
          break;
        case 1:
          numberTranslated = "one";
          break;
        case 2:
          numberTranslated = "two";
          break;
        case 3:
          numberTranslated = "three";
          break;
        case 4:
          numberTranslated = "four";
          break;
        case 5:
          numberTranslated = "five";
          break;
        case 6:
          numberTranslated = "six";
          break;
        case 7:
          numberTranslated = "seven";
          break;
        case 8:
          numberTranslated = "eight";
          break;
        case 9:
          numberTranslated = "nine";
          break;
        default:
          numberTranslated = "Sorry, couldn't handle this number";
          break;
      }
      break;
    case 2:
      let firstDigitTranslated = "";
      const firstDigit = Number(separatedDigits[0]);
      const lastDigit = Number(separatedDigits[1]);
      switch (firstDigit) {
        case 1:
          firstDigitTranslated = "one";
          break;
        case 2:
          firstDigitTranslated = "twenty";
          break;
        case 3:
          firstDigitTranslated = "thirty";
          break;
        case 4:
          firstDigitTranslated = "fourty";
          break;
        case 5:
          firstDigitTranslated = "fifty";
          break;
        case 6:
          firstDigitTranslated = "sixty";
          break;
        case 7:
          firstDigitTranslated = "seventy";
          break;
        case 8:
          firstDigitTranslated = "eighty";
          break;
        case 9:
          firstDigitTranslated = "ninety";
          break;
        default:
          firstDigitTranslated = "Sorry, couldn't handle this number";
          break;
      }
      const lastDigitTranslated = oneThroughNince(lastDigit);
      numberTranslated = firstDigitTranslated + lastDigitTranslated;
      break;
  }

  return numberTranslated;
}

function oneThroughNince(lastDigit: number) {
  let lastDigitTranslated = "";

  switch (lastDigit) {
    case 1:
      lastDigitTranslated = "-one";
      break;
    case 2:
      lastDigitTranslated = "-two";
      break;
    case 3:
      lastDigitTranslated = "-three";
      break;
    case 4:
      lastDigitTranslated = "-four";
      break;
    case 5:
      lastDigitTranslated = "-five";
      break;
    case 6:
      lastDigitTranslated = "-six";
      break;
    case 7:
      lastDigitTranslated = "-seven";
      break;
    case 8:
      lastDigitTranslated = "-eight";
      break;
    case 9:
      lastDigitTranslated = "-nine";
      break;
    default:
      lastDigitTranslated = "";
      break;
  }

  return lastDigitTranslated;
}

export default routes;

/* 

switch (naturalNumber) {
    case 0:
      numberTranslated = "zero";
      break;
    case 1:
      numberTranslated = "one";
      break;
    case 2:
      numberTranslated = "two";
      break;
    case 3:
      numberTranslated = "three";
      break;
    case 4:
      numberTranslated = "four";
      break;
    case 5:
      numberTranslated = "five";
      break;
    case 6:
      numberTranslated = "six";
      break;
    case 7:
      numberTranslated = "seven";
      break;
    case 8:
      numberTranslated = "eight";
      break;
    case 9:
      numberTranslated = "nine";
      break;
    case 10:
      numberTranslated = "ten";
      break;
    case 11:
      numberTranslated = "eleven";
      break;
    case 12:
      numberTranslated = "twelve";
      break;
    case 13:
      numberTranslated = "thirteen";
      break;
    case 14:
      numberTranslated = "fourteen";
      break;
    case 15:
      numberTranslated = "fifteen";
      break;
    case 16:
      numberTranslated = "sixteen";
      break;
    case 17:
      numberTranslated = "seventeen";
      break;
    case 18:
      numberTranslated = "eighteen";
      break;
    case 19:
      numberTranslated = "nineteen";
      break;
    case 20:
      numberTranslated = "twenty";
      break;
    case 21:
      numberTranslated = "twenty-one";
      break;
    case 22:
      numberTranslated = "twenty-two";
      break;
    case 23:
      numberTranslated = "twenty-three";
      break;
    case 24:
      numberTranslated = "twenty-four";
      break;
    case 25:
      numberTranslated = "twenty-five";
      break;
    case 26:
      numberTranslated = "twenty-six";
      break;
    case 27:
      numberTranslated = "twenty-seven";
      break;
    case 28:
      numberTranslated = "twenty-eight";
      break;
    case 29:
      numberTranslated = "twenty-nine";
      break;
    case 30:
      numberTranslated = "thirty";
      break;
    case 31:
      numberTranslated = "thirty-one";
      break;
    case 40:
      numberTranslated = "forty";
      break;
    case 50:
      numberTranslated = "fifty";
      break;
    case 60:
      numberTranslated = "sixty";
      break;
    case 70:
      numberTranslated = "seventy";
      break;
    case 80:
      numberTranslated = "eighty";
      break;
    case 90:
      numberTranslated = "ninety";
      break;
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
