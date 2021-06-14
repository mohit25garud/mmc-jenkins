import { sleep, check, group } from "k6";
import http from "k6/http";
//import { findBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export const options = {
  stages: [
    { duration: "30s", target: 5 },
    { duration: "2m", target: 5 },
    { duration: "30s", target: 0 },
  ],
  /*
//   ext: {
//     loadimpact: {
//       distribution: {
//         "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
//       },
//     },
//   },
*/
  thresholds: { http_req_duration: ["max<100"] },
};

export default function main() {
  let response;

  group("Launch_K6", function () {
    response = http.get("http://test.k6.io/", {
        /*// headers: {
        //   API_KEY: "12345678",
        // },*/
    });
    check(response, {
      "body contains Demo website for load testing": response =>
        response.body.includes("Demo website for load testing"),
    });
  });
//   const title = findBetween(response.body, '<title>', '</title>');
//   console.log("The title is: " + title);
  // Automatically added sleep
  sleep(10);
}
