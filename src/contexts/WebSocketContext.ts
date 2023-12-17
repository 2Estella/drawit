import React from 'react';
import { io, Socket } from 'socket.io-client';

export const socket: Socket = io(import.meta.env.VITE_REACT_APP_ELASTIC_IP ?? '');
export const SocketContext = React.createContext<Socket>(socket);