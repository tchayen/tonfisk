import "../styles/theme.css";

import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useOverlayPosition, useOverlayTrigger } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { Form, Formik, useField } from "formik";
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";
import * as tonfisk from "tonfisk";
import {
  Accordion,
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
  Modal,
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
import * as styles from "./mdxComponents.css";
import { MdxPre } from "./MdxPre";
import {
  MdxTable,
  MdxTableCell,
  MdxTableHeaderCell,
  MdxTableHeaderRow,
  MdxTableRow,
} from "./MdxTable";
import { SwitchColorMode } from "./SwitchColorMode";

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
    offset: -8,
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
        Open popover
      </button>
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
          This is popover.
        </div>
      </Popover>
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

function ModalExample(): JSX.Element {
  const state = useOverlayTriggerState({});

  return (
    <>
      <Button onPress={() => state.open()}>Open modal</Button>
      <Modal
        title="A modal example"
        onClose={state.close}
        isDismissable
        isOpen={state.isOpen}
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
          You can close this modal by clicking outside or using escape.
        </p>
      </Modal>
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

function AccordionExample(): JSX.Element {
  return (
    <>
      <Accordion
        className={atoms({ marginTop: "l" })}
        header={<h2>Header 1</h2>}
      >
        Test
      </Accordion>
      <Accordion
        className={atoms({ marginTop: "l" })}
        header={<h2>Header 2</h2>}
      >
        Other test
      </Accordion>
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
  const { focusProps, isFocusVisible } = useFocusRing();
  const className = `${atoms({
    color: "blue-500",
    outline: "none",
    borderRadius: "4px",
    display: "inline-flex",
    boxShadow: isFocusVisible ? "outline" : "none",
  })} ${hoverUnderline}`;

  if (href.startsWith("https")) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href}>
      <a {...focusProps} href={href} className={className}>
        {children}
      </a>
    </Link>
  );
}

function MdxStrong({ children }: { children?: ReactNode }): JSX.Element {
  return <strong className={styles.strong}>{children}</strong>;
}

function MdxParagraph({ children }: { children?: ReactNode }): JSX.Element {
  return <p className={styles.p}>{children}</p>;
}

function MdxLi({ children }: { children?: ReactNode }): JSX.Element {
  return <li className={styles.li}>{children}</li>;
}

function MdxBlockQuote({ children }: { children?: ReactNode }): JSX.Element {
  return (
    <blockquote className={styles.blockquote}>
      <div className={styles.blockPipe} />
      {children}
    </blockquote>
  );
}

function FlexRow({ children }: { children?: ReactNode }): JSX.Element {
  return <div className={styles.flexRow}>{children}</div>;
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
  blockquote: MdxBlockQuote,
  pre: MdxPre,
  table: MdxTable,
  thead: MdxTableHeaderRow,
  tr: MdxTableRow,
  td: MdxTableCell,
  th: MdxTableHeaderCell,
  SwitchColorMode,
  Link,
  TableExample,
  SelectExample,
  MenuExample,
  CheckboxExample,
  FormikExample,
  PopoverExample,
  ModalExample,
  BreadcrumbsExample,
  AccordionExample,
  FlexRow,
  ...tonfisk,
};
