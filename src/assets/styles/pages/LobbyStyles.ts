import { css } from '@emotion/react';
import { Common } from '../Common';

export const lobbyContainerStyle = css`
  width: 100%;
  height: 100vh;
  // padding-top: 10vh;
  // background: ${Common.colors.grey500};

  .titleBox {
    height: 50px;
    margin: 5vh 0;
    text-align: center;
    font-size: 52px;
    font-weight: bold;
  }

  & > .buttonBox {
    width: 700px;
    margin: 0 auto;
    text-align: right;

    button {
      margin-bottom: 5px;
      padding: 10px 20px;
      color: ${Common.colors.white};
      background: ${Common.colors.grey300};
      border-radius: 5px;
      font-size: 15px;
    }
  }

  .tableBox {
    width: 700px;
    height: 600px;
    margin: 0 auto;
    border: 1px solid ${Common.colors.grey200};
    border-radius: 5px;

    table {
      width: 100%;
      text-align: center;
      font-size: 14px;

      thead {
        color: ${Common.colors.white};
        background: ${Common.colors.grey200};

        th {
          width: 15%;
          padding: 10px 20px;

          &.title {
            width: 40%;
            padding-left: 10px;
            text-align: left;
          }
        }
      }

      tbody {
        tr {
          cursor: pointer;
          border-bottom: 1px solid ${Common.colors.grey200};;

          // &:nth-of-type(2n) {
          //   background: ${Common.colors.grey50};
          // }

          &:hover {
            background: ${Common.colors.grey50};
          }
        }

        td {
          padding: 8px 0;

          &:nth-of-type(2) {
            padding-left: 10px;
            text-align: left;
          }
        }
      }
    }
  }
`;