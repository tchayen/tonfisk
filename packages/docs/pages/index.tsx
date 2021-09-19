// The following two imports must be kept in this order:
import Prism from "prismjs";
import "prismjs/components/prism-jsx";

import { atoms, ButtonLink } from "ds";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";

import { MdxPre } from "../components/mdxComponents";
import { SwitchColorMode } from "../components/SwitchColorMode";
import * as styles from "../styles/index.css";
import { hoverUnderline } from "../styles/theme.css";
import { Logo } from "../components/Logo";

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
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <SwitchColorMode />
      </div>
      <div className={styles.h1}>
        <Logo />
      </div>
      <div className={styles.mainBanner}>
        <div>
          <p className={styles.topParagraphElement}>
            A React <strong className={styles.strong}>design system</strong>{" "}
            with a component library built on top of{" "}
            <code className={styles.code}>react-aria</code>, a wonderful
            accessibility library, and{" "}
            <code className={styles.code}>vanilla-extract</code>, lightweight
            and powerful styling solution. sidebar.
          </p>
          <pre className={styles.pre}>
            <span className={styles.promptChar}>$</span>{" "}
            <div>yarn add TODO_LIB_NAME</div>
          </pre>
          <div className={styles.linkButtons}>
            <Link href="/docs/getting-started">
              <ButtonLink href="/docs/getting-started" size="large">
                Get started →
              </ButtonLink>
            </Link>
            <Link href="#">
              <ButtonLink href="#" size="large" variant="secondary">
                GitHub ↗
              </ButtonLink>
            </Link>
          </div>
        </div>
        <div>
          <MdxPre>
            <pre className={styles.mdxPre}>
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
        <div className={styles.flex1}>
          <Subheader>Full TypeScript support</Subheader>
          <Paragraph>
            Every file is error-free TypeScript code.{" "}
            <code>vanilla-extract</code> is used to provide fully type safe
            styling system. No dead CSS, no escaping the design system&apos;s
            principles.
          </Paragraph>
        </div>
        <div className={styles.flex1}>
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
        <div className={styles.flex1}>
          <Subheader>Light and dark</Subheader>
          <Paragraph>
            Each component is designed with both light and dark modes in mind.
            User should never have to worry about unexpected unreadable text.
          </Paragraph>
        </div>
      </div>
      <div className={styles.footerText}>
        Created by{" "}
        <a
          href="https:/twitter.com/tchayen"
          className={`${styles.footerLink} ${hoverUnderline}`}
        >
          @tchayen
        </a>{" "}
        in Stockholm.
      </div>
    </div>
  );
}
