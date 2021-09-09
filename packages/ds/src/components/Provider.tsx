import { OverlayProvider } from "@react-aria/overlays";
import { SSRProvider } from "@react-aria/ssr";
import React, { ReactElement, useEffect } from "react";
import useDarkModeLib from "use-dark-mode";
import { atoms } from "../theme.css";

const toKebabCase = (s: string): string =>
  s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const useDarkMode = () => {
  const darkMode = useDarkModeLib(false, {
    storageKey: "color-mode",
    onChange: () => {},
  });

  // useEffect(() => {
  //   const mql = window.matchMedia("(prefers-color-scheme: dark)");
  //   const prefersDarkFromMQ = mql.matches;
  //   const colorMode = prefersDarkFromMQ ? "dark" : "light";

  //   const root = document.documentElement;

  //   Object.entries(theme.colors.modes[colorMode]).forEach(([key, value]) => {
  //     root.style.setProperty(`--${toKebabCase(key)}`, value);
  //   });
  // }, [darkMode, darkMode.value]);
};

type Props = {
  /**
   * All your app code.
   */
  children: React.ReactNode;
};

/**
 * Provider that is required for the design system to work. Call it in your main `App` component.
 *
 *  ## Usage
 *
 * ```jsx
 * import { Provider } from "@tchayen/design-system";
 *
 * <Provider>
 *   // Your app here.
 * </Provider>
 * ```
 *
 * ```tsx
 * import * from as THREE from "three";
 * import React, { useState, useRef } from "react";
 * import { Canvas, useFrame } from "@react-three/fiber";
 *
 * const mesh = new THREE.Mesh(
 *   new THREE.BoxGeometry(),
 *   new THREE.MeshBasicMaterial,
 * );
 * const group = new THREE.Group();
 * group.add(mesh);
 *
 * function Box(props: any) {
 *   const ref = useRef<THREE.Mesh>(null);
 *   const [hovered, setHovered] = useState(false);
 *   const [clicked, setClicked] = useState(false);
 *
 *   return (
 *     <mesh
 *       ref={ref}
 *       onPointerOver={() => setHovered(true)}
 *       onPointerOut={() => setHovered(false)}
 *       onClick={() => setClicked(!clicked)}
 *       {...props}
 *     >
 *       <boxBufferGeometry />
 *     </mesh>
 *   );
 * }
 * ```
 */
export function Provider({ children }: Props): ReactElement {
  useDarkMode();

  return (
    <SSRProvider>
      <OverlayProvider>
        <div
          className={atoms({
            background: {
              lightMode: "white",
              darkMode: "gray-900",
            },
            minHeight: "100vh",
          })}
        >
          {children}
        </div>
      </OverlayProvider>
    </SSRProvider>
  );
}
