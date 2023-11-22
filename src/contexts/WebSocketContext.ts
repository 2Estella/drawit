import React from 'react';
import { io, Socket } from 'socket.io-client';

export const socket: Socket = io('http://localhost:8080');
export const SocketContext = React.createContext<Socket>(socket);