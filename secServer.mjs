import https from "node:https";
import fs from "node:fs";

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

https.createServer(options, (req, res) => {
  res.write("Hello, This is a secure server");
  res.end();
});
