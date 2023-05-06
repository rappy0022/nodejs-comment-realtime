import WebSocket, { WebSocketServer } from "ws";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const wss = new WebSocketServer({ port: 80 });

wss.on("connection", function connection(ws, req) {
  ws.on("message", function message(message) {
    const data = JSON.parse(message);

    if (data.type === "message") {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "message",
              data: data.data,
              room: data.room,
              username: data.username,
            })
          );
        }
      });
    }
  });
});
