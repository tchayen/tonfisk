import {
  atoms,
  Button,
  Card,
  Checkbox,
  HorizontalLine,
  Item,
  Provider,
  Select,
  Switch,
  TextInput,
} from "ds";
import { useRouter } from "next/dist/client/router";
import React, { ReactElement } from "react";

import Modal from "../components/Modal";

export default function Example(): ReactElement {
  const router = useRouter();
  return (
    <Provider>
      <div
        className={atoms({
          padding: "2xl",
        })}
      >
        <div className={atoms({ width: "48ch" })}>
          <Modal />
          <div className={atoms({ marginBottom: "l" })}>
            <Button onPress={() => router.back()}>← Back</Button>
          </div>
          <Card>
            <div className={atoms({ display: "grid", padding: "l", gap: "l" })}>
              <Select
                label="Fruits"
                placeholder="Pick a fruit"
                onSelectionChange={(key) => {}}
              >
                {[
                  { id: 1, name: "Apple" },
                  { id: 2, name: "Orange" },
                  { id: 3, name: "Plum" },
                ].map((item) => (
                  <Item key={item.id}>{item.name}</Item>
                ))}
              </Select>
              <TextInput label="Title" placeholder="Title" />
              <TextInput label="Description" placeholder="Cool" />
            </div>
            <HorizontalLine />
            <div className={atoms({ padding: "l" })}>
              <Switch>
                Enter a fixed price to allow people to purchase your NFT.
              </Switch>
            </div>
            <HorizontalLine />
            <div className={atoms({ padding: "l" })}>
              <Checkbox>
                I have the rights to publish this artwork, and understand it
                will be minted on the{" "}
                <strong
                  className={atoms({
                    color: {
                      lightMode: "black",
                      darkMode: "gray-200",
                    },
                  })}
                >
                  Polygon
                </strong>{" "}
                network.
              </Checkbox>
            </div>
            <HorizontalLine />
            <div
              className={atoms({
                display: "flex",
                padding: "l",
                justifyContent: "space-between",
                alignItems: "center",
              })}
            >
              <span
                className={atoms({
                  color: {
                    lightMode: "black",
                    darkMode: "gray-400",
                  },
                  fontSize: "14px",
                })}
              >
                Last saved 2 minutes ago
              </span>
              <Button onPress={() => console.log("aaa")}>Create</Button>
            </div>
          </Card>
        </div>
      </div>
    </Provider>
  );
}
