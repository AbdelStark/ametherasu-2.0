const axios = require('axios').default;
import {StatusCodes} from 'http-status-codes';

export default class BeaconNodeAPI {
  constructor(settings) {
    this.settings = settings;
    this.refreshConfig();
  }

  async isHealthy() {
    this.refreshConfig();
    const response = await axios.get(this.endpointHealth);
    return response.status === StatusCodes.OK;
  }


  async identity() {
    this.refreshConfig();
    console.log(this.endpointIdentity);
    const response = await axios.get(this.endpointIdentity);
    return response.data;
  }

  refreshConfig() {
    this.endpointRoot = this.settings.beacon.endpoint;
    this.endpointHealth = `${this.endpointRoot}/eth/v1/node/health`;
    this.endpointIdentity = `${this.endpointRoot}/eth/v1/node/identity`;
  }
}
