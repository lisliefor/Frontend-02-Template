const http = require("http");

http
  .createServer((request, response) => {
    let body = [];
    request
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (data) => {
        body.push(data.toString());
      })
      .on("end", () => {
        //body = Buffer.concat(body).toString();
        body = JSON.stringify(body);
        console.log("body:", body);

        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("Hello World！");
      });
  })
  .listen(8001);

console.log("The server started at the 8001 port.");
