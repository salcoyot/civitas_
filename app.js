const app = require("express")();
const httpServer = require("http").createServer(app);
const options = { 
  cors: {
    origin: "https://example.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
 };
const io = require("socket.io")(httpServer, options);

io.on("connection", socket => { 
  socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
  });

  // handle the event sent with socket.emit()
  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});

httpServer.listen(3000);        
app.get('/', function (req, res) {
    res.send('Hello World!')
  })