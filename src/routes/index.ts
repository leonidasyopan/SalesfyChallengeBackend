import { Router } from "express";
import { translate } from "../services/Translator";

const routes = Router();

routes.get("/", (request, response) => {
  // Store the natural number sent by the user
  const naturalNumber = request.query.translate;

  // Handle error when user types anything other than a natural number
  if (isNaN(Number(naturalNumber))) {
    response.json({ error: "Please provide a NATURAL NUMBER for translation" });
    response.end();
  } else if (naturalNumber === "") {
    // Handle error when user leaves input field empty
    response.json({ error: "Please provide a NATURAL NUMBER for translation" });
    response.end();
  } else {
    // Access the translate functions responsible for figuring out
    // how to translate the number properly
    const translated = translate(naturalNumber.toString());

    // Clean any extra space that may result from translation
    let cleanedTranslation = translated.replace(/\s+/g, " ").trim();

    // Return the translation so the API can show it to the user
    response.json({ translation: cleanedTranslation });
    response.end();
  }
});

export default routes;
