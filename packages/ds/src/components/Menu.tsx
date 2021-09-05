/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useButton } from "@react-aria/button";
import { FocusScope } from "@react-aria/focus";
import { useFocus } from "@react-aria/interactions";
import { useMenu, useMenuItem, useMenuTrigger } from "@react-aria/menu";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useMenuTriggerState } from "@react-stately/menu";
import { useTreeState } from "@react-stately/tree";
import { TreeState } from "@react-stately/tree";
import { MenuTriggerProps } from "@react-types/menu";
import { ReactNode } from "react";
import { ReactElement, useRef, useState } from "react";

import { Chevron } from "../icons/Chevron";

function MenuPopup(props: {
  onClose: () => void;
  domProps: any;
  onAction: (action: string) => void;
}): ReactElement {
  // Create menu state based on the incoming props
  const state = useTreeState({ ...props, selectionMode: "none" });

  // Get props for the menu element
  const ref = useRef<HTMLUListElement>(null);
  const { menuProps } = useMenu(props, state, ref);

  // Handle events that should cause the menu to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const overlayRef = useRef<HTMLDivElement>(null);
  const { overlayProps } = useOverlay(
    {
      onClose: props.onClose,
      shouldCloseOnBlur: true,
      isOpen: true,
      isDismissable: true,
    },
    overlayRef
  );

  const theme = useTheme();
  const { radii, boxShadow, space } = theme;

  // Wrap in <FocusScope> so that focus is restored back to the
  // trigger when the menu is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <div {...overlayProps} ref={overlayRef}>
        <DismissButton onDismiss={props.onClose} />
        <ul
          {...mergeProps(menuProps, props.domProps)}
          ref={ref}
          css={{
            outline: "none",
            listStyle: "none",
            margin: 0,
            padding: 0,
            position: "absolute",
            zIndex: 100,
            width: "100%",
            overflow: "hidden",
            boxShadow: `0 0 0 1px inset var(--border), ${boxShadow}`,
            background: "var(--background)",
            borderRadius: radii[3],
            marginTop: space[2],
          }}
        >
          {[...state.collection].map((item) => (
            <MenuItem
              key={item.key}
              item={item}
              state={state}
              onAction={props.onAction}
              onClose={props.onClose}
            />
          ))}
        </ul>
        <DismissButton onDismiss={props.onClose} />
      </div>
    </FocusScope>
  );
}

function MenuItem({
  item,
  state,
  onAction,
  onClose,
}: {
  item: {
    key: any;
    rendered: ReactNode;
    isDisabled: boolean;
  };
  state: TreeState<any>;
  onAction: (item: any) => void;
  onClose: () => void;
}): ReactElement {
  // Get props for the menu item element
  const ref = useRef<HTMLLIElement>(null);
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled: item.isDisabled,
      onAction,
      onClose,
    },
    state,
    ref
  );

  const theme = useTheme();
  const { sizes, fontSizes, space } = theme;

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  const [isFocused, setFocused] = useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      css={{
        background: isFocused ? "var(--border)" : "transparent",
        color: isFocused ? "var(--primary-text)" : "var(--secondary-text)",
        padding: "2px 5px",
        outline: "none",
        cursor: "pointer",

        fontSize: fontSizes[1],
        paddingLeft: space[2],
        paddingRight: space[2],
        height: sizes[4],
        display: "flex",
        alignItems: "center",
      }}
    >
      {item.rendered}
    </li>
  );
}

type Props = {
  /**
   * Label of the button.
   */
  label: string;
  /**
   * Whether user can interact with the menu.
   */
  isDisabled?: boolean;
};

/**
 * TODO
 *
 * <MenuExample />
 */
export function MenuButton(props: Props): ReactElement {
  // Create state based on the incoming props
  const state = useMenuTriggerState(props as MenuTriggerProps);

  // Get props for the menu trigger and menu elements
  const ref = useRef<HTMLButtonElement>(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, ref);

  // Get props for the button based on the trigger props from useMenuTrigger
  const { buttonProps } = useButton(
    { ...menuTriggerProps, isDisabled: props.isDisabled },
    ref
  );

  const theme = useTheme();
  const { radii, sizes, fonts, fontSizes, fontWeights, space } = theme;

  return (
    <div css={{ position: "relative", display: "inline-block" }}>
      <button
        {...buttonProps}
        ref={ref}
        css={{
          background: "var(--background)",
          borderRadius: radii[4],
          border: "1px solid var(--border)",
          outline: "none",
          height: sizes[4],
          cursor: props.isDisabled ? "default" : "pointer",
          fontFamily: fonts.body,
          fontSize: fontSizes[1],
          fontWeight: fontWeights.bold,
          paddingLeft: space[3],
          paddingRight: space[3],
          lineHeight: 1,
          color: "var(--primary-text)",
          opacity: props.isDisabled ? 0.5 : 1,
        }}
      >
        {props.label}
        <span aria-hidden="true" css={{ paddingLeft: 5 }}>
          <Chevron />
        </span>
      </button>
      {state.isOpen && (
        <MenuPopup
          {...props}
          domProps={menuProps}
          autoFocus={state.focusStrategy}
          onClose={() => state.close()}
        />
      )}
    </div>
  );
}
