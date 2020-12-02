import TekuCommandLineOptions from "../../src/services/launcher/TekuCommandLineOptions";
import TekuCommandLineOption from "../../src/services/launcher/TekuCommandLineOption";
import {optionNames} from "../../src/services/launcher/TekuCommandLineOptionNames";
import TekuLauncher from "../../src/services/TekuLauncher";
const chai = require('chai');
const expect = chai.expect;

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

  describe('#buildConfiguration()', function () {
    it.only('should build configuration form options', function () {
      const options = new TekuCommandLineOptions();
      options.addOptions(
        new TekuCommandLineOption(optionNames.restApiEnabled, true),
        new TekuCommandLineOption(optionNames.network, 'mainnet')
      );
      const launcher = new TekuLauncher();
      const config = launcher.buildConfiguration(options);
      console.log(config);
    });
  });
});
