import rehypePrism from "@mapbox/rehype-prism";
import { atoms, commonStyles } from "ds";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React, { Fragment } from "react";

import { components } from "../../../components/components";
import { Layout } from "../../../components/Layout";
import {
  componentsFilePaths,
  getNavigation,
  getSourceMetadata,
} from "../../../utils/mdx";
import { toKebabCase } from "../../../utils/string";

type Metadata = {
  displayName: string;
  props: {
    name: string;
    type: string;
    description: string;
  }[];
};

function Prop({
  name,
  type,
  description,
}: {
  name: string;
  type: string;
  description: string;
}) {
  let i = 0;
  const escapedDescription = description
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
    .replaceAll("`", () => {
      i += 1;
      if (i % 2 === 1) {
        return "<code>";
      } else {
        return "</code>";
      }
    });

  // description.replace(/`(.*?)`/g, (match) => {
  //   const result = match.replaceAll("`", `<${i % 2 === 1 ? "/" : ""}code>`);
  //   i += 1;
  //   return result;
  // });
  console.log(escapedDescription);
  return (
    <div
      className={atoms({
        display: "flex",
        marginBottom: "m",
      })}
    >
      <div
        className={atoms({
          display: "flex",
          flexDirection: "column",
          padding: "m",
          borderRadius: "8px",
          background: {
            lightMode: "gray-100",
            darkMode: "gray-800",
          },
          maxWidth: "64ch",
        })}
      >
        <code
          className={atoms({
            color: {
              lightMode: "black",
              darkMode: "gray-200",
            },
            marginBottom: "s",
            padding: "none",
          })}
        >
          {name}: {type}
        </code>
        <span
          className={atoms({
            color: {
              lightMode: "gray-600",
              darkMode: "gray-400",
            },
            fontSize: "14px",
          })}
          dangerouslySetInnerHTML={{ __html: escapedDescription }}
        ></span>
      </div>
    </div>
  );
}

type Props = {
  navigation: ReturnType<typeof getNavigation>;
  source: MDXRemoteSerializeResult;
  metadata: Metadata;
};

export default function Doc({
  navigation,
  source,
  metadata,
}: Props): JSX.Element {
  return (
    <Layout navigation={navigation}>
      <h1 className={commonStyles.primaryTextColor}>{metadata.displayName}</h1>
      {metadata.props.length > 0 && (
        <Fragment>
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
            Props
          </h2>
          <div>
            {metadata.props.map((prop) => (
              <Prop key={prop.name} {...prop} />
            ))}
          </div>
        </Fragment>
      )}
      <MDXRemote {...source} components={components} />
    </Layout>
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}): Promise<{ props: Props }> => {
  const metadata = getSourceMetadata(params.slug);

  const content = `\n${metadata.description}`;

  const source = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypePrism],
    },
  });

  return {
    props: {
      source,
      metadata,
      navigation: getNavigation(),
    },
  };
};

export const getStaticPaths = async (): Promise<{
  paths: {
    params: {
      slug: string;
    };
  }[];
  fallback: false;
}> => {
  const paths = componentsFilePaths
    .map((path) => toKebabCase(path.replace(/\.tsx?$/, "")))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
