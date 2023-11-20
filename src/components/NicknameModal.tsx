import { useState } from 'react';
import { css } from '@emotion/react';
import Modal from './common/Modal';

interface NicknameModalProps {
  width: string
  height: string
  isOpen: boolean
  onClose: (nickname?: string) => void
}

export default function NicknameModal({ width, height, isOpen, onClose }: NicknameModalProps) {
  const [nickname, setNickname] = useState('');

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key && e.key === 'Enter') {
      onClose(nickname);
    }
  };

  const modalStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    span {
      display: block;
      margin-bottom: 20px;
    }
  `;

  if (!isOpen) {
    return null;
  }

  return (
    <Modal width={width} height={height}>
      <div css={modalStyle}>
        <span>사용하실 닉네임을 입력해주세요.</span>

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
          onClick={() => onClose(nickname)}>입장하기
        </button>
      </div>
    </Modal>
  );
}