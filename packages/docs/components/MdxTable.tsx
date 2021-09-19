import { atoms } from "ds";
import { ReactNode } from "react";

export function MdxTable({ children }: { children?: ReactNode }): JSX.Element {
  return (
    <table
      className={atoms({
        borderCollapse: "collapse",
      })}
    >
      {children}
    </table>
  );
}

export function MdxTableHeaderCell({
  children,
}: {
  children?: ReactNode;
}): JSX.Element {
  return (
    <th
      className={atoms({
        textAlign: "left",
        fontFamily: "body",
        fontSize: "16px",
        height: "40px",
        paddingLeft: "l",
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      })}
    >
      {children}
    </th>
  );
}

export function MdxTableHeaderRow({
  children,
}: {
  children?: ReactNode;
}): JSX.Element {
  return (
    <thead
      className={atoms({
        borderBottom: {
          lightMode: "regular",
          darkMode: "regularDark",
        },
      })}
    >
      {children}
    </thead>
  );
}

export function MdxTableRow({
  children,
}: {
  children?: ReactNode;
}): JSX.Element {
  return (
    <tr
      className={atoms({
        borderBottom: {
          lightMode: "regular",
          darkMode: "regularDark",
        },
      })}
    >
      {children}
    </tr>
  );
}

export function MdxTableCell({
  children,
}: {
  children?: ReactNode;
}): JSX.Element {
  return (
    <td
      className={atoms({
        padding: "l",
      })}
    >
      {children}
    </td>
  );
}
