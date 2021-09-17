import "./theme.css";

import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import * as ds from "ds";
import {
  atoms,
  Button,
  Cell,
  Checkbox,
  Column,
  Item,
  MenuButton,
  Row,
  Select,
  Selection,
  Table,
  TableBody,
  TableHeader,
  TextInput,
} from "ds";
import { Form, Formik, useField } from "formik";
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";

import { Header1, Header2, Header3, Header4 } from "../components/Header";
import {
  MdxTable,
  MdxTableCell,
  MdxTableHeaderCell,
  MdxTableHeaderRow,
  MdxTableRow,
} from "./MdxTable";
import { header } from "./theme.css";

const SelectExample = (): JSX.Element => {
  const items = [
    { key: 1, label: "One" },
    { key: 2, label: "Two" },
    { key: 3, label: "Three" },
  ];

  const [selected, setSelected] = useState<number | null>(null);

  console.log(
    selected,
    items.find((item) => {
      console.log(item.key, selected);
      return item.key === selected;
    })
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className={atoms({
          color: {
            lightMode: "gray-600",
            darkMode: "gray-400",
          },
          marginBottom: "m",
        })}
      >
        Selected:{" "}
        <code>
          {selected === null
            ? "None"
            : JSON.stringify(
                items.find((item) => item.key === selected),
                null,
                2
              )}
        </code>
      </div>
      <Select
        label="Select"
        name="numbers"
        onSelectionChange={(key) => setSelected(Number(key))}
      >
        {items.map((item) => (
          <Item key={item.key}>{item.label}</Item>
        ))}
      </Select>
    </div>
  );
};

const TableExample = (): JSX.Element => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  const columns = [
    { name: "Name", key: "name" },
    { name: "Type", key: "type" },
    { name: "Date Modified", key: "date" },
  ];

  const rows = [
    { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
    { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
    { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
    { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
  ];

  return (
    <div>
      <div
        className={atoms({
          color: {
            lightMode: "gray-600",
            darkMode: "gray-400",
          },
          marginBottom: "m",
        })}
      >
        Selected:{" "}
        <code>
          {JSON.stringify(
            // TODO: TS
            typeof selectedKeys === "string" ? selectedKeys : [...selectedKeys],
            null,
            2
          )}
        </code>
      </div>
      <Table
        aria-label="Example static collection table"
        selectionMode="multiple"
        onSelectionChange={(keys) => {
          console.log(keys);
          setSelectedKeys(keys);
        }}
      >
        <TableHeader columns={columns}>
          {(column) => <Column>{column.name}</Column>}
        </TableHeader>
        <TableBody items={rows}>
          {/* TODO: TS */}
          {(item) => <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>}
        </TableBody>
      </Table>
    </div>
  );
};

const MenuExample = (): JSX.Element => {
  return (
    <MenuButton
      label="Actions"
      onAction={() => {
        console.log("Hej!");
      }}
    >
      <Item key="copy">Copy</Item>
      <Item key="cut">Cut</Item>
      <Item key="paste">Paste</Item>
    </MenuButton>
  );
};

const CheckboxExample = (): JSX.Element => {
  const [value, setValue] = useState(false);
  return (
    <div>
      <div
        className={atoms({
          color: {
            lightMode: "black",
            darkMode: "gray-200",
          },
          marginBottom: "m",
        })}
      >
        Value:{" "}
        <code
          className={atoms({
            background: {
              lightMode: "gray-100",
              darkMode: "gray-700",
            },
            padding: "s",
            borderRadius: "4px",
          })}
        >
          {JSON.stringify(value)}
        </code>
      </div>
      <Checkbox
        onChange={(next) => {
          setValue(next);
        }}
      >
        Label
      </Checkbox>
    </div>
  );
};

function FormTextInput(props: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  const [field, meta, { setValue }] = useField(props);

  return (
    <>
      <TextInput {...field} onChange={(value) => setValue(value)} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
}

function FormikExample(): JSX.Element {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
      }}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form
        className={atoms({
          display: "grid",
          gap: "l",
          width: "24ch",
        })}
      >
        <FormTextInput name="name" label="Name" placeholder="Jane Doe" />
        <FormTextInput name="email" label="Email" placeholder="jane@acme.com" />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
}

function MdxLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <Link href={href}>
      <a
        href={href}
        className={`${atoms({
          color: "blue-500",
        })} ${header}`}
      >
        {children}
      </a>
    </Link>
  );
}

function MdxStrong({ children }: { children: ReactNode }): JSX.Element {
  return (
    <strong
      className={atoms({
        fontWeight: "bold",
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      })}
    >
      {children}
    </strong>
  );
}

function MdxParagraph({ children }: { children: ReactNode }): JSX.Element {
  return (
    <p
      className={atoms({
        color: {
          lightMode: "gray-600",
          darkMode: "gray-400",
        },
        lineHeight: 1.5,
        marginTop: "l",
        marginBottom: "l",
      })}
    >
      {children}
    </p>
  );
}

function MdxLi({ children }: { children: ReactNode }): JSX.Element {
  return (
    <li
      className={atoms({
        marginBottom: "l",
        marginTop: "l",
      })}
    >
      {children}
    </li>
  );
}

function MdxPre({ children }: { children: ReactNode }): JSX.Element {
  const ref = useRef<HTMLPreElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  const { focusProps, isFocusVisible } = useFocusRing();
  const { buttonProps, isPressed } = useButton(
    {
      onPress: () => {
        const content = ref.current!.textContent || "";
        navigator.clipboard.writeText(content.substring(0, content.length - 4));
      },
    },
    buttonRef
  );

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const preClassName = atoms({
    padding: "xl",
    borderRadius: "8px",
    background: "gray-800",
    color: "gray-200",
    position: "relative",
  });

  const buttonClassName = atoms({
    fontFamily: "body",
    color: isPressed ? "gray-200" : isHovered ? "gray-300" : "gray-400",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    position: "absolute",
    background: isPressed ? "gray-500" : isHovered ? "gray-600" : "gray-700",
    padding: "s",
    paddingLeft: "m",
    paddingRight: "m",
    border: "none",
    bottom: "m",
    right: "m",
    outline: "none",
    borderRadius: "4px",
    boxShadow: isFocusVisible ? "outline" : "none",
  });

  return (
    <pre ref={ref} className={preClassName}>
      {children}
      <button
        {...mergeProps(focusProps, buttonProps)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={buttonRef}
        className={buttonClassName}
      >
        Copy
      </button>
    </pre>
  );
}

export const components = {
  a: MdxLink,
  strong: MdxStrong,
  h1: Header1,
  h2: Header2,
  h3: Header3,
  h4: Header4,
  p: MdxParagraph,
  li: MdxLi,
  pre: MdxPre,
  table: MdxTable,
  thead: MdxTableHeaderRow,
  tr: MdxTableRow,
  td: MdxTableCell,
  th: MdxTableHeaderCell,
  TableExample,
  SelectExample,
  MenuExample,
  CheckboxExample,
  FormikExample,
  ...ds,
};
