// The following two imports must be kept in this order:
import Prism from "prismjs";
import "prismjs/components/prism-jsx";

import { atoms, Button } from "ds";
import { useRouter } from "next/dist/client/router";
import React, { ReactNode, useEffect } from "react";

import { MdxPre } from "../components/components";
import * as styles from "../styles/index.css";

function Subheader({ children }: { children: ReactNode }): JSX.Element {
  return (
    <h3
      className={atoms({
        fontSize: "20px",
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      })}
    >
      {children}
    </h3>
  );
}

function Paragraph({ children }: { children: ReactNode }): JSX.Element {
  return (
    <p
      className={atoms({
        fontSize: "16px",
        lineHeight: 1.75,
      })}
    >
      {children}
    </p>
  );
}

export default function Home(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div
      className={atoms({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <div>
        <h1
          className={atoms({
            fontSize: "64px",
            marginTop: "2xl",
          })}
          style={{
            background: "-webkit-linear-gradient(180deg, #3b82f6, #1e3a8a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          TODO_LIB_NAME
        </h1>
      </div>
      <div
        className={atoms({
          width: "96ch",
          marginBottom: "2xl",
          marginTop: "2xl",
          display: "flex",
        })}
      >
        <div className={atoms({ marginRight: "xl", paddingTop: "xl" })}>
          <p
            className={atoms({
              fontSize: "18px",
              lineHeight: 2,
            })}
          >
            A React{" "}
            <strong
              className={atoms({
                color: {
                  lightMode: "black",
                  darkMode: "gray-200",
                },
              })}
            >
              design system
            </strong>{" "}
            with a component library built on top of{" "}
            <code className={atoms({ fontSize: "16px" })}>react-aria</code>, a
            wonderful accessibility library, and{" "}
            <code className={atoms({ fontSize: "16px" })}>vanilla-extract</code>
            , lightweight and powerful styling solution. sidebar.
          </p>
          <pre
            className={atoms({
              fontFamily: "monospace",
              background: "gray-800",
              borderRadius: "8px",
              color: "gray-400",
              padding: "l",
              display: "inline-flex",
            })}
          >
            <span className={atoms({ color: "gray-600", marginRight: "m" })}>
              $
            </span>{" "}
            <div>yarn add TODO_LIB_NAME</div>
          </pre>
          <div
            className={atoms({
              marginTop: "l",
              display: "flex",
              gap: "l",
              alignItems: "center",
            })}
          >
            <Button
              onPress={() => {
                router.push("/docs/getting-started");
              }}
              size="large"
            >
              Get started →
            </Button>
            <div>GitHub ↗</div>
          </div>
        </div>
        <div>
          <MdxPre>
            <pre className={atoms({ margin: "none", outline: "none" })}>
              <code className="language-jsx">
                {`import { Button } from "TODO_LIB_NAME";

function Homepage() {
  const onPress = () => console.log("I got pressed!")
  return (
    <div className={atoms({ display: "flex" })}>
      <Button onPress={onPress}>
        Get started
      </Button>
      <Button onPress={onPress}>
        GitHub
      </Button>
    </div>
  );
}`}
              </code>
            </pre>
          </MdxPre>
        </div>
      </div>
      <div className={styles.features}>
        <div className={atoms({ flex: 1 })}>
          <Subheader>Full TypeScript support</Subheader>
          <Paragraph>
            Every file is error-free TypeScript code.{" "}
            <code>vanilla-extract</code> is used to provide fully type safe
            styling system. No dead CSS, no escaping the design system's
            principles.
          </Paragraph>
        </div>
        <div className={atoms({ flex: 1 })}>
          <Subheader>Always accessible</Subheader>
          <Paragraph>
            Accessibility is first class requirement and no component is
            finished until it is friendly for keyboard and screen reader users.
          </Paragraph>
        </div>
        {/* <div
          className={atoms({ flex: 1 })}
        >
          <Subheader>Type safe styling</Subheader>
          <Paragraph>
            <code>vanilla-extract</code> is used to provide fully type safe
            styling system. No dead CSS, no escaping the design system's
            principles.
          </Paragraph>
        </div> */}
        <div className={atoms({ flex: 1 })}>
          <Subheader>Light and dark</Subheader>
          <Paragraph>
            Each component is designed with both light and dark modes in mind.
            User should never have to worry about unexpected unreadable text.
          </Paragraph>
        </div>
      </div>
      <div
        className={atoms({
          marginBottom: "2xl",
          marginTop: "2xl",
          fontSize: "16px",
        })}
      >
        Created by{" "}
        <a
          href="https:/twitter.com/tchayen"
          className={atoms({
            fontWeight: "bold",
            color: {
              lightMode: "black",
              darkMode: "gray-200",
            },
          })}
        >
          @tchayen
        </a>{" "}
        in Stockholm.
      </div>
    </div>
  );
}
