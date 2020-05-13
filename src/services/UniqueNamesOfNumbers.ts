/**
 * Receives the "decimal" digit and properly translates it
 * (Example: 37, the 3 (decimal digit) will be translated to thirty)
 * @param preLastDigit
 */
export const twoDigits = (preLastDigit: number) => {
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
};

/**
 * Receives any number from 1 through 19 and translates
 * it to English.
 * @param lastDigit
 */
export const oneThroughNineTeen = (lastDigit: number) => {
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
};
