import { expect } from "chai";
import "mocha";

import { translate } from "../services/Translator";

// Settup for a Mocha Chai test
describe("Translation Test", () => {
  it("should translate a number to English", () => {
    const translation = translate("725");
    expect(translation).to.equal("seven hundred twenty-five");
  });
});
