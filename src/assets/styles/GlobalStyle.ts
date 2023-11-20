import { css } from '@emotion/react';

const GlobalStyle = css`
  // 고정 배경 스타일
  .fixedBg {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #595959;
  }
`;

export default GlobalStyle;