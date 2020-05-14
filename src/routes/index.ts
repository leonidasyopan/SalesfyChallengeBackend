import { Router } from "express";
import { translate } from "../services/Translator";
import { commasAndPeriodsCleaner, extraSpaceCleaner } from "../utils/cleaners";

const routes = Router();

routes.get("/", (request, response) => {
  const naturalNumber = request.query.translate;

  /**
   * Handle error when user types anything other than a natural number
   */
  if (
    naturalNumber === "" ||
    isNaN(Number(naturalNumber)) ||
    naturalNumber === undefined
  ) {
    return response.json({
      error: "Forneça um número natural para tradução.",
    });
  }

  const cleanNaturalNumber = commasAndPeriodsCleaner(naturalNumber.toString());

  const translation = translate(cleanNaturalNumber.toString());

  const cleanedTranslation = extraSpaceCleaner(translation);

  return response.json({ translation: cleanedTranslation });
});

export default routes;
