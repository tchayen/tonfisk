import { ReactElement } from "react";

import { Layout } from "../components/Layout";
import { getNavigation } from "../utils/mdx";

export default function Missing({ navigation }): ReactElement {
  return (
    <Layout navigation={navigation}>
      <h1>404</h1>
      <p>This page does not exist.</p>
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
