const axios = require('axios').default;

export default class ValidatorClient {
  constructor(settings) {
    this.settings = settings;
    this.refreshConfig();
  }

  refreshConfig() {
    this.endpoint = this.settings.validator.endpoint;
  }
}
