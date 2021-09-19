import { getMDXComponent } from "mdx-bundler/client";
import { ComponentMap } from "mdx-bundler/dist/client.d";
import { useMemo } from "react";

import { components } from "./mdxComponents";

export function Mdx({ source }: { source: string }): JSX.Element {
  const Component = useMemo(() => getMDXComponent(source), [source]);
  // NOTE: cheated here with TS type but it's hard to satisfy otherwise as it
  // requires all props to be optional which gives up on any type safety.
  return <Component components={components as unknown as ComponentMap} />;
}
