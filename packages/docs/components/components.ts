// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope

import {
  Button,
  Checkbox,
  Grid,
  Input,
  Item,
  Provider,
  Select,
  Switch,
} from "ds";
import Link from "next/link";

export const components = {
  a: Link,
  Button,
  Grid,
  Select,
  Item,
  Input,
  Switch,
  Checkbox,
  Provider,
};
