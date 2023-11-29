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

  // 스크롤바 커스텀
  .scrollBar::-webkit-scrollbar {
    width: 6px;  /* 스크롤바의 너비 */
  }
  .scrollBar::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #6D6A6A; /* 스크롤바의 색상 */
    border-radius: 10px;
  }
  .scrollBar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);  /*스크롤바 뒷 배경 색상*/
  }
`;

export default GlobalStyle;