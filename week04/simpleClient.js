const http = require("http");

class Request {
  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || "/";
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    if (this.headers["Content-Type"] === "application/json")
      this.bodyText = JSON.stringify(this.body);
    if (this.headers["Content-Type"] === "application/x-www-form-urlencoded")
      this.bodyText = Object.keys(this.body)
        .map((k) => `${k}=${encodeURIComponent(this.body[k])}`)
        .join("&");
    this.headers["Content-Length"] = this.bodyText.length;
  }

  send = () => {
    return new Promise((resolve, reject) => {
      const opts = {
          method: this.method,
          hostname: this.host,
          port: this.port,
          path: this.path,
          headers: this.header
      };
      const req = http.request(opts, (res) => {
        console.log(`HTTP Status Code: ${res.statusCode}`);
        console.log(`HTTP Header: ${JSON.stringify(res.headers)}`);
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          console.log(`HTTP Body: ${chunk}`);
          resolve(chunk);
        });
        res.on("end", () => {
          console.log("No date in body.");
        });
      });

      req.on("error", (e) => {
          reject(e);
        console.error(`Request with error: ${e.message}`);
      });

      // 写入数据到请求主体
      req.write(this.bodyText);
      req.end();
    });
  };
}

void (async function () {
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8001",
    path: "/",
    headers: {
      ["x-foo2"]: "customed",
    },
    body: {
      name: "eason",
    },
  });

  let response = await request.send();
  console.log(response);
})();
