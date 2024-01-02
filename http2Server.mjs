import http2 from "http2";

const server = http2.createServer();

const rootRouteHandler = (stream, headers) => {
  stream.respond({
    ":status": 200,
  });
  stream.end("Hello, World!");
};

const notFoundHandler = (stream, headers) => {
  stream.respond({
    ":status": 404,
  });
  stream.end("Route Not Found!");
};

server.on("error", (err) => {
  console.log(err.message);
});

server.on("stream", (stream, headers) => {
  const path = headers[":path"];
  const method = headers[":method"];

  if (path === "/" && method === "GET") {
    rootRouteHandler(stream, headers);
  } else {
    notFoundHandler(stream, headers);
  }
});

server.listen(8080);
