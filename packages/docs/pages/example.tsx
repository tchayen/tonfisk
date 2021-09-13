import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import {
  OverlayContainer,
  useOverlayPosition,
  useOverlayTrigger,
} from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "@react-stately/overlays";
import {
  atoms,
  Button,
  HorizontalLine,
  Label,
  ModalDialog,
  Pill,
  Popover,
  Switch,
  TextInput,
} from "ds";
import { MenuButtonComponent } from "ds/src/components/Menu";
import { useRouter } from "next/dist/client/router";
import React, { ReactElement, useRef, useState } from "react";

import { BorderlessInput } from "../components/BorderlessInput";

const currencies = [
  {
    name: "Aragon Network Token",
    acronym: "ANT",
    icon: "https://cryptologos.cc/logos/aragon-ant-logo.svg?v=013",
  },
  {
    name: "Balancer",
    acronym: "BAL",
    icon: "https://cryptologos.cc/logos/balancer-bal-logo.svg?v=013",
  },
  {
    name: "Band Protocol",
    acronym: "BAND",
    icon: "https://cryptologos.cc/logos/band-protocol-band-logo.svg?v=013",
  },
  {
    name: "Basic Attention Token",
    acronym: "BAT",
    icon: "https://cryptologos.cc/logos/basic-attention-token-bat-logo.svg?v=013",
  },
  {
    name: "Bancor",
    acronym: "BNT",
    icon: "https://cryptologos.cc/logos/bancor-bnt-logo.svg?v=013",
  },
  {
    name: "Compound",
    acronym: "COMP",
    icon: "https://cryptologos.cc/logos/compound-comp-logo.svg?v=013",
  },
  {
    name: "CurveDAOToken",
    acronym: "CRV",
    icon: "https://cryptologos.cc/logos/curve-dao-token-crv-logo.svg?v=013",
  },
  {
    name: "CVC",
    acronym: "Civic",
    icon: "https://cryptologos.cc/logos/civic-cvc-logo.svg?v=013",
  },
  {
    name: "DAI",
    acronym: "DaiStablecoin",
    icon: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=013",
  },
  {
    name: "Decentraland",
    acronym: "MANA",
    icon: "https://cryptologos.cc/logos/decentraland-mana-logo.svg?v=013",
  },
  {
    name: "UMAVotingTokenv1",
    acronym: "UMA",
    icon: "https://cryptologos.cc/logos/uma-uma-logo.svg?v=013",
  },
  {
    name: "Uniswap",
    acronym: "UNI",
    icon: "https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=013",
  },
  {
    name: "USDCoin",
    acronym: "USDC",
    icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=013",
  },
  {
    name: "Tether USD",
    acronym: "USDT",
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=013",
  },
  {
    name: "Wrapped BTC",
    acronym: "WBTC",
    icon: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg?v=013",
  },
  {
    name: "yearn.finance",
    acronym: "YFI",
    icon: "https://cryptologos.cc/logos/yearn-finance-yfi-logo.svg?v=013",
  },
  {
    name: "0xProtocol",
    acronym: "ZRX",
    icon: "https://cryptologos.cc/logos/0x-zrx-logo.svg?v=013",
  },
];

const SettingsPopover = () => {
  const state = useOverlayTriggerState({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef(null);

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the popover positioning).
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  // Get popover positioning props relative to the trigger
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: "bottom",
    offset: 8,
    isOpen: state.isOpen,
  });

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // popover closes.
  const { buttonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    triggerRef
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  const className = atoms({
    fontFamily: "body",
    fontSize: "14px",
    fontWeight: "bold",
    border: "none",
    background: "transparent",
    margin: "none",
    display: "inline-block",
    cursor: "pointer",
    outline: "none",
    borderRadius: "8px",
    padding: "s",
    color: {
      lightMode: "black",
      darkMode: "gray-200",
    },
    boxShadow: isFocusVisible ? "outline" : "none",
  });

  return (
    <>
      <button
        // TODO: this can become a text variant of button.
        {...mergeProps(buttonProps, triggerProps, focusProps)}
        ref={triggerRef}
        className={className}
      >
        Settings
      </button>
      {state.isOpen && (
        <OverlayContainer>
          <Popover
            {...mergeProps(overlayProps, positionProps)}
            ref={overlayRef}
            isOpen={state.isOpen}
            onClose={state.close}
          >
            <Settings />
          </Popover>
        </OverlayContainer>
      )}
    </>
  );
};

const Settings = () => {
  const warningState = useOverlayTriggerState({});
  const showWarning = () => {
    if (expertMode === false) {
      warningState.open();
    } else {
      setExpertMode(false);
    }
  };

  const [expertMode, setExpertMode] = useState(false);

  return (
    <div>
      <div
        className={atoms({
          display: "flex",
          flexDirection: "column",
          gap: "l",
          padding: "l",
        })}
      >
        <h4
          className={atoms({
            color: {
              lightMode: "black",
              darkMode: "gray-200",
            },
          })}
        >
          Transaction settings
        </h4>
        <TextInput label="Slippage tolerance" placeholder="0.10%" />
        <div>
          <Label>Transaction deadline</Label>
          <TextInput placeholder="30">
            <span
              className={atoms({
                fontSize: "14px",
                color: "gray-600",
                marginLeft: "m",
              })}
            >
              minutes
            </span>
          </TextInput>
        </div>
      </div>
      <HorizontalLine />
      <h4
        className={atoms({
          color: {
            lightMode: "black",
            darkMode: "gray-200",
          },
          marginTop: "l",
          paddingLeft: "l",
        })}
      >
        Interface settings
      </h4>
      <div
        className={atoms({
          padding: "l",
          display: "flex",
          flexDirection: "column",
          gap: "l",
        })}
      >
        <Switch isSelected={expertMode} onChange={showWarning}>
          Toggle expert mode
        </Switch>
        <Switch>Disable multihops</Switch>
      </div>
      {warningState.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="Are you sure?"
            isOpen
            onClose={warningState.close}
            isDismissable
          >
            <HorizontalLine />
            <div
              className={atoms({
                display: "grid",
                gap: "l",
                padding: "l",
              })}
            >
              <p
                className={atoms({
                  padding: "none",
                  margin: "none",
                  color: {
                    lightMode: "gray-600",
                    darkMode: "gray-400",
                  },
                })}
              >
                Expert mode turns off the confirm transaction prompt and allows
                high slippage trades that often result in bad rates and lost
                funds.
              </p>
              <p
                className={atoms({
                  padding: "none",
                  margin: "none",
                  fontWeight: "bold",
                  color: {
                    lightMode: "black",
                    darkMode: "gray-200",
                  },
                })}
              >
                ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.
              </p>
              <Button
                onPress={() => {
                  setExpertMode(!expertMode);
                  warningState.close();
                }}
              >
                TURN ON EXPERT MODE
              </Button>
            </div>
          </ModalDialog>
        </OverlayContainer>
      )}
    </div>
  );
};

const CurrencyInList = ({ onSelect, name, acronym, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const ref = useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(
    {
      onPress: () => {
        onSelect(acronym);
      },
    },
    ref
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  const className = atoms({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: "l",
    paddingBottom: "m",
    paddingTop: "m",
    border: "none",
    textAlign: "left",
    fontFamily: "body",
    background: {
      lightMode: isFocusVisible || isHovered ? "gray-200" : "transparent",
      darkMode: isFocusVisible || isHovered ? "gray-800" : "transparent",
    },
    outline: "none",
  });

  return (
    <button
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...mergeProps(focusProps, buttonProps)}
      className={className}
    >
      <img
        className={atoms({
          width: "32px",
          height: "32px",
          borderRadius: "full",
          marginRight: "m",
        })}
        src={icon}
      />
      <div
        className={atoms({
          display: "flex",
          flexDirection: "column",
          flex: 1,
        })}
      >
        <div
          className={atoms({
            fontWeight: "bold",
            color: {
              lightMode: "black",
              darkMode: "gray-200",
            },
          })}
        >
          {acronym}
        </div>
        <div
          className={atoms({
            fontSize: "12px",
            color: {
              lightMode: "gray-600",
              darkMode: "gray-500",
            },
          })}
        >
          {name}
        </div>
      </div>
      <div
        className={atoms({
          color: {
            lightMode: "gray-600",
            darkMode: "gray-500",
          },
          fontFeatureSettings: "numbers",
        })}
      >
        0.0
      </div>
    </button>
  );
};

const SelectToken = ({ onSelect }: { onSelect: (token: string) => void }) => {
  return (
    <>
      <div
        className={atoms({
          display: "flex",
          flexDirection: "column",
        })}
      >
        <div
          className={atoms({
            display: "flex",
            flexDirection: "column",
            gap: "l",
            padding: "l",
            paddingTop: "none",
          })}
        >
          <TextInput autoFocus placeholder="Search name or paste address" />
          <div>
            <Label>Common</Label>
            <div
              className={atoms({ display: "flex", marginTop: "s", gap: "m" })}
            >
              <Pill
                iconUrl="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=013"
                onPress={() => {
                  onSelect("ETH");
                }}
              >
                ETH
              </Pill>
              <Pill
                iconUrl="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=013"
                onPress={() => {
                  onSelect("DAI");
                }}
              >
                DAI
              </Pill>
              <Pill
                iconUrl="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=013"
                onPress={() => {
                  onSelect("USDC");
                }}
              >
                USDC
              </Pill>
            </div>
          </div>
        </div>
        <HorizontalLine />
        <div
          className={atoms({
            display: "flex",
            flexDirection: "column",
            height: "24ch",
            overflow: "auto",
          })}
        >
          {currencies.map((currency) => (
            <CurrencyInList
              key={currency.acronym}
              onSelect={onSelect}
              {...currency}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const SelectTokenModal = ({
  onSelect,
  children,
}: {
  onSelect: (token: string) => void;
  children: string;
}) => {
  const state = useOverlayTriggerState({});

  return (
    <div>
      <MenuButtonComponent onPress={() => state.open()}>
        {children}
      </MenuButtonComponent>
      {state.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="Select a token"
            isOpen
            onClose={state.close}
            isDismissable
          >
            <SelectToken
              onSelect={(token) => {
                onSelect(token);
                state.close();
              }}
            />
          </ModalDialog>
        </OverlayContainer>
      )}
    </div>
  );
};

export default function Example(): ReactElement {
  const router = useRouter();
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  return (
    <div
      className={atoms({
        padding: "2xl",
      })}
    >
      <div className={atoms({ marginBottom: "l" })}>
        <Button onPress={() => router.back()}>← Back</Button>
        <p
          className={atoms({
            color: {
              lightMode: "gray-600",
              darkMode: "gray-400",
            },
          })}
        >
          This is a tiny Uniswap UI clone to show what the component library is
          capable of.
        </p>
      </div>

      <div
        className={atoms({
          width: "48ch",
          display: "flex",
          flexDirection: "column",
          gap: "l",
        })}
      >
        <div
          className={atoms({
            display: "flex",
            justifyContent: "space-between",
          })}
        >
          <h3
            className={atoms({
              color: {
                lightMode: "black",
                darkMode: "gray-200",
              },
            })}
          >
            Swap
          </h3>
          <SettingsPopover />
        </div>
        <div
          className={atoms({
            width: "48ch",
            borderRadius: "8px",
            border: {
              lightMode: "regular",
              darkMode: "regularDark",
            },
          })}
        >
          <div
            className={atoms({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "l",
              padding: "l",
            })}
          >
            <SelectTokenModal onSelect={(from) => setFrom(from)}>
              {from || "Select token"}
            </SelectTokenModal>
            <BorderlessInput placeholder="0.00" />
          </div>
          <HorizontalLine />
          <div
            className={atoms({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "l",
              padding: "l",
            })}
          >
            <SelectTokenModal onSelect={(to) => setTo(to)}>
              {to || "Select token"}
            </SelectTokenModal>
            <BorderlessInput placeholder="0.00" />
          </div>
        </div>
        <Button
          onPress={() => {
            console.log("Swap");
          }}
        >
          Swap
        </Button>
      </div>
    </div>
  );
}
