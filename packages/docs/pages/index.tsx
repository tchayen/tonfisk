// The following two imports must be kept in this order:
// eslint-disable-next-line
import Prism from "prismjs";
import "prismjs/components/prism-jsx";

import Link from "next/link";
import React, { ReactNode, useEffect } from "react";
import { atoms, ButtonLink } from "tonfisk";

import { Logo } from "../components/Logo";
import { MdxPre } from "../components/MdxPre";
import { SocialCardsHeader } from "../components/SocialCardsHeader";
import { SwitchColorMode } from "../components/SwitchColorMode";
// import { Tweet } from "../components/Tweet";
import * as styles from "../styles/index.css";

function Subheader({ children }: { children: ReactNode }): JSX.Element {
  return <h3 className={styles.subheader}>{children}</h3>;
}

function Paragraph({ children }: { children: ReactNode }): JSX.Element {
  return <p className={styles.paragraph}>{children}</p>;
}

export default function Home(): JSX.Element {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <SocialCardsHeader slug="homepage" />
      <div className={styles.page}>
        <div className={styles.content}>
          <SwitchColorMode />
        </div>
        <div className={styles.h1}>
          <Logo />
        </div>
        <div className={styles.mainBanner}>
          <div className={styles.topParagraphDiv}>
            <p className={styles.topParagraphElement}>
              A React <strong className={styles.strong}>design system</strong>{" "}
              with a component library built on top of{" "}
              <code className={styles.code}>react-aria</code>, a wonderful
              accessibility library, and{" "}
              <code className={styles.code}>vanilla-extract</code>, lightweight
              and powerful styling solution.
            </p>
            <div>
              <pre className={styles.pre}>
                <span className={styles.promptChar}>$</span>{" "}
                <div>yarn add tonfisk</div>
              </pre>
            </div>
            <div className={styles.linkButtons}>
              <Link href="/docs/getting-started">
                <ButtonLink href="/docs/getting-started" size="large">
                  Get started →
                </ButtonLink>
              </Link>
              <Link href="https://github.com/tchayen/tonfisk">
                <ButtonLink
                  href="https://github.com/tchayen/tonfisk"
                  size="large"
                  variant="secondary"
                  newTab
                >
                  GitHub ↗
                </ButtonLink>
              </Link>
            </div>
          </div>
          <div className={styles.preWrapper}>
            <MdxPre>
              <pre className={styles.mdxPre}>
                <code className="language-jsx">
                  {`import { Button } from "tonfisk";

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
          {/* <div className={styles.flex1}>
          <Subheader>Full TypeScript support</Subheader>
          <Paragraph>
            Every file is error-free TypeScript code exporting fully typed React
            components.
          </Paragraph>
        </div> */}
          <div className={styles.flex1}>
            <Subheader>Always accessible</Subheader>
            <Paragraph>
              Accessibility is first class requirement and no component is
              finished until it is friendly for keyboard and screen reader
              users.
            </Paragraph>
          </div>
          <div className={atoms({ flex: 1 })}>
            <Subheader>Type-safe styling</Subheader>
            <Paragraph>
              <code>vanilla-extract</code> is used to provide fully type-safe
              styling system. No dead CSS, no escaping of the principles of the
              design system.
            </Paragraph>
          </div>
          <div className={styles.flex1}>
            <Subheader>Light and dark</Subheader>
            <Paragraph>
              Each component is designed with both light and dark modes in mind.
              User should never have to worry about unexpected unreadable text.
            </Paragraph>
          </div>
          <div className={styles.flex1}>
            <Subheader>Figma file</Subheader>
            <Paragraph>
              Are you working with designers or like to design on your own?
              Up-to-date{" "}
              <a
                href="https://www.figma.com/community/file/1022531774593389664/tonfisk"
                className={styles.link}
              >
                Figma file
              </a>{" "}
              is available for your needs.
            </Paragraph>
          </div>
          <div className={styles.flex1}>
            <Subheader>Autogenerated docs</Subheader>
            <Paragraph>
              Documentation you are about to read are mostly generated from the
              code. They are and always will be as up-to-date and precise as it
              gets.
            </Paragraph>
          </div>
          <div className={styles.flex1}>
            <Subheader>Focused on web</Subheader>
            <Paragraph>
              Compromise this project takes is to fully support web (both
              desktop and mobile) but to give up on React Native or non-react
              frameworks.
            </Paragraph>
          </div>
        </div>
        {/* <div className={styles.tweetsWrapper}>
        <div className={styles.tweets}>
          <Tweet
            handle="tchayen"
            name="Tomasz Czajęcki"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dolor vitae sem commodo interdum sit amet at purus. Mauris aliquet neque id nibh dictum, ac porta sem volutpat."
            avatarUrl="https://github.com/tchayen.png"
          />
          <Tweet
            handle="tchayen"
            name="Tomasz Czajęcki"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dolor vitae sem commodo interdum sit amet at purus. Mauris aliquet neque id nibh dictum, ac porta sem volutpat."
            avatarUrl="https://github.com/tchayen.png"
          />
          <Tweet
            handle="tchayen"
            name="Tomasz Czajęcki"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dolor vitae sem commodo interdum sit amet at purus. Mauris aliquet neque id nibh dictum, ac porta sem volutpat."
            avatarUrl="https://github.com/tchayen.png"
          />
        </div>
      </div> */}
        <footer>
          <div className={styles.footerText}>
            Created by{" "}
            <a href="https://twitter.com/tchayen" className={styles.link}>
              @tchayen
            </a>{" "}
            in Stockholm.
          </div>
        </footer>
      </div>
    </>
  );
}
