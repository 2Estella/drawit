import { Global } from '@emotion/react';
import DrawBoard from './pages/DrawBoard';
import ResetStyle from './assets/styles/ResetStyle';
import GlobalStyle from './assets/styles/GlobalStyle';
import { socket, SocketContext } from './contexts/WebSocketContext';
import Lobby from './pages/lobby';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <div className="App" >
          <Global styles={[ResetStyle, GlobalStyle]} />
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/drawBoard" element={<DrawBoard />} />
          </Routes>
        </div>
      </SocketContext.Provider>
    </BrowserRouter>
  );
}