/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { ReactElement, useState } from "react";

import { Chevron } from "../icons/Chevron";

// TODO:
// - Change chevron color to gray200.
// - Make buttons accessible.
// - Add another gray to support secondary button active state.
// - Add popup that appears on click of [...] button and allows user to pick
//   page to visit
//   https://www.figma.com/file/02qXWWXRyUT25SGOs2dhk3/Untitled?node-id=89%3A238

const Item = ({ isSelected, onPress, children }) => {
  const theme = useTheme();
  const { sizes, radii, fontSizes } = theme;
  return (
    <div
      onClick={onPress}
      css={{
        height: sizes[4],
        width: sizes[4],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii[3],
        fontSize: fontSizes[1],
        color: isSelected ? "var(--background)" : "var(--secondary-text)",
        background: isSelected ? "var(--primary)" : "none",
        border: isSelected ? "none" : "1px solid (--border)",
        cursor: "pointer",
        "&:hover": {
          background: isSelected ? "var(--hovered-button)" : "var(--border)",
        },
        "&:active": {
          background: isSelected
            ? "var(--pressed-button)"
            : "var(--secondary-text)",
        },
      }}
    >
      {children}
    </div>
  );
};

function PreviousButton({ onPress }) {
  const theme = useTheme();
  const { fontSizes, space, radii } = theme;

  return (
    <div
      onClick={onPress}
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: fontSizes[1],
        paddingLeft: space[2],
        paddingRight: space[2],
        borderRadius: radii[3],
        cursor: "pointer",
        "&:hover": {
          background: "var(--border)",
        },
        "&:active": {
          background: "var(--secondary-text)",
        },
      }}
    >
      <div css={{ transform: "rotate(90deg)" }}>
        <Chevron />
      </div>{" "}
      Previous
    </div>
  );
}

function NextButton({ onPress }) {
  const theme = useTheme();
  const { fontSizes, space, radii } = theme;

  return (
    <div
      onClick={onPress}
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: fontSizes[1],
        paddingLeft: space[2],
        paddingRight: space[2],
        borderRadius: radii[3],
        cursor: "pointer",
        "&:hover": {
          background: "var(--border)",
        },
        "&:active": {
          background: "var(--secondary-text)",
        },
      }}
    >
      Next{" "}
      <div css={{ transform: "rotate(-90deg)" }}>
        <Chevron />
      </div>
    </div>
  );
}

type Props = {};

/**
 * WIP.
 *
 * <Pagination />
 */
export function Pagination(props: Props): ReactElement {
  const pageCount = 10;
  const visiblePages = 5;
  const showPreviousAndNext = true;

  const [selected, setSelected] = useState(0);
  return (
    <div css={{ display: "flex", gap: 8 }}>
      {showPreviousAndNext && (
        <PreviousButton
          onPress={() => setSelected(Math.max(selected - 1, 0))}
        />
      )}
      {Array.from({ length: pageCount }).map((_, i) => (
        <Item
          key={i}
          isSelected={selected === i}
          onPress={() => {
            setSelected(i);
          }}
        >
          {i + 1}
        </Item>
      ))}
      {showPreviousAndNext && (
        <NextButton
          onPress={() => setSelected(Math.min(selected + 1, pageCount - 1))}
        />
      )}
    </div>
  );
}
