var express = require("express");
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var app = express();

const PORT = "3001";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", function(req, res) {
  // The URL we will scrape from - in our example Anchorman 2.

  url = "https://covidout.in/";

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

  request(url, function(error, response, html) {
    // First we'll check to make sure no errors occurred when making the request

    if (!error) {
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      console.log("well success");

      console.log(response);
      var $ = cheerio.load(html);

      console.log("load result: ", $("head"));

      const scriptContent = $("body script").html();

      const scriptData = scriptContent.replace(
        "window.__INITIAL_STATE__ =",
        ""
      );

      const data = [...JSON.parse(scriptData)];

      res.send(data);

      // Finally, we'll define the variables we're going to capture

      //   var title, release, rating;
      //   var json = { title: "", release: "", rating: "" };
    }
  });
});

app.listen(PORT);
console.log(`Magic happens on port ${PORT}`);
exports = module.exports = app;
