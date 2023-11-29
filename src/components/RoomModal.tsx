import { useContext, useState } from 'react';
import { SocketContext } from '../contexts/WebSocketContext';
import { css } from '@emotion/react';
import Modal from './common/Modal';
import { Common } from '../assets/styles/Common';
import { useNavigate } from 'react-router-dom';

interface NicknameModalProps {
  width: string
  height: string
  isOpen: boolean
  onClose: () => void
}

export default function RoomModal({ width, height, isOpen, onClose }: NicknameModalProps) {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [roomName, setRoomName] = useState('');

  const createRoom = () => {
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('roomName', roomName);

    socket.emit('createRoom', { nickname, roomName }, (response) => {
      if (response.error) {
        console.error('Error createRoom:', response.error);
      } else {
        navigate('/drawBoard');
      }
    });
  };

  const modalStyle = css`
    label {
      width: 100%;
      display: inline-block;
      margin-top: 10px;

      span {
        font-size: 13px;
        font-weight: bold;
      }

      input[type='text'] {
        width: 100%;
        height: 35px;
        border: none;
        border-bottom: 1px solid ${Common.colors.colorPickerBackground};
      }
    }

    .buttonBox {
      width: 100%;
      display: flex;
      justify-content: space-between;

      button {
        width: 49%;
        margin: 20px 0 15px;
        padding: 10px 20px;
        border: 1px solid ${Common.colors.colorPickerBackground};
        border-radius: 5px;
        background: ${Common.colors.colorPickerBackground};
        color: #fff;

        &:first-of-type {
          background: #ccc;
          border: 0;

          &:hover {
            background: ${Common.colors.colorPickerBackground};
          }
        }
      }
    }
  `;

  if (!isOpen) {
    return null;
  }

  return (
    <Modal width={width} height={height}>
      <div css={modalStyle}>
        <label>
          <span>방제목</span>
          <input
            type="text"
            name="roomName"
            maxLength={10}
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
          />
        </label>
        <label>
          <span>닉네임</span>
          <input
            type="text"
            name="nickname"
            maxLength={10}
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
        </label>

        <div className="buttonBox">
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button type="button" onClick={createRoom}>
            방만들기
          </button>
        </div>
      </div>
    </Modal>
  );
}