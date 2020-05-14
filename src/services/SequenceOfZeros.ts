export const translateSequenceOfOnlyZeros = (
  naturalNumber: string,
  numberConvertedFromString: number
) => {
  // // This part is responsible for checking if the natural number only has 0s
  // // after the first character.
  // const naturalNumberString = naturalNumber.toString();
  // const regexForSequenceOfMultipleZeros = /0/g;
  // let occurrencesOfZero = naturalNumberString.match(
  //   regexForSequenceOfMultipleZeros
  // );
  // console.log(occurrencesOfZero);
  // const LIMIT_FOR_TRIO_SEPARATION = 999;
  // // If this is the case (only 0 after the first character) AND the number is 1000
  // // or more AND the number of digits IS divided by 3 , it will not need
  // // to compute anything. Just add the keyword to the end
  // if (
  //   numberConvertedFromString >= LIMIT_FOR_TRIO_SEPARATION &&
  //   occurrencesOfZero?.length === naturalNumberString.length - 1 &&
  //   naturalNumberString.length % 3 === 0
  // ) {
  //   const fisrtDigitTranslated = oneThroughNineTeen(Number(arrayOfTrios[0][0]));
  //   return (
  //     fisrtDigitTranslated + " hundred " + keyWords[arrayOfTrios.length - 1]
  //   );
  // }
  // // Similar case to previous one, but this one is for the cases where the number
  // // of digits IS NOT divided by 3
  // if (
  //   numberConvertedFromString > LIMIT_FOR_TRIO_SEPARATION &&
  //   occurrencesOfZero?.length === naturalNumberString.length - 1
  // ) {
  //   numberTranslated =
  //     extraDigitsTranslated + " " + keyWords[arrayOfTrios.length];
  //   return numberTranslated;
  // }
};
