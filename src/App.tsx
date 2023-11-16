import Board from './pages/Board';
import { Global } from '@emotion/react';
import ResetStyle from './assets/styles/ResetStyle';
import GlobalStyle from './assets/styles/GlobalStyle';


export default function App() {
  return (
    <div className="App" >
      <Global styles={[ResetStyle, GlobalStyle]} />
      <Board />
    </div>
  );
}