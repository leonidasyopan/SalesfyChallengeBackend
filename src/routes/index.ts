import { Router } from "express";
import { translate } from "../services/Translator";
import { commasCleaner, extraSpaceCleaner } from "../utils/cleaners";

const routes = Router();

routes.get("/", (request, response) => {
  const naturalNumber = request.query.translate;

  if (naturalNumber === undefined)
    return response.status(400).json({
      success: false,
      result: "Forneça um número natural para tradução.",
    });

  const cleanNaturalNumber = commasCleaner(naturalNumber.toString());

  const roundedNumber = Math.floor(Number(cleanNaturalNumber));

  /**
   * Handle error when user types anything other than a natural number
   */
  if (cleanNaturalNumber === "" || isNaN(Number(cleanNaturalNumber))) {
    return response.status(400).json({
      success: false,
      result: "Forneça um número natural para tradução.",
    });
  }

  const translation = translate(roundedNumber.toString());

  const cleanedTranslation = extraSpaceCleaner(translation);

  return response
    .status(200)
    .json({ success: true, result: cleanedTranslation });
});

export default routes;
