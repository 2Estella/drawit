import { css } from '@emotion/react';
import { Common } from '../Common';

export const containerStyle = css`
  display: flex;
  height: 100vh;
  overflow: hidden;
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
    padding: 6px;
    cursor: pointer;

    &.on {
      background: #7c7c7c3f;
      border-radius: 50%;
    }
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
  width: 100%;
  flex: 1;
  padding: 80px 30px 30px;
  background: ${Common.colors.boardBackground};
  overflow: auto;

  .board {
    width: 800px;
    height: 500px;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
  }
`;

export const chatStyle = css`
  padding: 20px 10px;
  background: #7C7C7C;
  height: 353px;

  .chatBox {
    position: relative;
    height: 21vh;
    padding: 2px;
    background: #fff;
    overflow-y: auto;
    font-size: 14px;
    border-radius: 5px;

    // 안내 메세지 스타일
    .info {
      font-size: 12px;
    }

    .message {
      display: inline-block;
      max-width: 80%;
      margin: 2px;
      padding: 2px 4px;
      color: #6D6A6A;
      background: #EEEEEE;
      border-radius: 5px;
      word-break: break-all;
    }

    // 보낸 메세지 스타일
    .outgoingMsg {
      width: 100%;
      text-align: right;

      .message {
        padding: 3px 5px;
        color: #217af4;
        background: rgba(33, 122, 244, .1);
        text-align: left;
      }
    }
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
`;