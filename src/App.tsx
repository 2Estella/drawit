import { useEffect, } from 'react';
import io from 'socket.io-client';
import Board from './pages/Board';

export default function App() {

  useEffect(() => {
    socket.emit('test', 'ddfskdk');
  });

  const socket = io('http://localhost:8080');

  console.log(socket);


  return (
    <div className="App">
      <Board />
    </div>
  );
}