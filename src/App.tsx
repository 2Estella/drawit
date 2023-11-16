import { useEffect, } from 'react';
import io from 'socket.io-client';
import Board from './pages/Board';
import { Global } from '@emotion/react';
import ResetStyle from './assets/styles/ResetStyle';
import GlobalStyle from './assets/styles/GlobalStyle';

export default function App() {

  useEffect(() => {
    socket.emit('test', 'ddfskdk');
  });

  const socket = io('http://localhost:8080');

  console.log(socket);


  return (
    <div className="App">
      <Global styles={[ResetStyle, GlobalStyle]} />
      <Board />
    </div>
  );
}