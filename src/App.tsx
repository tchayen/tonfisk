import React, { useEffect, useState } from "react";
import * as ethers from "ethers";
import Select, { Item } from "./components/Select";
import * as consts from "./consts";
import "./polyfill";
import Web3 from "web3";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

import { ThemeProvider, Grid } from "theme-ui";
import theme from "./components/theme";

import Button from "./components/Button";
import Switch from "./components/Switch";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
// import Button from "./Button";

const { ethereum } = window;

const shortenAddress = (address: string) =>
  `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
    address.length
  )}`;

function Avatar() {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          boxShadow: "0 0 0 2px inset #AAAAAA",
          width: 48,
          height: 48,
          borderRadius: 24,
        }}
      ></div>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          backgroundColor: "#AAAAAA",
          borderRadius: 24,
        }}
      >
        <path
          d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
          fill="#AAAAAA"
        />
        <ellipse cx="24" cy="38" rx="20" ry="10" fill="white" />
        <circle cx="24" cy="14" r="10" fill="white" />
      </svg>
    </div>
  );
}

// TODO:
// <Tooltip /> for account number.
// <Input /> autosizing? for account name.

const networks = [
  { name: "Mainnet", id: "0x1" },
  { name: "Kovan", id: "0x2a" },
  { name: "Ropsten", id: "0x3" },
  { name: "Rinkeby", id: "0x4" },
  { name: "Goerli", id: "0x5" },
  { name: "Localhost", id: "0x539" },
];

function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const metamask = async () => {
    const [account] = await ethereum.request({ method: "eth_requestAccounts" });
    setAccount(account);

    // Initialize

    ethereum.on("accountsChanged", ([address]) => {
      console.log("accountChanged", address);
      setAccount(address);

      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state
      if (address === undefined) {
        // Reset state
      }

      // Initiailize
    });

    ethereum.on("connect", (params) => {
      console.log("connect", params);
    });

    ethereum.on("disconnect", (params) => {
      console.log("disconnect", params);
    });

    // We reset the dapp state if the network is changed
    ethereum.on("chainChanged", (params) => {
      console.log("chainChanged", params);
    });

    ethereum.on("message", (params) => {
      console.log("message", params);
    });

    const provider = new ethers.providers.Web3Provider(ethereum);

    const balance = await provider.getBalance(account);
    console.log(balance.toString());
  };

  const walletConnect = async () => {
    console.log("a");

    const bridge = "https://bridge.walletconnect.org";
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

    console.log(connector);
    if (!connector.connected) {
      // create new session
      await connector.createSession();
    } else {
      const { chainId, accounts } = connector;
      const address = accounts[0];
      setChainId(chainId);
      setAccount(address);

      const result = await fetch(
        `https://ethereum-api.xyz/account-assets?address=${address}&chainId=${chainId}`
      );
      const data = await result.json();
      console.log(data);
    }

    connector.on("connect", (error, payload) => {
      const { chainId, accounts } = payload.params[0];
      const address = accounts[0];
      console.log(chainId, accounts, address);
    });

    connector.on("accountsChanged", (error, payload) => {
      console.log("accountsChanged", payload);
    });

    connector.on("disconnect", (error, payload) => {
      console.log("disconnect", payload);
    });

    connector.on("chainChanged", (error, payload) => {
      console.log("chainChanged", payload);
    });
  };

  useEffect(() => {
    // walletConnect();
    metamask();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>
          <Avatar />
          <div style={{ fontSize: 22 }}>@tchayen</div>
          {account ? (
            <div
              style={{
                fontFeatureSettings: consts.numbersPreset,
                color: "#555",
              }}
            >
              {shortenAddress(account)}
            </div>
          ) : (
            "..."
          )}
        </div>

        <Grid gap={3} p={3}>
          <Select
            label="Network"
            onSelectionChange={(key) => {
              // https://docs.metamask.io/guide/rpc-api.html#wallet-switchethereumchain
              // ethereum.request({
              //   method: "wallet_switchEthereumChain",
              //   params: [{ chainId: key }],
              // });
            }}
          >
            {networks.map((network) => (
              <Item key={network.id}>{network.name}</Item>
            ))}
          </Select>
          <Button>Sign in</Button>
          <Switch>Label</Switch>
          <Checkbox>Label</Checkbox>
          <Input placeholder="Abc" label="Def" />
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
