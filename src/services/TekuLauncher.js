import TekuCommandLineOptions from "@/services/launcher/TekuCommandLineOptions";

export default class TekuLauncher {
  constructor() {
    this._commandLineOptions = new TekuCommandLineOptions();
  }

  get commandLineOptions() {
    return this._commandLineOptions;
  }

}
