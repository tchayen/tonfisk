import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useOverlayPosition, useOverlayTrigger } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { useRouter } from "next/dist/client/router";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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
} from "tonfisk";
import { primaryTextColor } from "tonfisk/src/commonStyles.css";
import { MenuButtonComponent } from "tonfisk/src/components/Menu";

import { BorderlessInput } from "../../components/BorderlessInput";
import { GitHubSource } from "../../components/GitHubSource";
import currencies from "../../examples/exchange/currencies.json";
import { CurrencyInList } from "../../examples/exchange/CurrencyInList";

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

if (typeof Image !== "undefined") {
  currencies.forEach((currency) => {
    new Image().src = currency.icon;
  });
}

const SettingsPopover = ({
  isDisabled,
  ...props
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
      isDisabled: isDisabled,
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
        {...mergeProps(buttonProps, triggerProps, focusProps)}
        ref={triggerRef}
        className={className}
      >
        Settings
      </button>
      <Popover
        {...mergeProps(overlayProps, positionProps)}
        ref={overlayRef}
        isOpen={state.isOpen}
        onClose={state.close}
      >
        <Settings {...props} />
      </Popover>
    </>
  );
};

function Settings({
  slippageTolerance,
  setSlippageTolerance,
  transactionDeadline,
  setTransactionDeadline,
  expertMode,
  setExpertMode,
  disableMultihops,
  setDisableMultihops,
}: PropsSpaghetti) {
  const warningState = useOverlayTriggerState({});
  const showWarning = () => {
    if (expertMode === false) {
      warningState.open();
    } else {
      setExpertMode(false);
    }
  };

  return (
    <>
      <div className={commonStyles.flexColumn}>
        <h4 className={primaryTextColor}>Transaction settings</h4>
        <div style={{ width: "50%" }}>
          <TextInput
            label="Slippage tolerance"
            placeholder="0.10%"
            value={slippageTolerance?.toString()}
            onChange={(value) => setSlippageTolerance(Number(value))}
          />
        </div>
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
                value={transactionDeadline?.toString()}
                onChange={(value) => setTransactionDeadline(Number(value))}
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
      <ModalDialog
        title="Are you sure?"
        isOpen={warningState.isOpen}
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
            Expert mode turns off the confirm transaction prompt and allows high
            slippage trades that often result in bad rates and lost funds.
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
    </>
  );
}

function SelectToken({ onSelect }: { onSelect: (token: string) => void }) {
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
          <TextInput
            autoFocus
            placeholder="Search name or paste address"
            aria-label="Search name or paste address"
          />
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
}

function SelectTokenModal({
  onSelect,
  isDisabled,
  placeholder,
  children,
}: {
  onSelect: (token: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  children: string | null;
}) {
  const state = useOverlayTriggerState({});

  return (
    <div className={atoms({ display: "flex", flex: 1 })}>
      <MenuButtonComponent
        onPress={() => {
          state.open();
        }}
        isDisabled={isDisabled}
      >
        {children || (
          <span
            className={atoms({
              color: {
                darkMode: "gray-600",
                lightMode: "gray-400",
              },
            })}
          >
            {placeholder}
          </span>
        )}
      </MenuButtonComponent>
      <ModalDialog
        title="Select a token"
        onClose={state.close}
        isDismissable
        isOpen={state.isOpen}
      >
        <SelectToken
          onSelect={(token) => {
            onSelect(token);
            state.close();
          }}
        />
      </ModalDialog>
    </div>
  );
}

function SpinnerContainer({
  className,
  loading,
  children,
}: {
  className: string;
  loading?: boolean;
  children: ReactNode;
}): JSX.Element {
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
}

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
                placeholder="Select a token"
                isDisabled={loading}
              >
                {from}
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
                placeholder="Select a token"
                isDisabled={loading}
              >
                {to}
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
      <GitHubSource path="packages/docs/pages/docs/example.tsx" />
    </div>
  );
}
