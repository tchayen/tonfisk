// Type conforming general unified ecosystem plugin type.
declare module "@mapbox/rehype-prism" {
  import { Plugin } from "unified";

  const rehypePrism: Plugin;

  export default rehypePrism;
}

// Simple types based on README: https://github.com/reactjs/react-docgen.
type ASTNode = any;
type NodePath = any;
type Documentation = any;

type Resolver = (
  ast: ASTNode,
  parser: {
    parse: (string: string) => ASTNode;
  }
) => NodePath | Array<NodePath>;

declare module "react-docgen" {
  const parse: (
    source: string | Buffer,
    resolver: Resolver,
    handlers: Array<
      (
        documentation: Documentation,
        definition: NodePath,
        parser: { parse: (string: string) => ASTNode }
      ) => void
    > | null,
    options: {
      filename: string;
    }
  ) => Array<{
    description: string;
    displayName: string;
    props: {
      [key: string]: {
        description: string;
        required: boolean;
        tsType: {
          raw: string;
          name: string;
        };
      };
    };
  }>;

  const findAllComponentDefinitions: Resolver;
  const findExportedComponentDefinition: Resolver;
  const resolver = {
    findAllComponentDefinitions,
    findExportedComponentDefinition,
  };

  export { parse, resolver };
}
