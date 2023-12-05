import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contexts/WebSocketContext';
import { chatStyle, } from '../assets/styles/pages/DrawBoardStyles';
import EmojiPicker, { Emoji, EmojiClickData, EmojiStyle } from 'emoji-picker-react';

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
  const [isShowEmoji, setIsShowEmoji] = useState(false);

  useEffect(() => {
    const handleGetMessage = (data: ChatMsgItem) => {
      const { id, nickname, message } = data;
      const isSender = socket.id === id;
      setChatData((prevChatData) => [...prevChatData, { isSender, message, nickname }]);
    };

    socket.on('getMessage', handleGetMessage);

    return () => {
      socket.off('getMessage', handleGetMessage);
    };
  }, [socket]);

  useEffect(() => {
    const chatBox = document.querySelector('.chatBox');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [chatData]);

  const handleChat = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter') {
      sendChatMessage();
    }
  };

  const sendChatMessage = () => {
    if (chatMsg.trim() !== '') {
      socket.emit('sendMessage', chatMsg);
      setChatMsg('');
    }
  };

  return (
    <div className="chatContainer" css={chatStyle}>
      <div className="chatBox scrollBar">
        {chatData.length > 0 &&
          chatData.map((item, i) => (
            <div className={item.isSender ? 'outgoingMsg' : ''} key={i}>
              {item.nickname === '안내' ? (
                <span className="info">
                  [{item.nickname}] {item.message}
                </span>
              ) : (
                <>
                  {item.isSender ? (
                    <span className="message">{item.message}</span>
                    ) : (
                    <span className="message">{item.nickname}: {item.message}</span>
                  )}
                </>
              )}
            </div>
          ))}
      </div>

      <div className="inputBox">
        <textarea
          className="scrollBar"
          value={chatMsg}
          maxLength={70}
          placeholder="메세지를 입력해주세요."
          onKeyUp={handleChat} onChange={e => setChatMsg(e.target.value)}
        >
        </textarea>

        <div className="buttonArea">
          <div
            className="emojiBox"
            onClick={() => setIsShowEmoji(!isShowEmoji)}
          >
            <Emoji
              unified="1f603"
              size={25}
              emojiStyle={EmojiStyle.GOOGLE}
            />
            {isShowEmoji &&
              <EmojiPicker
                onEmojiClick={(emojiData: EmojiClickData) => setChatMsg((prevChatMsg) => prevChatMsg + emojiData.emoji)}
                emojiStyle={EmojiStyle.GOOGLE}
              />
            }
          </div>
          <button
            className="sendButton"
            type="button"
            onClick={sendChatMessage}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}