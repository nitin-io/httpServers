import http from "node:http";
import url from "node:url";

http
  .createServer((req, res) => {
    const parsedURL = url.parse(req.url, true);
    console.log(parsedURL);

    try {
      if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write("Hello, World!");
      } else if (req.url === "/" && req.method === "POST") {
        let body = "";

        req.on("data", (data) => {
          body += data;
        });

        req.on("end", () => {
          body = JSON.parse(body);
          console.log(body);
        });
      } else {
        res.writeHead(404, { "content-type": "text/html" });
        res.write("404, Page Not Found!");
      }
    } catch {
      res.write("Something is wrong");
    } finally {
      res.end();
    }
  })
  .listen(80);
