import { hundredToString } from "./HundredToString";
/**
 * Function responsible for going through each TRIO of the array
 * and translating it to its proper hundred translation.
 * @param arrayOfTrios
 */
export const translatorOfHundreds = (arrayOfTrios: string[][]) => {
  let arrayOfTriosTranslated = arrayOfTrios.map((item) => {
    let usefulTrio = "";
    const convertedTrio = hundredToString(item);
    if (convertedTrio !== " hundred ") {
      usefulTrio = convertedTrio;
    }
    return usefulTrio;
  });
  return arrayOfTriosTranslated;
};
