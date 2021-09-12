import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import React, { Fragment, ReactElement, useRef, useState } from "react";

import colors from "../colors";
import { Chevron } from "../icons/Chevron";
import { atoms } from "../theme.css";
import {
  directionButton,
  pageButton,
  rotateLeft,
  rotateRight,
} from "./Pagination.css";

function PageButton(props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  let color;
  let background;

  if (props.isSelected) {
    color = {
      lightMode: "white",
      darkMode: "gray-900",
    };
    if (isPressed) {
      background = "pink-700";
    } else if (isHovered) {
      background = "pink-600";
    } else {
      background = "pink-500";
    }
  } else {
    color = {
      lightMode: "black",
      darkMode: "gray-500",
    };
    if (isPressed) {
      background = {
        lightMode: "gray-300",
        darkMode: "gray-700",
      };
    } else if (isHovered) {
      background = {
        lightMode: "gray-200",
        darkMode: "gray-800",
      };
    } else {
      background = {
        lightMode: "white",
        darkMode: "gray-900",
      };
    }
  }

  return (
    <button
      ref={ref}
      className={`${pageButton} ${atoms({
        color,
        background,
        boxShadow: isFocusVisible ? "outline" : "none",
      })}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...mergeProps(buttonProps, focusProps)}
    >
      {props.children}
    </button>
  );
}

const Item = (props) => {
  return (
    <PageButton onPress={props.onPress} isSelected={props.isSelected}>
      {props.children}
    </PageButton>
  );
};

const Dots = (props) => {
  return (
    <PageButton
      onPress={() => {
        // TODO
      }}
    >
      ...
    </PageButton>
  );
};

function DirectionButton(props: {
  onPress: () => void;
  variant: "next" | "previous";
  isDisabled?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      ref={ref}
      className={`${directionButton} ${atoms({
        opacity: props.isDisabled ? 0.5 : 1,
        cursor: props.isDisabled ? "default" : "pointer",
        boxShadow: isFocusVisible ? "outline" : "none",
        background: {
          lightMode: isPressed
            ? "gray-400"
            : isHovered
            ? "gray-300"
            : "gray-200",
          darkMode: isPressed
            ? "gray-800"
            : isHovered
            ? "gray-700"
            : "gray-600",
        },
      })}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...mergeProps(buttonProps, focusProps)}
    >
      {props.variant === "next" ? (
        <Fragment>
          Next
          <div className={rotateLeft}>
            <Chevron />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className={rotateRight}>
            <Chevron />
          </div>
          Previous
        </Fragment>
      )}
    </button>
  );
}

type Props = {
  /**
   * Total number of pages.
   */
  pageCount: number;
  /**
   * Number of visible pages (including dots). For example, 1 ... 4 5 6 ... 10
   * is 7 visible pages. Minimum is 7 (or component will throw).
   */
  visiblePages: number;
  /**
   * Hide buttons for going one page back or forward.
   */
  hidePreviousAndNext?: boolean;
};

/**
 * WIP.
 *
 * <Pagination pageCount={10} visiblePages={7} />
 */
export function Pagination(props: Props): ReactElement {
  const { pageCount, visiblePages, hidePreviousAndNext } = props;

  if (visiblePages < 7) {
    throw new Error("visiblePages must be >= 7.");
  }

  const [selected, setSelected] = useState(0);

  let pages;

  if (selected < 3) {
    pages = [
      ...Array.from({ length: visiblePages - 2 }).map((_, index) => index),
      undefined,
      pageCount - 1,
    ];
  } else if (selected >= pageCount - 3) {
    pages = [
      0,
      undefined,
      ...Array.from({ length: visiblePages - 2 }).map(
        (_, index) => pageCount - visiblePages + 2 + index
      ),
    ];
  } else {
    pages = [
      0,
      undefined,
      ...Array.from({ length: visiblePages - 4 }).map(
        (_, index) => selected - 1 + index
      ),
      undefined,
      pageCount - 1,
    ];
  }

  return (
    <div className={atoms({ display: "flex", gap: "m" })}>
      {!hidePreviousAndNext && (
        <DirectionButton
          variant="previous"
          onPress={() => setSelected(Math.max(selected - 1, 0))}
          isDisabled={selected === 0}
        />
      )}
      {pages.map((page, index) => (
        <Fragment key={index}>
          {page === undefined ? (
            <Dots />
          ) : (
            <Item
              isSelected={selected === page}
              onPress={() => {
                setSelected(page);
              }}
            >
              {page + 1}
            </Item>
          )}
        </Fragment>
      ))}
      {!hidePreviousAndNext && (
        <DirectionButton
          variant="next"
          onPress={() => setSelected(Math.min(selected + 1, pageCount - 1))}
          isDisabled={selected === pageCount - 1}
        />
      )}
    </div>
  );
}
