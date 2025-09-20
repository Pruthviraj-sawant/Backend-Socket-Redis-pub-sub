// import express=require("express");
// import WebSocketServer = require("ws");


// const app=express();
// const httpserver=app.listen(8080);

// const wss=new WebSocketServer({server : httpserver});

// wss.on("connection",function connection(ws){
//     ws.on("error",console.error);

//     ws.on("message",function message(data,isBinary){
//         ws.clients.forEach(function each(client){
//             if(client.readyState===WebSocketServer.OPEN){
//                 client.send(data,{binary:isBinary});
//             }
//         });
//     });
//         ws.send("Welcome to the WebSocket server!");
// });
import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const PORT = 8006;

const httpserver = app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});

// Create a WebSocket server attached to HTTP server
const wss = new WebSocketServer({ server: httpserver });

wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected!");

  ws.on("error", console.error);

  ws.on("message", (data, isBinary) => {
    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("Welcome to the WebSocket server!");
});

//add type:module in package.json file
//or use import express=require("express"); and import WebSocketServer = require("ws");
