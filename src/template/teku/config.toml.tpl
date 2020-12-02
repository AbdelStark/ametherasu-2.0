network=<%= network %>
data-path=/home/ec2-user/data/beacon

eth1-endpoint=https://goerli.infura.io/v3/7afd3452135040c3ab7da33ba6d57069
eth1-deposit-contract-address=0x8c5fecdC472E27Bc447696F431E425D02dd46a8c

logging=INFO

restApiEnabled=<%- restApiEnabled ? restApiEnabled : false %>
<% if (restApiEnabled) { %>restApiHostAllowlist=<%- restApiHostAllowlist %>
rest-api-host-cors-origins=<%= restApiCorsOrigins %>
<%}-%>

metrics-enabled
metrics-host-allowlist="*"
metrics-interface="0.0.0.0"

