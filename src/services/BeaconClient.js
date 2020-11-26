import BeaconNodeAPI from "@/services/BeaconNodeAPI";

export default class BeaconClient {
  constructor(settings) {
    this.settings = settings;
    this.nodeAPI = new BeaconNodeAPI(settings);
  }

}
