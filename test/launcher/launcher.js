import TekuCommandLineOptions from "../../src/services/launcher/TekuCommandLineOptions";
import TekuCommandLineOption from "../../src/services/launcher/TekuCommandLineOption";
import {optionNames} from "../../src/services/launcher/TekuCommandLineOptionNames";
import TekuLauncher from "../../src/services/TekuLauncher";
import YAML from 'yaml';

const fs = require("fs");
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

  describe('#apply()', function () {
    it.only('should apply template', function () {
      const options = new TekuCommandLineOptions();
      options.addOptions(
        new TekuCommandLineOption(optionNames.restApiEnabled, true),
        new TekuCommandLineOption(optionNames.network, 'mainnet')
      );
      const launcher = new TekuLauncher();
      const templateFile = "./src/template/teku/config.yaml.tpl";
      const template = fs.readFileSync(templateFile, "utf-8");
      const renderedTemplate = launcher.apply(template, options);
      console.log(renderedTemplate);
      const parsedYaml = YAML.parse(renderedTemplate);
      console.log(parsedYaml);
      expect(parsedYaml.network).to.be.equal('mainnet');
      expect(parsedYaml['rest-api-enabled']).to.be.true;
    });
  });
});
