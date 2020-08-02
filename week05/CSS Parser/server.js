const http = require("http");

const server = http.createServer((request, response) => {

  let body = [];
  request
    .on("error", (error) => {
      console.error(`error: ${error}`);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      response.writeHead(200, { "Content-Type": "text/html" });

      response.end(`
      <html>
        <head>
          <title>Index page</title>
          <style>
            body .d1 {
              color: #ff33ee;
              font-size: 18px;
            }
            body #myd1 {
              color: #ff44ff;
              font-size: 16px;
            }
            body div img {
              width: 100px;
              height: 100px;
            }
          </style>
        </head>
        <body>
          <div class="d1" id="myd1">Hello World!</div>
          <div>
            <img />
          </div>
        </body>
      </html>
      `);
    });
});

server.listen(8001);

console.log("Server is running on the port: 8001");
