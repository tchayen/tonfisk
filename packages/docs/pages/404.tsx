import { atoms } from "ds";
import { ReactElement } from "react";

import { Layout } from "../components/Layout";
import { getNavigation } from "../utils/mdx";

export default function Missing({ navigation }): ReactElement {
  return (
    <Layout navigation={navigation}>
      <h1
        className={atoms({
          color: {
            lightMode: "black",
            darkMode: "gray-200",
          },
        })}
      >
        404
      </h1>
      <p
        className={atoms({
          color: {
            lightMode: "gray-600",
            darkMode: "gray-400",
          },
        })}
      >
        This page does not exist.
      </p>
    </Layout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      navigation: getNavigation(),
    },
  };
};
