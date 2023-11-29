import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../contexts/WebSocketContext';

export default function ErrorMessage() {
  const socket = useContext(SocketContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleErrorMessage = (message: string) => {
      setErrorMessage(message);
    };

    socket.on('errorMessage', handleErrorMessage);

    return () => {
      socket.off('errorMessage', handleErrorMessage);
    };
  }, [socket]);

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

