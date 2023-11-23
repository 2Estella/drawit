import { css } from '@emotion/react';

const ResetStyle = css`
  * {margin:0; padding:0; box-sizing: border-box;}
  html, body {overflow-y: hidden; overflow-x: overlay;}
  html, body, div, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, acronym, address, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, article, aside, hgroup, header, footer, figure, figcaption, nav, section {border-collapse: collapse; padding:0; margin:0; box-sizing:border-box; background:transparent;}
  ol, ul, li {list-style:none;}
  label {vertical-align:middle; cursor:pointer;}
  a {text-decoration:none; cursor:pointer; vertical-align:baseline; color:#000;}
  a:hover {text-decoration:none; outline:none;}
  address, i, em {font-style:normal;}
  legend, hr {display:none;}
  caption {visibility:hidden; width:0; height:0; font-size:0; line-height:0;}
  img, fieldset {border:0;}
  img {max-width:100%; border:0; vertical-align:top;}
  button, input, optgroup, select, textarea {font:inherit; color:inherit;}
  button {overflow:visible; cursor:pointer; line-height:1; border:0; background:transparent;}
  textarea {resize:vertical; font:inherit; overflow-y:auto;}
  input, select, optgroup {vertical-align:middle; line-height:normal;}
  input, textarea, select {border-radius:0; box-shadow:none;}
  button, select {text-transform:none;}
  select {-webkit-appearance:none;}
  select::-ms-expand {display:none;}
  a, button, input, img {outline:none;}
  button, input[type=button], input[type=reset], input[type=submit] {margin:0; padding:0; -webkit-appearance:button; cursor:pointer; background:none;}
  button:disabled, input[type=button]:disabled, input[type=reset]:disabled, input[type=submit]:disabled {cursor:default;}
  button::-moz-focus-inner, input::-moz-focus-inner {border:0; padding:0;}
  button:active, button:active > * {-ms-transform:translate(-1px, -1px);}
  button:active:before, button:active:after {-ms-transform:translate(1px, 1px);}
`;

export default ResetStyle;