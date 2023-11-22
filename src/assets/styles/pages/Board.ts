import { css } from '@emotion/react';
import { Common } from '../Common';

export const containerStyle = css`
  display: flex;
  height: 100vh;
`;

export const toolLeftStyle = css`
  width: 55px;
  min-width: 55px;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
  background: ${Common.colors.toolBackground};

  svg {
    color: ${Common.colors.toolText};
    width: 25px;
    height: 25px;
    padding: 5px;
    cursor: pointer;
  }
`;

export const toolRightStyle = css`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${Common.colors.toolBackground};
  color: ${Common.colors.toolText};

  .tools {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px 15px;

    .sketch-picker {
      margin-bottom: 5px;
      background: #7C7C7C !important;
    }

    label {
      display: block;

      span {
        display: inline-block;
        width: 70px;
        font-weight: bold;
        font-size: 13px;
        cursor: auto;
      }

      input[type="range"] {
        overflow: hidden;
        height: 20px;
        -webkit-appearance: none;
        margin: 5px 0;
        width: calc(100% - 70px);
        background: #ccc;
        border-radius: 5px;

        // &:focus {
        //   outline: none;
        // }
      }

      input[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #7C7C7C;
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 1px;
        height: 1px;
        background: transport;
        cursor: pointer;
        box-shadow: -100vw 0 0 100vw #7C7C7C;
      }
    }
  }
`;

export const boardStyle = css`
  width: 68%;
  min-width: 1000px;
  flex: 1 0 0;
  padding: 80px 30px 30px;
  background: ${Common.colors.boardBackground};

  .board {
    width: 800px;
    height: 500px;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
  }
`;

export const chatStyle = css`
  background: #7C7C7C;
  height: 353px;
  padding: 20px 10px;

  .chatBox {
    background: #fff;
    height: 21vh;
    overflow-y: scroll;
  }

  .inputBox {
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    textarea {
      resize: none;
      height: 70px;
      padding: 5px;
      border: 0;
      border-radius: 5px;
      font-size: 13px;

      &::placeholder {
        font-size: 12px;
      }
    }

    button {
      width: 50px;
      margin-top: 10px;
      margin-left: auto;
      padding: 8px;
      background: ${Common.colors.toolBackground};
      color: #fff;
      font-size: 14px;
    }
  }

  .color-blue {
    color: blue;
  }
`;