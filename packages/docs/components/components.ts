// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope

import Link from "next/link";
import { Themed } from "theme-ui";

// here.
export const components = {
  a: Link,
  h2: Themed.h2,
  code: Themed.code,
};
