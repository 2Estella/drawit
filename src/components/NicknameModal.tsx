import { useContext, useState } from 'react';
import { css } from '@emotion/react';
import Modal from './common/Modal';
import { Common } from '../assets/styles/Common';
import { SocketContext } from '../contexts/WebSocketContext';

interface NicknameModalProps {
  width: string
  height: string
  isOpen: boolean
  onClose: () => void
}

export default function NicknameModal({ width, height, isOpen, onClose }: NicknameModalProps) {
  const socket = useContext(SocketContext);

  const [nickname, setNickname] = useState('');

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key && e.key === 'Enter') {
      closeModal();
    }
  };

  const closeModal = () => {
    localStorage.setItem('nickname', nickname);
    socket.emit('setNickname', nickname);

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal width={width} height={height}>
      <div css={modalStyle}>
        <span>사용할 닉네임을 입력해주세요.</span>
        {/* TODO: 닉네임 재설정 안내창 - [기존닉네임]님으로 입장하시겠습니까? */}
        <input
          type="text"
          name="chatMsg"
          maxLength={10}
          value={nickname}
          onKeyUp={handleEnter}
          onChange={e => setNickname(e.target.value)}
        />
        <button
          type="button"
          onClick={closeModal}>사용하기
        </button>
      </div>
    </Modal>
  );
}

const modalStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  span {
    display: block;
    margin: 20px 0;
  }

  input[type='text'] {
    width: 90%;
    height: 35px;
    border: none;
    border-bottom: 1px solid ${Common.colors.grey300};
  }

  button {
    width: 100%;
    margin: 20px 0 15px;
    padding: 10px 20px;
    border: 1px solid ${Common.colors.grey300};
    border-radius: 5px;
    background: ${Common.colors.grey300};
    color: ${Common.colors.white};
  }
`;