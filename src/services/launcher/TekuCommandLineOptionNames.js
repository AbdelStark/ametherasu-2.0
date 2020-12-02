const optionNames = {
  network: 'network',
  logging: 'logging',
  dataPath: 'data-path',
  eth1Endpoint: 'eth1-endpoint',
  eth1DepositContractAddress: 'eth1-deposit-contract-address',
  restApiEnabled: 'rest-api-enabled',
  restApiHostAllowlist: 'rest-api-host-allow-list',
  restApiCorsOrigins: 'rest-api-cors-origins',
};

const validOptions = [
  optionNames.network,
  optionNames.restApiEnabled,
];

const templateOptionNames = new Map();
for (const templateOptionName in optionNames) {
  templateOptionNames.set(optionNames[templateOptionName], templateOptionName);
}

export {
  optionNames,
  validOptions,
  templateOptionNames,
}

