import { atoms, commonStyles } from "ds";
import Link from "next/link";

import { Layout } from "../components/Layout";
import { getNavigation } from "../utils/mdx";

export default function Home({
  navigation,
}: {
  navigation: ReturnType<typeof getNavigation>;
}): JSX.Element {
  const p = atoms({
    color: {
      lightMode: "gray-600",
      darkMode: "gray-400",
    },
  });

  const paragraph = atoms({
    color: {
      lightMode: "gray-600",
      darkMode: "gray-400",
    },
    lineHeight: 1.5,
    margin: "none",
  });

  return (
    <Layout navigation={navigation}>
      <div
        className={atoms({
          display: "flex",
          flexDirection: "column",
          gap: "l",
        })}
      >
        <h1 className={commonStyles.primaryTextColor}>TODO_LIB_NAME</h1>
        <h2 className={commonStyles.primaryTextColor}>What is this?</h2>
        {/* https://github.com/seek-oss/vanilla-extract
        https://react-spectrum.adobe.com/react-aria */}
        <p className={paragraph}>
          A React design system with a component library built on top of{" "}
          <code>react-aria</code>, a wonderful accessibility library, and{" "}
          <code>vanilla-extract</code>, lightweight and powerful styling
          solution.
        </p>
        <p className={paragraph}>
          Check out{" "}
          <Link href="http://localhost:3000/docs/1-getting-started">
            <a
              href="http://localhost:3000/docs/1-getting-started"
              className={atoms({
                color: "pink-500",
              })}
            >
              Getting started
            </a>
          </Link>
          .
        </p>
      </div>
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
