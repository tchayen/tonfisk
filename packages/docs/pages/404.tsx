import { commonStyles } from "ds";

import { Layout } from "../components/Layout";
import { getNavigation } from "../utils/mdx";

type Navigation = ReturnType<typeof getNavigation>;

export default function Missing({
  navigation,
}: {
  navigation: Navigation;
}): JSX.Element {
  return (
    <Layout navigation={navigation}>
      <h1 className={commonStyles.primaryTextColor}>404</h1>
      <p className={commonStyles.secondaryTextColor}>
        This page does not exist.
      </p>
    </Layout>
  );
}

export const getStaticProps = async (): Promise<{
  props: { navigation: Navigation };
}> => {
  return {
    props: {
      navigation: getNavigation(),
    },
  };
};
