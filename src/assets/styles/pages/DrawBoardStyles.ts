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
  background: ${Common.colors.grey400};

  svg {
    color: ${Common.colors.grey200};
    width: 25px;
    height: 25px;
    padding: 6px;
    cursor: pointer;

    &.on {
      background: ${Common.colors.grey250};
      border-radius: 50%;
    }
  }
`;

export const toolRightStyle = css`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${Common.colors.grey400};
  color: ${Common.colors.grey200};

  .tools {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px 15px;

    .sketch-picker {
      margin-bottom: 5px;
      background: ${Common.colors.grey200} !important;
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
        background: ${Common.colors.grey100};
        border-radius: 5px;
      }

      input[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid ${Common.colors.grey100};
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 1px;
        height: 1px;
        background: transport;
        cursor: pointer;
        box-shadow: -100vw 0 0 100vw ${Common.colors.grey200};
      }
    }
  }
`;

export const boardStyle = css`
  width: 100%;
  flex: 1;
  padding: 80px 30px 30px;
  background: ${Common.colors.grey500};
  overflow: auto;

  .board {
    width: 800px;
    height: 500px;
    margin: 0 auto;
    background: ${Common.colors.white};
    overflow: hidden;
  }
`;

export const chatStyle = css`
  padding: 20px 10px;
  background: ${Common.colors.grey200};
  height: 353px;

  .chatBox {
    position: relative;
    height: 21vh;
    padding: 2px;
    background: ${Common.colors.white};
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
      color: ${Common.colors.grey300};
      background: ${Common.colors.grey50};
      border-radius: 5px;
      word-break: break-all;
    }

    // 보낸 메세지 스타일
    .outgoingMsg {
      width: 100%;
      text-align: right;

      .message {
        padding: 3px 5px;
        color: ${Common.colors.blue};
        background: ${Common.colors.blueBg};
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
      outline-color: none;

      &:focus {
        outline: none !important;
      }

      &::placeholder {
        font-size: 12px;
      }
    }

    .buttonArea {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 5px;
      margin-top: 10px;
      // background: ${Common.colors.white};

      .emojiBox {
        position: relative;

        .EmojiPickerReact {
          position: absolute;
          top: -450px;
          left: -350px;
        }
      }

      svg {
        width: 25px;
        height: 25px;
      }

      .sendButton {
        width: 50px;
        // margin-top: 10px;
        padding: 8px;
        background: ${Common.colors.grey400};
        color: ${Common.colors.white};
        font-size: 14px;
      }
    }

  }
`;