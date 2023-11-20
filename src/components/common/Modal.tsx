import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { Common } from '../../assets/styles/Common';

interface ModalProps {
  width: string
  height: string
  children: ReactNode
}

export default function Modal({ width, height, children }: ModalProps) {
  const modalStyle = css`
    width: ${width};
    height: ${height};
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    padding: 20px 15px;
    border: 1px solid ${Common.colors.toolText};
    border-radius: 4px;
  `;

  return (
    <>
      <div className="fixedBg">
        <div css={modalStyle}>
          {children}
        </div>
      </div>
    </>
  );
}