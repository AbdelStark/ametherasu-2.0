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

    return  ejs.render(configFileTemplate, data, this._ejsCompileOptions);
  }


  defaultTemplateOptions() {
    return {
      network: 'mainnet',
      logging: 'INFO',
      dataPath: '/home/teku',
      eth1Endpoint: 'http://127.0.0.1:8545',
      eth1DepositContractAddress: '0x',
      restApiEnabled: false,
      restApiHostAllowlist: '127.0.0.1',
      restApiCorsOrigins: 'http://127.0.0.1',
    }
  }
}
