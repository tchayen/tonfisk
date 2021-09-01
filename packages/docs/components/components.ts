// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope

import {
  Button,
  Checkbox,
  Grid,
  Item,
  Provider,
  Select,
  Switch,
  TextInput,
} from "ds";
import Link from "next/link";

export const components = {
  a: Link,
  Button,
  Grid,
  Select,
  Item,
  TextInput,
  Switch,
  Checkbox,
  Provider,
};
