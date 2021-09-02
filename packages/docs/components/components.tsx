// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope

import {
  Breadcrumbs,
  Button,
  Cell,
  Checkbox,
  ColorModeSwitch,
  Column,
  Item,
  Menu,
  Pagination,
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
import Link from "next/link";
import { ReactElement } from "react";

const SelectExample = (): ReactElement => {
  return (
    <Select label="Select" onSelectionChange={(key) => console.log(key)}>
      <Item key={1}>Item 1</Item>
      <Item key={2}>Item 2</Item>
      <Item key={3}>Item 3</Item>
    </Select>
  );
};

const TableExample = (): ReactElement => {
  return (
    <Table
      aria-label="Example static collection table"
      selectionMode="multiple"
    >
      <TableHeader>
        <Column>Name</Column>
        <Column>Type</Column>
        <Column>Date Modified</Column>
      </TableHeader>
      <TableBody>
        <Row>
          <Cell>Games</Cell>
          <Cell>File folder</Cell>
          <Cell>6/7/2020</Cell>
        </Row>
        <Row>
          <Cell>Program Files</Cell>
          <Cell>File folder</Cell>
          <Cell>4/7/2021</Cell>
        </Row>
        <Row>
          <Cell>bootmgr</Cell>
          <Cell>System file</Cell>
          <Cell>11/20/2010</Cell>
        </Row>
        <Row>
          <Cell>log.txt</Cell>
          <Cell>Text Document</Cell>
          <Cell>1/18/2016</Cell>
        </Row>
      </TableBody>
    </Table>
  );
};

export const components = {
  a: Link,
  Breadcrumbs,
  Button,
  Checkbox,
  ColorModeSwitch,
  Item,
  Menu,
  Pagination,
  Provider,
  Select,
  Spinner,
  Switch,
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
  Row,
  TableBody,
  TableHeader,
  TableExample,
  SelectExample,
  TableSelectAllCell,
  TableCheckboxCell,
};
