import TekuCommandLineOptions from "./launcher/TekuCommandLineOptions";
import {templateOptionNames} from './launcher/TekuCommandLineOptionNames';

const ejs = require("ejs");
export default class TekuLauncher {
  constructor() {
    this._commandLineOptions = new TekuCommandLineOptions();
    this._ejsCompileOptions = {};
    this._templateOptionsNames = templateOptionNames;
  }

  get commandLineOptions() {
    return this._commandLineOptions;
  }

  /**
   * Apply template to data
   * @param {String} configFileTemplate
   * @param {TekuCommandLineOptions} commandLineOptions
   */
  apply(configFileTemplate, commandLineOptions) {
    const data = this.defaultTemplateOptions();
    commandLineOptions.options.forEach((option, key) => {
      data[templateOptionNames.get(key)] = option.value;
    });

    const renderedTemplate = ejs.render(configFileTemplate, data, this._ejsCompileOptions);
    console.log(renderedTemplate);
  }


  defaultTemplateOptions() {
    return {
      restApiHostAllowlist: '127.0.0.1',
      restApiCorsOrigins: '127.0.0.1',
    }
  }
}
