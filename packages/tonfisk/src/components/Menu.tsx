/* eslint-disable @typescript-eslint/ban-types */
import { useButton } from "@react-aria/button";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useFocus } from "@react-aria/interactions";
import { useLabel } from "@react-aria/label";
import { useMenu, useMenuItem, useMenuTrigger } from "@react-aria/menu";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useMenuTriggerState } from "@react-stately/menu";
import { useTreeState } from "@react-stately/tree";
import { TreeState } from "@react-stately/tree";
import { AriaButtonProps } from "@react-types/button/src/index.d";
import { MenuTriggerProps } from "@react-types/menu";
import { FocusStrategy } from "@react-types/shared";
import { CollectionChildren } from "@react-types/shared/src/collections";
import { AnimatePresence, motion } from "framer-motion";
import { ForwardedRef, forwardRef, Key, ReactNode, RefObject } from "react";
import React, { useRef, useState } from "react";

import { Chevron } from "../icons/Chevron";
import { Label } from "./Label";
import {
  chevronPadding,
  div,
  menuButton,
  menuItem,
  menuPopup,
} from "./Menu.css";

function MenuPopup(
  props: {
    onClose: () => void;
    domProps: React.HTMLAttributes<HTMLElement>;
    onAction: (action: Key) => void;
    autoFocus?: FocusStrategy;
    children: CollectionChildren<object>;
  } & React.HTMLAttributes<HTMLElement>
): JSX.Element {
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
          {Array.from(state.collection).map((item) => (
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
    key: Key;
    rendered: ReactNode;
    isDisabled?: boolean;
  };
  state: TreeState<object>;
  onAction: (action: Key) => void;
  onClose: () => void;
}): JSX.Element {
  // Get props for the menu item element.
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

  // Handle focus events so we can apply highlighted  style to the focused menu
  // item.
  const [isFocused, setFocused] = useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      className={menuItem({
        background: isFocused ? "focused" : "default",
        color: isFocused ? "focused" : "default",
      })}
    >
      {item.rendered}
    </li>
  );
}

type Props = {
  /**
   * Label of the button (over the trigger).
   */
  label?: string;
  /**
   * Title of the component (inside the trigger button).
   */
  title: string;
  /**
   * Whether user can interact with the menu.
   */
  isDisabled?: boolean;
  /**
   * Callback called when user chooses one of the options. `Key` is `number | string`.
   */
  onAction: (action: Key) => void;
  /**
   * Array of `<Item />` elements.
   */
  children: CollectionChildren<object>;
  /**
   * Value used to describe the table to screen readers. Required if `label` is missing.
   */
  "aria-label"?: string;
};

type MenuButton_Props = {
  isDisabled?: boolean;
  menuTriggerProps?: AriaButtonProps<"button">;
  children?: ReactNode;
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
    ref as RefObject<HTMLButtonElement>
  );

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={menuButton({
        boxShadow: isFocusVisible ? "focusVisible" : "default",
        cursor: props.isDisabled ? "disabled" : "default",
        opacity: props.isDisabled ? "disabled" : "default",
      })}
    >
      {props.children}
      <span aria-hidden="true" className={chevronPadding}>
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
 * import { MenuButton, Item } from "tonfisk";
 *
 * function MenuExample() {
 *   return ()
 *     <MenuButton
 *       label="Actions"
 *       onAction={() => {
 *         console.log("Hej!");
 *       }}
 *     >
 *       <Item key="copy">Copy</Item>
 *       <Item key="cut">Cut</Item>
 *       <Item key="paste">Paste</Item>
 *     </MenuButton>
 *   );
 * }
 * ```
 *
 * ## Example
 *
 * <MenuExample />
 */
export function MenuButton(props: Props): JSX.Element {
  const state = useMenuTriggerState(props as MenuTriggerProps);
  const ref = useRef<HTMLButtonElement>(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger(props, state, ref);
  const { labelProps, fieldProps } = useLabel(props);

  return (
    <div className={div}>
      {props.label && <Label {...labelProps}>{props.label}</Label>}
      <MenuButtonComponent
        ref={ref}
        menuTriggerProps={menuTriggerProps}
        isDisabled={props.isDisabled}
      >
        {props.title}
      </MenuButtonComponent>
      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            key="popover"
            initial={{ opacity: 0, x: 0, y: -16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 0, y: -16 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            style={{ position: "relative" }}
          >
            <MenuPopup
              domProps={menuProps}
              autoFocus={state.focusStrategy}
              onClose={() => state.close()}
              {...fieldProps}
              {...props}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
