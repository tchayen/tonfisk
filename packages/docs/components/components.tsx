// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
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
import { ReactNode, useState } from "react";

const SelectExample = (): JSX.Element => {
  const items = [
    { key: 1, label: "One" },
    { key: 2, label: "Two" },
    { key: 3, label: "Three" },
  ];

  const [selected, setSelected] = useState(null);

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
        {/* TODO:
         * Export components.tsx nodes and use <code> one here.
         */}
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
        {/* TODO:
         * Export components.tsx nodes and use <code> one here.
         */}
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
        console.log("Hej");
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
  const [field, meta] = useField(props);

  return (
    <>
      <TextInput {...field} {...props} />
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
  children: ReactNode;
}): JSX.Element {
  return (
    <Link href={href}>
      <a
        href={href}
        className={atoms({
          color: "pink-500",
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

function H1Component({ children }: { children: ReactNode }): JSX.Element {
  return (
    <h1
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
        marginTop: "l",
        marginBottom: "l",
      })}
    >
      {children}
    </h1>
  );
}

function H2Component({ children }: { children: ReactNode }): JSX.Element {
  return (
    <h2
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
        marginTop: "l",
        marginBottom: "l",
      })}
    >
      {children}
    </h2>
  );
}

function H3Component({ children }: { children: ReactNode }): JSX.Element {
  return (
    <h3
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
        marginTop: "l",
        marginBottom: "l",
      })}
    >
      {children}
    </h3>
  );
}

function H4Component({ children }: { children: ReactNode }): JSX.Element {
  return (
    <h4
      className={atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
        marginTop: "l",
        marginBottom: "l",
      })}
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
        marginTop: "xl",
        marginBottom: "xl",
      })}
    >
      {children}
    </p>
  );
}

function PreComponent({ children }: { children: ReactNode }): JSX.Element {
  return (
    <pre
      className={atoms({
        padding: "xl",
        borderRadius: "8px",
        background: "gray-800",
        color: "gray-200",
      })}
    >
      {children}
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
