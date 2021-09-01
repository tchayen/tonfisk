/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import {
  Button,
  Checkbox,
  Item,
  Provider,
  Select,
  Switch,
  TextInput,
} from "ds";
import { ReactElement } from "react";

export default function Example(): ReactElement {
  const theme = useTheme();
  const { space, fontSizes } = theme;
  return (
    <Provider>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "1fr min(50ch, 100%) 1fr",
          "& > *": {
            gridColumn: 2,
          },
        }}
      >
        <div css={{ display: "grid", gap: 0 }}>
          <div css={{ display: "grid", padding: space[3], gap: space[3] }}>
            <Select label="Fruits" onSelectionChange={(key) => {}}>
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
          <div css={{ padding: space[3] }}>
            <Switch>
              Enter a fixed price to allow people to purchase your NFT.
            </Switch>
          </div>
          <div css={{ padding: space[3] }}>
            <Checkbox>
              I have the rights to publish this artwork, and understand it will
              be minted on the <strong>Polygon</strong> network.
            </Checkbox>
          </div>
          <div
            css={{
              display: "flex",
              padding: space[3],
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span css={{ fontSize: fontSizes[1] }}>
              Last saved 2 minutes ago
            </span>
            <Button onPress={() => console.log("aaa")}>Create</Button>
          </div>
        </div>
      </div>
    </Provider>
  );
}
