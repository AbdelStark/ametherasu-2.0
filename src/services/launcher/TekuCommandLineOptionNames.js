const optionNames = {
  network: 'network',
  restApiEnabled: 'rest-api-enabled',
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
