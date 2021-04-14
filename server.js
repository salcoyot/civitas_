const app = require("express")();
const httpServer = require("http").createServer(app);
const cors = require('cors');
const options = { 
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
 };
 app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const io = require("socket.io")(httpServer, options);
app.use(cors());

io.on("connection", socket => { 
  console.log("conect");
 /*   socket.send("Hello!");*/

  // or with emit() and custom event names
  socket.emit("message", { "message": "Conectado", "user":"Civitas" }, "Hey!", Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("message", {"message":data.message, "user":data.user});
    socket.emit("message", {"message":data.message});
  });
  socket.on("position", (data) => {
    console.log(data);
    socket.broadcast.emit("position", {"position":data.position, "user":data.user});
  
  });

  // handle the event sent with socket.emit()
  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
  socket.on("peoplemove", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});

httpServer.listen(3000);        
app.get('/', function (req, res) {
    res.send('<h1>Civitas server</h1>')
    console.log("run server 3000")
  })