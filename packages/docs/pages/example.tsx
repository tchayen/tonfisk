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
  commonStyles,
  HorizontalLine,
  Label,
  ModalDialog,
  Pill,
  Popover,
  Spinner,
  Switch,
  TextInput,
} from "ds";
import { primaryTextColor } from "ds/src/commonStyles.css";
import { MenuButtonComponent } from "ds/src/components/Menu";
import { useRouter } from "next/dist/client/router";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

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
];

type PropsSpaghetti = {
  slippageTolerance: number | undefined;
  setSlippageTolerance: Dispatch<SetStateAction<number | undefined>>;
  transactionDeadline: number | undefined;
  setTransactionDeadline: Dispatch<SetStateAction<number | undefined>>;
  expertMode: boolean;
  setExpertMode: Dispatch<SetStateAction<boolean>>;
  disableMultihops: boolean;
  setDisableMultihops: Dispatch<SetStateAction<boolean>>;
};

const SettingsPopover = ({
  isDisabled,
  slippageTolerance,
  setSlippageTolerance,
  transactionDeadline,
  setTransactionDeadline,
  expertMode,
  setExpertMode,
  disableMultihops,
  setDisableMultihops,
}: PropsSpaghetti & { isDisabled?: boolean }) => {
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
      isDisabled,
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
    cursor: isDisabled ? "default" : "pointer",
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
            <Settings
              slippageTolerance={slippageTolerance}
              setSlippageTolerance={setSlippageTolerance}
              transactionDeadline={transactionDeadline}
              setTransactionDeadline={setTransactionDeadline}
              expertMode={expertMode}
              setExpertMode={setExpertMode}
              disableMultihops={disableMultihops}
              setDisableMultihops={setDisableMultihops}
            />
          </Popover>
        </OverlayContainer>
      )}
    </>
  );
};

const Settings = ({
  slippageTolerance,
  setSlippageTolerance,
  transactionDeadline,
  setTransactionDeadline,
  expertMode,
  setExpertMode,
  disableMultihops,
  setDisableMultihops,
}: PropsSpaghetti) => {
  const warningState = useOverlayTriggerState({});
  const showWarning = () => {
    if (expertMode === false) {
      warningState.open();
    } else {
      setExpertMode(false);
    }
  };

  return (
    <div>
      <div className={commonStyles.flexColumn}>
        <h4 className={primaryTextColor}>Transaction settings</h4>
        <div style={{ width: "50%" }}>
          <TextInput
            label="Slippage tolerance"
            placeholder="0.10%"
            value={slippageTolerance}
            onChange={({ target: { value } }) => setSlippageTolerance(value)}
          />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Label>Transaction deadline</Label>
            <div
              className={atoms({
                display: "flex",
                alignItems: "center",
              })}
            >
              <div style={{ width: "25%" }}>
                <TextInput
                  placeholder="30"
                  value={transactionDeadline}
                  onChange={({ target: { value } }) =>
                    setTransactionDeadline(value)
                  }
                />
              </div>
              <span
                className={atoms({
                  fontSize: "14px",
                  color: {
                    lightMode: "gray-600",
                    darkMode: "gray-400",
                  },
                  marginLeft: "m",
                })}
              >
                minutes
              </span>
            </div>
          </div>
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
      <div className={commonStyles.flexColumn}>
        <Switch isSelected={expertMode} onChange={showWarning}>
          Toggle expert mode
        </Switch>
        <Switch
          isSelected={disableMultihops}
          onChange={() => setDisableMultihops(!disableMultihops)}
        >
          Disable multihops
        </Switch>
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
                size="large"
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

const CurrencyInList = ({
  onSelect,
  name,
  acronym,
  icon,
}: {
  onSelect: (value: string) => void;
  name: string;
  acronym: string;
  icon: string;
}) => {
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
    marginLeft: "s",
    marginRight: "xs",
    borderRadius: "8px",
    border: "none",
    textAlign: "left",
    fontFamily: "body",
    background: {
      lightMode: isPressed
        ? "gray-300"
        : isFocusVisible || isHovered
        ? "gray-200"
        : "transparent",
      darkMode: isPressed
        ? "gray-700"
        : isFocusVisible || isHovered
        ? "gray-800"
        : "transparent",
    },
    outline: "none",
  });

  return (
    <button
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      {...mergeProps(focusProps, buttonProps)}
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
          fontSize: "16px",
          color: {
            lightMode: "gray-500",
            darkMode: "gray-400",
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
            gap: "s",
            paddingTop: "s",
            paddingBottom: "s",
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
  isDisabled,
  children,
}: {
  onSelect: (token: string) => void;
  isDisabled?: boolean;
  children: string;
}) => {
  const state = useOverlayTriggerState({});

  return (
    <div className={atoms({ display: "flex", flex: 1 })}>
      <MenuButtonComponent
        onPress={() => {
          state.open();
        }}
        isDisabled={isDisabled}
      >
        {children}
      </MenuButtonComponent>
      {state.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="Select a token"
            onClose={state.close}
            isDismissable
            isOpen
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

const SpinnerContainer = ({
  className,
  loading,
  children,
}: {
  className: string;
  loading?: boolean;
  children: ReactNode;
}): ReactNode => {
  if (!loading) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={atoms({
        position: "relative",
      })}
    >
      <div
        className={atoms({
          width: "100%",
          height: "100%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <Spinner />
      </div>
      <div
        className={`${className} ${atoms({
          opacity: loading ? 0.5 : 1,
        })}`}
      >
        {children}
      </div>
    </div>
  );
};

export default function Example(): ReactNode {
  const router = useRouter();
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [slippageTolerance, setSlippageTolerance] = useState<
    number | undefined
  >();
  const [transactionDeadline, setTransactionDeadline] = useState<
    number | undefined
  >();
  const [expertMode, setExpertMode] = useState<boolean>(false);
  const [disableMultihops, setDisableMultihops] = useState<boolean>(false);

  const [fromBalance, setFromBalance] = useState<number | null>(null);
  const [toBalance, setToBalance] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFromBalance(null);
    setTimeout(() => {
      setFromBalance(0.000135);
    }, 2000);
  }, [from]);

  useEffect(() => {
    setToBalance(null);
    setTimeout(() => {
      setToBalance(0.253);
    }, 2000);
  }, [to]);

  return (
    <div
      className={atoms({
        padding: "2xl",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      <div className={atoms({ marginBottom: "l" })}>
        <Button onPress={() => router.back()}>← Back</Button>
        <p className={commonStyles.secondaryTextColor}>
          This is a tiny Uniswap UI clone to show what the component library is
          capable of.
        </p>
      </div>
      <SpinnerContainer
        loading={loading}
        className={atoms({
          width: "36ch",
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
          <h3 className={primaryTextColor}>Swap</h3>
          <SettingsPopover
            isDisabled={loading}
            slippageTolerance={slippageTolerance}
            setSlippageTolerance={setSlippageTolerance}
            transactionDeadline={transactionDeadline}
            setTransactionDeadline={setTransactionDeadline}
            expertMode={expertMode}
            setExpertMode={setExpertMode}
            disableMultihops={disableMultihops}
            setDisableMultihops={setDisableMultihops}
          />
        </div>
        <div
          className={atoms({
            width: "36ch",
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
            <div
              className={atoms({
                display: "flex",
                flexDirection: "column",
                gap: "m",
              })}
            >
              <SelectTokenModal
                onSelect={(from) => setFrom(from)}
                isDisabled={loading}
              >
                {from || "Select token"}
              </SelectTokenModal>
              {from && fromBalance && (
                <div
                  className={atoms({
                    fontSize: "14px",
                    color: {
                      lightMode: "gray-600",
                      darkMode: "gray-400",
                    },
                  })}
                >
                  Balance: {fromBalance} {from}
                </div>
              )}
            </div>
            <BorderlessInput
              aria-label="Amount"
              placeholder="0.00"
              isDisabled={loading}
            />
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
            <div
              className={atoms({
                display: "flex",
                flexDirection: "column",
                gap: "m",
              })}
            >
              <SelectTokenModal
                onSelect={(to) => setTo(to)}
                isDisabled={loading}
              >
                {to || "Select token"}
              </SelectTokenModal>
              {to && toBalance && (
                <div
                  className={atoms({
                    fontSize: "14px",
                    color: {
                      lightMode: "gray-600",
                      darkMode: "gray-400",
                    },
                  })}
                >
                  Balance: {toBalance} {to}
                </div>
              )}
            </div>
            <BorderlessInput
              aria-label="Amount"
              placeholder="0.00"
              isDisabled={loading}
            />
          </div>
        </div>
        <Button
          size="large"
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1500);
          }}
          isDisabled={loading}
        >
          Swap
        </Button>
      </SpinnerContainer>
    </div>
  );
}
