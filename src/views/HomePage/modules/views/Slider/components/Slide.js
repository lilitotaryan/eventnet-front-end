/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Slide = ({ content, width }) => (
  <div
    css={css`
      height: 100%;
      width: ${width}px;
      background-image: url('${content}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      animation:fade2 8s infinite;
      -webkit-animation:fade2 8s infinite;
    `}
  />
);

export default Slide;
