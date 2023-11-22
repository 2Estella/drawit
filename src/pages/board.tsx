import { useState, useRef, useEffect, } from 'react';
import { Stage, Layer, Line, } from 'react-konva';
import { SketchPicker  } from 'react-color';
import { KonvaEventObject } from 'konva/lib/Node';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEraser, faArrowRotateRight, faArrowRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { boardStyle, chatStyle, containerStyle, toolLeftStyle, toolRightStyle } from '../assets/styles/pages/Board';
import io from 'socket.io-client';
import NicknameModal from '../components/NicknameModal';

interface Point {
  x: number
  y: number
}

interface LinesItem {
  tool: string
  points: Point[]
  color?: string
  size?: number
  opacity?: number
}

interface ChatMsgItem {
  message: string
  isSender: boolean
  nickname: string
}

interface UserInfoType {
  nickname: string
  room: {
    roomId: string
    name: string
  }
}

const socket = io('http://localhost:8080');

export default function Board() {
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    room: {
      roomId: '',
      name: '',
    },
  });

  const isDrawing = useRef(false);
  const [color, setColor] = useState<string>('#000');
  const [tool, setTool] = useState<string>('pen');
  const [lines, setLines] = useState<LinesItem[]>([]);
  const [history, setHistory] = useState<LinesItem[][]>([]);
  // ToolRight
  const [size, setSize] = useState(10);
  const [opacity, setOpacity] = useState(1);
  const [stabilizer, setStabilizer] = useState(10);
  const [shape, setShape] = useState(100);

  const [chatData, setChatData] = useState<ChatMsgItem[]>([]);
  const [chatMsg, setChatMsg] = useState('');

  const [isOpenModal, setIsOpenModal] = useState(true);

  useEffect(() => {
    if (userInfo.nickname) {
      // TODO: 로컬스토리지에 저장된 닉네임 가져오기
      setIsOpenModal(true);
    }

    socket.on('getMessage', handleGetMessage);
    socket.on('getDrawLines', (data) => {
      setLines(data);
    });

    // 언마운트될 때 종료
    return () => {
      socket.off('getMessage', handleGetMessage);
      socket.off('getDrawLines', (data) => {
        setLines(data);
      });

      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const chatBox = document.querySelector('.chatBox');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [chatData]);

  const handleGetMessage = (data) => {
    const { id, nickname, message } = data;
    const isSender = socket.id === id;
    setChatData((prevChatData) => [...prevChatData, { isSender, message, nickname }]);
  };

  /**
   * 그림판 클릭(터치) 시작 시 액션
   * @param e MouseEvent | TouchEvent
   */
  const handleMouseDown = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition() ?? {x: 0, y: 0};

    setLines([...lines, { tool, points: [{x: pos.x , y: pos.y}] }]);
  };

  /**
   * 그리기(isDrawing) 상태인 경우 라인을 그려준다.
   * @param e MouseEvent | TouchEvent
   * @returns isDrawing(그리기) 상태가 아닌 경우 실행 안함
   */
  const handleMouseMove = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    const point = stage?.getPointerPosition() ?? {x: 0, y: 0};
    const lastLine = lines[lines.length - 1];

    lastLine.points.push({ x: point.x, y: point.y });

    lastLine.color = color;
    lastLine.size = size;
    lastLine.opacity = opacity;

    lines.splice(lines.length - 1, 1, lastLine);

    setLines(lines.concat());
  };

  /**
   * 그리기 상태 중 클릭(터치) 종료 시 액션
   */
  const handleMouseUp = () => {
    isDrawing.current = false;
    // 그려진 라인 서버로 전달
    socket.emit('sendDrawLines', lines);
  };

  /**
   * 그리기 되돌리기
   */
  const handleUndo = () => {
    if (!lines.length) {
      return;
    }

    const lastLine = lines[lines.length - 1];
    const newLines = lines.slice(0, lines.length - 1);

    setHistory([...history, [lastLine]]);
    setLines(newLines);
  };

  /**
   * 그리기 실행취소
   */
  const handleRedo = () => {
    if (!history.length) {
      return;
    }

    const lastLine = history[history.length - 1];
    const newLines = lines.concat(lastLine);
    const newHistory = history.slice(0, history.length - 1);

    setLines(newLines);
    setHistory(newHistory);
  };

  /**
   * 그림 전체 삭제
   */
  const handleReset = () => {
    setHistory([lines]);
    setLines([]);
  };

  const handleChat = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key && e.key === 'Enter') {
      sendChatMessage();
    }
  };

  const sendChatMessage = () => {
    socket.emit('sendMessage', chatMsg);
    setChatMsg('');
  };

  // const openModal = () => {
  //   setIsOpenModal(true);
  // };

  const closeModal = (nickname?: string) => {
    socket.emit('setInit', {nickname, id: socket.id }, (response: UserInfoType) => {
      setUserInfo(response);
    });

    setIsOpenModal(false);
  };

  return (
    <>
      <div className="boardContainer" css={containerStyle}>
        <div className="toolLeft" css={toolLeftStyle}>
          <FontAwesomeIcon
            icon={faPen}
            onClick={() => [setTool('pen'), setHistory(history.slice(0, history.length - 1))]}
          />
          <FontAwesomeIcon
            icon={faEraser}
            onClick={() => [setTool('eraser'), setHistory(history.slice(0, history.length - 1))]}
          />
          <FontAwesomeIcon
            icon={faArrowRotateLeft}
            onClick={handleUndo}
          />
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            onClick={handleRedo}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={handleReset}
          />
        </div>

        <div css={boardStyle}>
          <Stage
            className="board"
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Layer>
              {lines.length > 0 &&
                lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points.map((point) => [point.x, point.y]).flat()}
                    stroke={line.color}
                    strokeWidth={line.size}
                    tension={0.5}
                    opacity={line.opacity}
                    lineCap="round"
                    lineJoin="miter"
                    globalCompositeOperation={
                      line.tool === 'eraser' ? 'destination-out' : 'source-over'
                    }
                  />
                ))}
            </Layer>
          </Stage>
        </div>

        <div className="toolRight" css={toolRightStyle}>
          <div className="tools">
            <SketchPicker
              color={color}
              onChange={color => setColor(color.hex)}
            />
            <label>
              <span>Size: </span>
              <input
                type="range"
                value={size}
                min="1"
                max="100"
                step="1"
                onChange={e => setSize(Number(e.target.value))}
              />
            </label>
            <label>
              <span>Opacity: </span>
              <input
                type="range"
                value={opacity}
                min="0.1"
                max="1"
                step="0.01"
                onChange={e => setOpacity(Number(e.target.value))}
              />
            </label>
            <label>
              <span>Stabilizer: </span>
              <input
                type="range"
                value={stabilizer}
                min="1"
                max="100"
                step="1"
                onChange={e => setStabilizer(Number(e.target.value))}
              />
            </label>
            <label>
              <span>Shape: </span>
              <input
                type="range"
                value={shape}
                min="1"
                max="100"
                step="1"
                onChange={e => setShape(Number(e.target.value))}
              />
            </label>
          </div>

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
        </div>
      </div>

      <NicknameModal
        width={'350px'}
        height={'250px'}
        isOpen={isOpenModal}
        onClose={closeModal}
      />
    </>
  );
}