import { Global } from '@emotion/react';
import Board from './pages/Board';
import ResetStyle from './assets/styles/ResetStyle';
import GlobalStyle from './assets/styles/GlobalStyle';
import { socket, SocketContext } from './contexts/WebSocketContext';

export default function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className="App" >
        <Global styles={[ResetStyle, GlobalStyle]} />
        <Board />
      </div>
    </SocketContext.Provider>
  );
}