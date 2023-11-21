import { useState } from 'react';
import { css } from '@emotion/react';
import Modal from './common/Modal';
import { Common } from '../assets/styles/Common';

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
    height: 100%;

    span {
      display: block;
      margin: 20px 0;
    }

    input[type='text'] {
      width: 90%;
      height: 35px;
      border: none;
      border-bottom: 1px solid ${Common.colors.colorPickerBackground};
    }

    button {
      width: 100%;
      margin: 20px 0 15px;
      padding: 10px 20px;
      border: 1px solid ${Common.colors.colorPickerBackground};
      border-radius: 5px;
      background: ${Common.colors.colorPickerBackground};
      color: #fff;
    }
  `;

  if (!isOpen) {
    return null;
  }

  return (
    <Modal width={width} height={height}>
      <div css={modalStyle}>
        <span>사용할 닉네임을 입력해주세요.</span>

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