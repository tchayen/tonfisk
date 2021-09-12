import { atoms } from "ds";
import Link from "next/link";
import { ReactElement } from "react";

export default function Home(): ReactElement {
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
        <h1
          className={atoms({
            color: {
              lightMode: "black",
              darkMode: "gray-200",
            },
          })}
        >
          @tchayen/design-system
        </h1>
        <p
          className={atoms({
            color: {
              lightMode: "gray-600",
              darkMode: "gray-400",
            },
          })}
        >
          Check out{" "}
          <Link href="http://localhost:3000/docs/getting-started">
            <a
              href="http://localhost:3000/docs/getting-started"
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
