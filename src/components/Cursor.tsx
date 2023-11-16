import { css } from '@emotion/react';

interface CursorInfoType {
  size: number
  x: number
  y: number
}

export default function Cursor(cursorInfo: CursorInfoType) {
  const {size, x, y} = cursorInfo;

  const cursorStyle = css`
    position: absolute;
    border-radius: 50%;
    border: 2px double #ccc;
    width: ${size}px;
    height: ${size}px;
    left: -15px;
    top: -15px;
    transform : translate(${x}px, ${y}px);
  `;

  return (
    <div className="pointer" css={cursorStyle}></div>
  );
}