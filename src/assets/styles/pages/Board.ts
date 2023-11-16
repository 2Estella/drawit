import { css } from '@emotion/react';
import { Common } from '../Common';

export const containerStyle = css`
  display: flex;
`;

export const toolLeftStyle = css`
  width: 55px;
  min-width: 55px;
  height: 100vh;
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
  width: 30%
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 15px;
  background: ${Common.colors.toolBackground};
  color: ${Common.colors.toolText};

  .sketch-picker {
    margin-bottom: 15px;
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
`;

export const boardStyle = css`
  width: 68%;
  padding: 30px;
  background: ${Common.colors.boardBackground};

  .board {
    width: 100%;
    max-width: 100%;
    height: 500px;
    background: #fff;
    overflow: hidden;
  }
`;