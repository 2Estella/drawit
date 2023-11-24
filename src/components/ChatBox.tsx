import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contexts/WebSocketContext';
import { chatStyle, } from '../assets/styles/pages/DrawBoardStyles';

interface ChatMsgItem {
  id?: string
  message: string
  isSender: boolean
  nickname: string
}

export default function ChatBox() {
  const socket = useContext(SocketContext);

  const [chatData, setChatData] = useState<ChatMsgItem[]>([]);
  const [chatMsg, setChatMsg] = useState('');

  useEffect(() => {
    const handleGetMessage = (data: ChatMsgItem) => {
      const { id, nickname, message } = data;
      const isSender = socket.id === id;
      setChatData((prevChatData) => [...prevChatData, { isSender, message, nickname }]);
    };

    socket.on('getMessage', handleGetMessage);

    return () => {
      socket.off('getMessage', handleGetMessage);

      // if (socket.connected) {
      //   socket.disconnect();
      // }
    };
  }, []);

  useEffect(() => {
    const chatBox = document.querySelector('.chatBox');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [chatData]);

  const handleChat = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key && e.key === 'Enter') {
      sendChatMessage();
    }
  };

  const sendChatMessage = () => {
    socket.emit('sendMessage', chatMsg);
    setChatMsg('');
  };

  return (
    <div className="chatContainer" css={chatStyle}>
      <div className="chatBox">
        {chatData.length > 0 &&
          chatData.map((item, i) => (
            <div className={item.isSender ? 'color-blue' : ''} key={i}>{item.nickname}: {item.message}</div>
          ))
        }
      </div>
      <div className="inputBox">
        <textarea
          value={chatMsg}
          placeholder="메세지를 입력해주세요."
          onKeyUp={handleChat} onChange={e => setChatMsg(e.target.value)}
        >
        </textarea>
        <button type="button" onClick={sendChatMessage}>전송</button>
      </div>
    </div>
  );
}