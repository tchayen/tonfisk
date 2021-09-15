import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import {
  OverlayContainer,
  useOverlayPosition,
  useOverlayTrigger,
} from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "@react-stately/overlays";
import React, { Fragment, ReactNode, useRef, useState } from "react";

import { Chevron } from "../icons/Chevron";
import { atoms } from "../theme.css";
import {
  directionButton,
  pageButton,
  pagination,
  rotateLeft,
  rotateRight,
} from "./Pagination.css";
import { Popover } from "./Popover";
import { TextInput } from "./TextInput";

function PageButton(props: {
  children: ReactNode;
  onPress?: () => void;
  isSelected?: boolean;
  triggerRef?: React.RefObject<HTMLElement>;
  isDisabled?: boolean;
  overrideButtonProps?: any;
}) {
  const ref = props.triggerRef || useRef<HTMLButtonElement>(null);
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
      // TODO: recipe
      className={`${pageButton} ${atoms({
        color,
        background,
        boxShadow: isFocusVisible && !props.isDisabled ? "outline" : "none",
      })}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...mergeProps(props.overrideButtonProps || buttonProps, focusProps)}
    >
      {props.children}
    </button>
  );
}

const Item = ({
  children,
  onPress,
  isSelected,
}: {
  children: ReactNode;
  onPress: () => void;
  isSelected: boolean;
}) => {
  return (
    <PageButton onPress={onPress} isSelected={isSelected}>
      {children}
    </PageButton>
  );
};

const Dots = ({ onChange }: { onChange: (number: number) => void }) => {
  const state = useOverlayTriggerState({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef(null);

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: "bottom",
    offset: 8,
    isOpen: state.isOpen,
  });

  const { buttonProps } = useButton(
    { onPress: () => state.open() },
    triggerRef
  );

  const [pageNumber, setPageNumber] = useState<number | null>(null);

  const submit = () => {
    if (pageNumber !== null) {
      onChange(Number(pageNumber - 1));
    }
    setPageNumber(null);
    state.close();
  };

  return (
    <>
      <PageButton
        triggerRef={triggerRef}
        overrideButtonProps={mergeProps(triggerProps, buttonProps)}
      >
        ...
      </PageButton>
      {state.isOpen && (
        <OverlayContainer>
          <Popover
            {...mergeProps(overlayProps, positionProps)}
            ref={overlayRef}
            isOpen={state.isOpen}
            onClose={submit}
          >
            <div style={{ width: "48px" }}>
              <TextInput
                aria-label="Page number"
                placeholder="0"
                autoFocus
                value={pageNumber}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    submit();
                  }
                }}
                onChange={(event) => {
                  setPageNumber(event.target.value);
                }}
              />
            </div>
          </Popover>
        </OverlayContainer>
      )}
    </>
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

  const buttonClassName = atoms({
    opacity: props.isDisabled ? 0.5 : 1,
    cursor: props.isDisabled ? "default" : "pointer",
    boxShadow: isFocusVisible && !props.isDisabled ? "outline" : "none",
    background: {
      lightMode: isPressed ? "gray-400" : isHovered ? "gray-300" : "gray-200",
      darkMode: isPressed ? "gray-800" : isHovered ? "gray-700" : "gray-600",
    },
  });

  const chevron = atoms({
    fill: {
      lightMode: isPressed ? "gray-500" : "gray-400",
      darkMode: isPressed ? "gray-900" : isHovered ? "gray-800" : "gray-700",
    },
  });

  return (
    <button
      ref={ref}
      // TODO: recipe
      className={`${directionButton} ${buttonClassName}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...mergeProps(buttonProps, focusProps)}
    >
      {props.variant === "next" ? (
        <Fragment>
          Next
          <div className={rotateLeft}>
            <Chevron className={chevron} />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className={rotateRight}>
            <Chevron className={chevron} />
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
   * Number of visible pages (including dots). For example, (1) (...) (4) (5) (6) (...) (10)
   * is 7 visible pages. Minimum is 7 (or component will throw an error).
   */
  visiblePages: number;
  /**
   * Hide buttons for going one page back or forward.
   */
  hidePreviousAndNext?: boolean;
};

/**
 * Pagination component. Features previous/next buttons, does not allow
 * visiting pages outside of the specified range. In case there is a gap between
 * pages, a three-dot button appears that after clicking show popover with input
 * that takes to provided page on enter/escape/blur.
 *
 * <Pagination pageCount={10} visiblePages={7} />
 */
export function Pagination(props: Props): JSX.Element {
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
    <div className={pagination}>
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
            <Dots
              onChange={(number) =>
                setSelected(Math.min(Math.max(0, number), pageCount - 1))
              }
            />
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
