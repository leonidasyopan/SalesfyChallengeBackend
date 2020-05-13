import { Router } from "express";
import { translate } from "../services/Translator";
import { commasAndPeriodsCleaner, extraSpaceCleaner } from "../utils/cleaners";

const routes = Router();

routes.get("/", (request, response) => {
  const naturalNumber = request.query.translate;

  const cleanNaturalNumber = commasAndPeriodsCleaner(naturalNumber.toString());

  /**
   * Handle error when user types anything other than a natural number
   */
  if (cleanNaturalNumber === "" || isNaN(Number(cleanNaturalNumber))) {
    return response.json({
      error: "test",
    });
  }

  const translation = translate(cleanNaturalNumber.toString());

  const cleanedTranslation = extraSpaceCleaner(translation);

  return response.json({ translation: cleanedTranslation });
});

export default routes;
