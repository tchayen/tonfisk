import "../styles/theme.css";

import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import {
  OverlayContainer,
  useOverlayPosition,
  useOverlayTrigger,
} from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { Form, Formik, useField } from "formik";
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";
import * as tonfisk from "tonfisk";
import {
  atoms,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Cell,
  Checkbox,
  Column,
  HorizontalLine,
  Item,
  MenuButton,
  ModalDialog,
  Popover,
  Row,
  Select,
  Selection,
  Table,
  TableBody,
  TableHeader,
  TextInput,
} from "tonfisk";

import { hoverUnderline } from "../styles/theme.css";
import { Header1, Header2, Header3, Header4 } from "./Header";
import { MdxPre } from "./MdxPre";
import {
  MdxTable,
  MdxTableCell,
  MdxTableHeaderCell,
  MdxTableHeaderRow,
  MdxTableRow,
} from "./MdxTable";

function SelectExample(): JSX.Element {
  const items = [
    { key: 1, label: "One" },
    { key: 2, label: "Two" },
    { key: 3, label: "Three" },
  ];

  const [selected, setSelected] = useState<number | null>(null);

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
}

function BreadcrumbsExample(): JSX.Element {
  return (
    <Breadcrumbs>
      <BreadcrumbItem onPress={() => alert("Pressed Folder 1")}>
        Folder 1
      </BreadcrumbItem>
      <BreadcrumbItem onPress={() => alert("Pressed Folder 2")}>
        Folder 2
      </BreadcrumbItem>
      <BreadcrumbItem>Folder 3</BreadcrumbItem>
    </Breadcrumbs>
  );
}

function PopoverExample(): JSX.Element {
  const state = useOverlayTriggerState({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef(null);

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the popover positioning).
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  // Get popover positioning props relative to the trigger
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: "bottom",
    offset: 8,
    isOpen: state.isOpen,
  });

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // popover closes.
  const { buttonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    triggerRef
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  const className = atoms({
    fontFamily: "body",
    fontSize: "14px",
    fontWeight: "bold",
    border: "none",
    background: "transparent",
    margin: "none",
    display: "inline-block",
    cursor: "pointer",
    outline: "none",
    borderRadius: "8px",
    padding: "s",
    color: {
      lightMode: "black",
      darkMode: "gray-200",
    },
    boxShadow: isFocusVisible ? "outline" : "none",
  });

  return (
    <>
      <button
        {...mergeProps(buttonProps, triggerProps, focusProps)}
        ref={triggerRef}
        className={className}
      >
        Open
      </button>
      {state.isOpen && (
        <OverlayContainer>
          <Popover
            {...mergeProps(overlayProps, positionProps)}
            ref={overlayRef}
            isOpen={state.isOpen}
            onClose={state.close}
          >
            <div
              className={atoms({
                padding: "l",
              })}
            >
              123
            </div>
          </Popover>
        </OverlayContainer>
      )}
    </>
  );
}

function TableExample(): JSX.Element {
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
    <>
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
            typeof selectedKeys === "string"
              ? selectedKeys
              : Array.from(selectedKeys.values()),
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
          {(item) => (
            <Row>
              {(columnKey) => (
                <Cell>{item[columnKey as keyof typeof rows[number]]}</Cell>
              )}
            </Row>
          )}
        </TableBody>
      </Table>
    </>
  );
}

function MenuExample(): JSX.Element {
  return (
    <MenuButton
      aria-label="Actions"
      title="Pick action"
      onAction={() => {
        console.log("Hej!");
      }}
    >
      <Item key="copy">Copy</Item>
      <Item key="cut">Cut</Item>
      <Item key="paste">Paste</Item>
    </MenuButton>
  );
}

function ModalDialogExample(): JSX.Element {
  const state = useOverlayTriggerState({});

  return (
    <>
      <Button onPress={() => state.open()}>Open</Button>
      {state.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="A modal example"
            onClose={state.close}
            isDismissable
            isOpen
          >
            <HorizontalLine />
            <p
              className={atoms({
                padding: "l",
                margin: "none",
                color: {
                  lightMode: "gray-600",
                  darkMode: "gray-400",
                },
              })}
            >
              You can close this modal by clicking outside, using escape or
              pressing this custom button below.
            </p>
            {/* <div
              className={atoms({
                display: "flex",
                flexDirection: "column",
                gap: "l",
                padding: "l",
              })}
            >
              <p
                className={atoms({
                  padding: "none",
                  margin: "none",
                  color: {
                    lightMode: "gray-600",
                    darkMode: "gray-400",
                  },
                })}
              >
                You can close this modal by clicking outside, using escape or
                pressing this custom button below.
              </p>
              <Button
                size="large"
                onPress={() => {
                  state.close();
                }}
              >
                Close this modal
              </Button>
            </div> */}
          </ModalDialog>
        </OverlayContainer>
      )}
    </>
  );
}

function CheckboxExample(): JSX.Element {
  const [value, setValue] = useState(false);
  return (
    <>
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
    </>
  );
}

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
  children?: ReactNode;
}): JSX.Element {
  return (
    <Link href={href}>
      <a
        href={href}
        className={`${atoms({
          color: "blue-500",
        })} ${hoverUnderline}`}
      >
        {children}
      </a>
    </Link>
  );
}

function MdxStrong({ children }: { children?: ReactNode }): JSX.Element {
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

function MdxParagraph({ children }: { children?: ReactNode }): JSX.Element {
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

function MdxLi({ children }: { children?: ReactNode }): JSX.Element {
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
  Link,
  TableExample,
  SelectExample,
  MenuExample,
  CheckboxExample,
  FormikExample,
  PopoverExample,
  ModalDialogExample,
  BreadcrumbsExample,
  ...tonfisk,
};
