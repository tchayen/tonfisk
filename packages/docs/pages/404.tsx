import { commonStyles } from "ds";

import { Layout } from "../components/Layout";
import { getNavigation } from "../utils/mdx";

// TODO: TS
export default function Missing({ navigation }): JSX.Element {
  return (
    <Layout navigation={navigation}>
      <h1 className={commonStyles.primaryTextColor}>404</h1>
      <p className={commonStyles.secondaryTextColor}>
        This page does not exist.
      </p>
    </Layout>
  );
}

// TODO: TS
export const getStaticProps = async () => {
  return {
    props: {
      navigation: getNavigation(),
    },
  };
};
