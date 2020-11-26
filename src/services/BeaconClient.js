import BeaconNodeAPI from "@/services/BeaconNodeAPI";

const axios = require('axios').default;

export default class BeaconClient {
  constructor(settings) {
    this.settings = settings;
    this.nodeAPI = new BeaconNodeAPI(settings);
  }

  getNodeAPI() {
    return this.nodeAPI;
  }

}
