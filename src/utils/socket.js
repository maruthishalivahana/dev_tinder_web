import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConncetion = () => {
    return io(BASE_URL, {
        withCredentials: true,
        // transports: ["websocket"]
    });
}
