import TekuCommandLineOptions from "../../src/services/launcher/TekuCommandLineOptions";
import TekuCommandLineOption from "../../src/services/launcher/TekuCommandLineOption";
import {optionNames} from "../../src/services/launcher/TekuCommandLineOptionNames";

const chai = require('chai');
const expect = chai.expect;
const assert = require('assert');
describe('Launcher', function () {
  describe('#addOption()', function () {
    it('should add option', function () {
      const tekuCommandLineOptions = new TekuCommandLineOptions();
      expect(tekuCommandLineOptions.options.has(optionNames.restApiEnabled)).to.be.false;
      tekuCommandLineOptions.addOption(
        new TekuCommandLineOption(optionNames.restApiEnabled, true)
      );
      expect(tekuCommandLineOptions.options.has(optionNames.restApiEnabled)).to.be.true;
    });
  });
});
