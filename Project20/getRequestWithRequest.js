const https = require("https");

const options = {
  host: "jsonplaceholder.typicode.com",
  path: "/users?_limit=2",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

let request = https.request(options, (res) => {});
