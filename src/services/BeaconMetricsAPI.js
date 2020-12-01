const axios = require('axios').default;

export default class BeaconMetricsAPI {
  constructor(settings) {
    this.settings = settings;
    this.refreshConfig();
  }


  async metrics() {
    this.refreshConfig();
    const response = await axios.get(this.endpointRoot);
    return response.data;
  }

  refreshConfig() {
    this.endpointRoot = this.settings.beacon.metrics;
  }
}
