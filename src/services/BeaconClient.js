import BeaconNodeAPI from "@/services/BeaconNodeAPI";
import BeaconConfigAPI from "@/services/BeaconConfigAPI";
import BeaconTekuAPI from "@/services/BeaconTekuAPI";

export default class BeaconClient {
  constructor(settings) {
    this.settings = settings;
    this.nodeAPI = new BeaconNodeAPI(settings);
    this.configAPI = new BeaconConfigAPI(settings);
    this.tekuAPI = new BeaconTekuAPI(settings);
  }

}
