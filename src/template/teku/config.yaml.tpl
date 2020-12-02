network: "<%- network %>"
data-path: "<%- dataPath %>"

# Eth 1
eth1-endpoint: "<%- eth1Endpoint %>"
eth1-deposit-contract-address: "<%- eth1DepositContractAddress %>"

logging: <%- logging %>

rest-api-enabled: <%- restApiEnabled %>
<% if (restApiEnabled) { %>restApiHostAllowlist: "<%- restApiHostAllowlist %>"
rest-api-host-cors-origins: "<%- restApiCorsOrigins %>"
<%}-%>
