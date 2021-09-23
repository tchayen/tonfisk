/* eslint-disable @typescript-eslint/ban-types */
import { useBreadcrumbItem, useBreadcrumbs } from "@react-aria/breadcrumbs";
import { ItemProps } from "@react-types/shared/src/collections.d";
import React, {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useRef,
} from "react";

import * as styles from "./Breadcrumbs.css";

export function BreadcrumbItem(props: {
  onPress?: () => void;
  children: ReactNode;
  isCurrent?: boolean;
}): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const { itemProps } = useBreadcrumbItem(
    { ...props, elementType: "span" },
    ref
  );

  const className = styles.li({
    textDecoration: props.isCurrent ? "current" : "default",
    fontWeight: props.isCurrent ? "current" : "default",
    cursor: props.isCurrent ? "current" : "default",
  });
  return (
    <li>
      <span {...itemProps} ref={ref} className={className}>
        {props.children}
      </span>
      {!props.isCurrent && (
        <span aria-hidden="true" style={{ padding: "0 5px" }}>
          {"›"}
        </span>
      )}
    </li>
  );
}

type Props = {
  /**
   * Items in the breadcrumbs.
   */
  children:
    | ReactElement<ItemProps<object>>
    | Array<ReactElement<ItemProps<object>>>;
};

/**
 * Breadrcumbs component.
 *
 * ## Usage
 *
 * ```jsx
 * import { Breadcrumbs, BreadcrumbItem } from "tonfisk";
 *
 * function BreadcrumbsExample() {
 *   return (
 *     <Breadcrumbs>
 *       <BreadcrumbItem onPress={() => alert("Pressed Folder 1")}>
 *         Folder 1
 *       </BreadcrumbItem>
 *       <BreadcrumbItem onPress={() => alert("Pressed Folder 2")}>
 *         Folder 2
 *       </BreadcrumbItem>
 *       <BreadcrumbItem>Folder 3</BreadcrumbItem>
 *     </Breadcrumbs>
 *   );
 * }
 * ```
 *
 * ## Example
 *
 * <BreadcrumbsExample />
 */
export function Breadcrumbs(props: Props): JSX.Element {
  const { navProps } = useBreadcrumbs(props);
  const children = Children.toArray(props.children);

  return (
    <nav {...navProps}>
      <ol className={styles.ol}>
        {children.map((child, i) =>
          cloneElement(child as ReactElement<any, string>, {
            isCurrent: i === children.length - 1,
          })
        )}
      </ol>
    </nav>
  );
}
