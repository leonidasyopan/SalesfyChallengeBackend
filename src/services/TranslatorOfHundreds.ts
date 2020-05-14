import { hundredToString } from "./HundredToString";
/**
 *
 * @param arrayOfTrios
 */
export const translatorOfHundreds = (arrayOfTrios: string[][]) => {
  let wholeNumberInParts = arrayOfTrios.map((item) => {
    let usefulTrio = "";
    const convertedTrio = hundredToString(item);
    if (convertedTrio !== " hundred ") {
      usefulTrio = convertedTrio;
    }
    return usefulTrio;
  });

  return wholeNumberInParts;
};
