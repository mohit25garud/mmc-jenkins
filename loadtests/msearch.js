import { sleep, check, group } from "k6";
import http from "k6/http";
import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export const options = {
  stages: [
    { duration: "1m", target: 5 },
    { duration: "3m", target: 5 },
    { duration: "1m", target: 0 },
  ],
//   ext: {
//     loadimpact: {
//       distribution: {
//         "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
//       },
//     },
//   },
  thresholds: { http_req_duration: ["p(95)<=500"] },
};

export default function main() {
  let response;

  const vars = {};

  // MSearch_Generate_Token
  group("MSearch_Generate_Token", function () {
    response = http.post("https://perf-api.solr.mrshmc.com/msearch/v1/token", 
    null,
    {
        headers: {
        Authorization:
            "Basic clpHRzlXYWdnR0V3WU1WNFFqNTU3NU40MDhsOWtBVTU6QlBuZ0hIWnhmVkNPclBIaw==",
        grant_type: "client_credentials",
        },
    });
    check(response, {
        "body contains access_token": response =>
        response.body.includes("access_token"),
    });
  });
//   console.log("The token response is: " + response.body);
  vars["bearer_token"] = jsonpath.query(response.json(), "$.access_token")[0];
//   console.log("The bearer token is: " + vars["bearer_token"]);
  sleep(2);

  // MarketFinancialData_01_MarketFinancialData
  group("MarketFinancialData_01_MarketFinancialData", function () {
    response = http.get(
        "https://perf-api.solr.mrshmc.com/msearch/E8/v1/fetch/market-financial-data/select?q=*",
        {
        headers: {
            Authorization: `Bearer ${vars["bearer_token"]}`,
        },
        }
    );
    check(response, {
        "body contains income_net_income": response =>
        response.body.includes("income_net_income"),
    });
  });
//   console.log("The response is: " + response.body);
  sleep(15);
}
