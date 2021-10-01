import { useFocusRing } from "@react-aria/focus";
import Link from "next/link";
import React from "react";
import { atoms } from "tonfisk";

export function Logo({ size }: { size?: number }): JSX.Element {
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <Link href="/">
      <a
        href="/"
        className={atoms({
          outline: "none",
          boxShadow: isFocusVisible ? "outline" : "none",
          display: "inline-flex",
          margin: "s",
          padding: "m",
          borderRadius: "8px",
        })}
        {...focusProps}
      >
        <h1
          style={{
            fontSize: size || 64,
            backgroundColor: "#f3ec78",
            backgroundImage: "linear-gradient(90deg,#12c2e9,#c471ed,#f64f59)",
            backgroundSize: "100%",
            WebkitBackgroundClip: "text",
            MozBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          tonfisk 🐟
        </h1>
      </a>
    </Link>
  );
}
