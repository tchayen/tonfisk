import { atoms, commonStyles } from "ds";
import Link from "next/link";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  const p = atoms({
    color: {
      lightMode: "gray-600",
      darkMode: "gray-400",
    },
  });

  return (
    <div
      className={atoms({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <div
        className={atoms({
          width: "48ch",
          marginTop: "2xl",
        })}
      >
        <h1 className={commonStyles.primaryTextColor}>TODO_LIB_NAME</h1>
        <h2>What is this?</h2>
        <p className={p}>
          A design system with a component library built on top of{" "}
          <code>react-aria</code>, a wonderful accessibility library, and{" "}
          <code>vanilla-extract</code>, lightweight and powerful styling
          solution.
        </p>
        <p className={p}>
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
    </div>
  );
}
