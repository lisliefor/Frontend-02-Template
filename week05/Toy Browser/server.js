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
            #container {
              width: 500px;
              height: 300px;
              display: flex;
              background-color: rgb(255,255,255);
            }
            #container #myid {
              width: 200px;
              height: 100%;
              background0color: rgb(255,0,0);
            }
            #container .c1 {
              flex: 1;
              background-color: rgb(0,255,0);
            }
          </style>
        </head>
        <body>
          <div id="container">
            <div id="myid" />
            <div class="c1" />
          </div>
        </body>
      </html>
      `);
    });
});

server.listen(8001);

console.log("Server is running on the port: 8001");
