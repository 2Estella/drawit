import { useContext, useEffect, useState } from 'react';
import { lobbyContainerStyle } from '../assets/styles/pages/LobbyStyles';
import RoomModal from '../components/RoomModal';
import { SocketContext } from '../contexts/WebSocketContext';

export default function Lobby() {
  const socket = useContext(SocketContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    socket.emit('setInit', { nickname: '', id: socket.id });

    socket.on('getRoomList', (rooms) => {
      rooms = Object.entries(rooms).map(([_, value]) => value);

      const newRoomList = rooms.filter(room => room.roomId !== 'room:lobby');

      setRoomList(newRoomList);
    });
    console.log(roomList);

    return () => {
      socket.off('getRoomList');
    };
  }, []);


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
              <th>방장</th>
              <th>인원</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>테스트방</td>
              <td>마스터</td>
              <td>1/4</td>
              <td>-</td>
            </tr>
            <tr>
              <td>2</td>
              <td>테스트방</td>
              <td>마스터</td>
              <td>1/4</td>
              <td>-</td>
            </tr>
            <tr>
              <td>3</td>
              <td>테스트방</td>
              <td>마스터</td>
              <td>1/4</td>
              <td>-</td>
            </tr>
            <tr>
              <td>4</td>
              <td>테스트방</td>
              <td>마스터</td>
              <td>1/4</td>
              <td>-</td>
            </tr>
            <tr>
              <td>5</td>
              <td>테스트방</td>
              <td>마스터</td>
              <td>1/4</td>
              <td>-</td>
            </tr>
            <tr>
              <td>6</td>
              <td>테스트방</td>
              <td>마스터</td>
              <td>1/4</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <RoomModal
        width={'350px'}
        height={'250px'}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
}