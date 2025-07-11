import http from "http";
import SocketService from "./Service/socketService";

async function init() {
  const socketService = new SocketService();

  const httpServer = http.createServer();
  const PORT = process.env.PORT ? process.env.PORT : 8001;

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`HTTP Server started at PORT: ${PORT}`);
  });

  socketService.initListeners();
}

init();
