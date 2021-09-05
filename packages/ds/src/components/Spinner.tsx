/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import { ReactElement } from "react";

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

/**
 * Spinner component for loading states.
 *
 * <Spinner />
 */
export function Spinner(): ReactElement {
  const size = 32;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      css={{
        animation: `${rotate} 1s linear infinite`,
      }}
    >
      <path
        fill="var(--primary)"
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
      />
    </svg>
  );
}