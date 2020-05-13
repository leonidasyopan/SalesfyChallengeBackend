import { twoDigits, oneThroughNineTeen } from "./UniqueNamesOfNumbers";

/**
 * This is the function function responsible for translating
 * the trios. It receives an array with a trio of numbers and
 * and translates it accoding to each digits hole in the number.
 * @param arrayOfParts
 */
export const hundredToString = (arrayOfParts: Array<string>) => {
  let hundredTranslated = "";

  // Everything happens inside the loop. The loop receives the
  // array of parts and after separating each digit and storing them
  // in their own variables it translates each part according to need.
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
};
