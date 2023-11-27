import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lobbyContainerStyle } from '../assets/styles/pages/LobbyStyles';
import NicknameModal from '../components/NicknameModal';
import RoomModal from '../components/RoomModal';
import { SocketContext } from '../contexts/WebSocketContext';

export default function Lobby() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [isOpenNicknameModal, setIsOpenNicknameModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [roomId, setRoomId] = useState('');

  const fetchRoomList = () => {
    socket.emit('setInit', { nickname: '', id: socket.id });

    socket.on('getRoomList', (rooms) => {
      rooms = Object.entries(rooms).map(([_, value]) => value);

      const newRoomList = rooms.filter(room => room.roomId !== 'room:lobby');

      setRoomList(newRoomList);
    });
  };

  useEffect(() => {
    fetchRoomList();

    return () => {
      socket.off('getRoomList');
    };
  }, []);

  const enterRoom = (roomId: string, members: number) => {
    if (members >= 4) {
      alert('입장할 수 있는 인원을 초과하였습니다.');

      return;
    }

    setRoomId(roomId);

    const savedNickname = localStorage.getItem('nickname') ?? '';

    if (savedNickname) {
      localStorage.setItem('roomId', roomId);
      socket.emit('setNickname', savedNickname);
      socket.emit('enterRoom', roomId);
      navigate('/drawBoard');

    } else {
      setIsOpenNicknameModal(true);
    }
  };

  const onCloseNicknameModal = () => {
    setIsOpenNicknameModal(false);

    localStorage.setItem('roomId', roomId);
    socket.emit('enterRoom', roomId);
    navigate('/drawBoard');
  };

  return (
    <div className="LobbyContainer" css={lobbyContainerStyle}>
      <div className="buttonBox">
        <button type="button" onClick={() => setIsOpenModal(true)}>
          방만들기
        </button>
      </div>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>no.</th>
              <th className='title'>제목</th>
              <th>인원</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {roomList.length <= 0 && (
              <tr>
                <td colSpan={4}>No rooms available</td>
              </tr>
            )}
            {roomList.length > 0 &&
              roomList.map((room, i) => (
                <tr key={i} onClick={() => enterRoom(room.roomId, room.members)}>
                  <td>{i + 1}</td>
                  <td>{room.roomName}</td>
                  <td>{room.members}/4</td>
                  <td>-</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <RoomModal
        width={'350px'}
        height={'250px'}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />

      <NicknameModal
        width={'350px'}
        height={'250px'}
        isOpen={isOpenNicknameModal}
        onClose={onCloseNicknameModal}
      />
    </div>
  );
}