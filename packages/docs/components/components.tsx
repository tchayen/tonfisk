// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
import "./theme.css";

import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import {
  atoms,
  Button,
  Cell,
  Checkbox,
  Column,
  HorizontalLine,
  Item,
  Label,
  MenuButton,
  Pagination,
  Pill,
  Popover,
  Provider,
  Row,
  Select,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableCheckboxCell,
  TableColumnHeader,
  TableHeader,
  TableHeaderRow,
  TableRow,
  TableRowGroup,
  TableSelectAllCell,
  Tag,
  TextInput,
  Tooltip,
} from "ds";
import { Form, Formik, useField } from "formik";
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";

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
  const [selectedKeys, setSelectedKeys] = useState([]);

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

function LinkComponent({
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
        className={atoms({
          color: "blue-500",
        })}
      >
        {children}
      </a>
    </Link>
  );
}

function StrongComponent({ children }: { children: ReactNode }): JSX.Element {
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

function H1Component({
  children,
  ...props
}: {
  children: ReactNode;
  props: any;
}): JSX.Element {
  return (
    <h1
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
        marginTop: "xl",
        marginBottom: "l",
      })}
      {...props}
    >
      {children}
    </h1>
  );
}

function H2Component({
  children,
  ...props
}: {
  children: ReactNode;
  props: any;
}): JSX.Element {
  return (
    <h2
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
        marginTop: "xl",
        marginBottom: "l",
      })}
      {...props}
    >
      {children}
    </h2>
  );
}

function H3Component({
  children,
  ...props
}: {
  children: ReactNode;
  props: any;
}): JSX.Element {
  return (
    <h3
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
        marginTop: "xl",
        marginBottom: "l",
      })}
      {...props}
    >
      {children}
    </h3>
  );
}

function H4Component({
  children,
  ...props
}: {
  children: ReactNode;
  props: any;
}): JSX.Element {
  return (
    <h4
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
        marginTop: "xl",
        marginBottom: "l",
      })}
      {...props}
    >
      {children}
    </h4>
  );
}

function ParagraphComponent({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
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

function LiComponent({ children }: { children: ReactNode }): JSX.Element {
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

function PreComponent({ children }: { children: ReactNode }): JSX.Element {
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

  const className = atoms({
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
    <pre
      ref={ref}
      className={atoms({
        padding: "xl",
        borderRadius: "8px",
        background: "gray-800",
        color: "gray-200",
        position: "relative",
      })}
    >
      {children}
      <button
        {...mergeProps(focusProps, buttonProps)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={buttonRef}
        className={className}
      >
        Copy
      </button>
    </pre>
  );
}

export const components = {
  a: LinkComponent,
  strong: StrongComponent,
  h1: H1Component,
  h2: H2Component,
  h3: H3Component,
  h4: H4Component,
  p: ParagraphComponent,
  li: LiComponent,
  pre: PreComponent,
  Button,
  Checkbox,
  Item,
  Label,
  MenuButton,
  Pagination,
  Provider,
  Select,
  Popover,
  Spinner,
  Switch,
  HorizontalLine,
  Table,
  TableCell,
  TableColumnHeader,
  TableHeaderRow,
  TableRow,
  TableRowGroup,
  Tag,
  TextInput,
  Tooltip,
  Cell,
  Column,
  Pill,
  Row,
  TableBody,
  TableHeader,
  TableSelectAllCell,
  TableCheckboxCell,
  TableExample,
  SelectExample,
  MenuExample,
  CheckboxExample,
  FormikExample,
};
