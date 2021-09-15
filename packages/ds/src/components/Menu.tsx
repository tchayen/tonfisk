import { useButton } from "@react-aria/button";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useFocus } from "@react-aria/interactions";
import { useMenu, useMenuItem, useMenuTrigger } from "@react-aria/menu";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useMenuTriggerState } from "@react-stately/menu";
import { useTreeState } from "@react-stately/tree";
import { TreeState } from "@react-stately/tree";
import { MenuTriggerProps } from "@react-types/menu";
import { FocusStrategy } from "@react-types/shared";
import { ForwardedRef, forwardRef, ReactNode } from "react";
import React, { useRef, useState } from "react";

import { Chevron } from "../icons/Chevron";
import { atoms } from "../theme.css";
import { menuButton, menuItem, menuPopup } from "./Menu.css";

function MenuPopup(props: {
  onClose: () => void;
  domProps: any;
  onAction: (action: string) => void;
  autoFocus?: FocusStrategy;
}): JSX.Element {
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
          className={menuPopup}
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
    isDisabled?: boolean;
  };
  state: TreeState<any>;
  onAction: (item: any) => void;
  onClose: () => void;
}): JSX.Element {
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

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  const [isFocused, setFocused] = useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      className={`${menuItem} ${atoms({
        background: {
          lightMode: isFocused ? "gray-200" : "transparent",
          darkMode: isFocused ? "gray-600" : "transparent",
        },
        color: {
          lightMode: isFocused ? "black" : "gray-600",
          darkMode: isFocused ? "gray-200" : "gray-400",
        },
      })}`}
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
  /**
   * Callback called when user chooses one of the options.
   */
  onAction: (action: string) => void;
};

type MenuButton_Props = {
  isDisabled?: boolean;
  menuTriggerProps?: any;
  children: string;
  onPress?: () => void;
};

const MenuButton_ = (
  props: MenuButton_Props,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const { focusProps, isFocusVisible } = useFocusRing();

  const { buttonProps } = useButton(
    {
      ...(props.menuTriggerProps || {}),
      isDisabled: props.isDisabled,
      onPress: props.onPress,
    },
    ref
  );

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      // TODO: recipe.
      className={`${menuButton} ${atoms({
        opacity: props.isDisabled ? 0.5 : 1,
        cursor: props.isDisabled ? "default" : "pointer",
        border: "none",
        boxShadow: {
          lightMode: isFocusVisible ? "primary" : "regularBorder",
          darkMode: isFocusVisible ? "primary" : "darkBorder",
        },
      })}`}
    >
      {props.children}
      {/* TODO: move to *.css.ts. */}
      <span aria-hidden="true" className={atoms({ paddingLeft: "m" })}>
        <Chevron />
      </span>
    </button>
  );
};

export const MenuButtonComponent = forwardRef(MenuButton_);

/**
 * ## Usage
 *
 * ```jsx
 * import { MenuButton, Item } from "TODO_LIB_NAME";
 * <MenuButton
 *   label="Actions"
 *   onAction={() => {
 *     console.log("Hi!");
 *   }}
 * >
 *   <Item key="copy">Copy</Item>
 *   <Item key="cut">Cut</Item>
 *   <Item key="paste">Paste</Item>
 * </MenuButton>
 * ```
 *
 * ## Example
 *
 * <MenuExample />
 */
export function MenuButton(props: Props): JSX.Element {
  // Create state based on the incoming props
  const state = useMenuTriggerState(props as MenuTriggerProps);

  // Get props for the menu trigger and menu elements
  const ref = useRef<HTMLButtonElement>(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, ref);

  return (
    // TODO: move to *.css.ts.
    <div className={atoms({ position: "relative", display: "inline-block" })}>
      <MenuButtonComponent
        ref={ref}
        menuTriggerProps={menuTriggerProps}
        isDisabled={props.isDisabled}
      >
        {props.label}
      </MenuButtonComponent>
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
