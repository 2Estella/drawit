import { useEffect, useRef, } from 'react';
import io from 'socket.io-client';
import Board from './pages/board';

interface CanvasProps {
  width: number;
  height: number;
}

function App({ width, height }: CanvasProps) {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    socket.emit('test', 'ddfskdk');
  });

  const socket = io('http://localhost:8080');

  console.log(socket);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="App">
      <canvas ref={canvasRef} height={height} width={width} className="canvas"/>

      <Board />
    </div>
  );
}

App.defaultProps = {
  width: 800,
  height: 600
};

export default App;
