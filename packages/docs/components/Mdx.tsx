import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

import { components } from "./components";

export function Mdx({ source }: { source: string }): JSX.Element {
  const Component = useMemo(() => getMDXComponent(source), [source]);
  return <Component components={components} />;
}
