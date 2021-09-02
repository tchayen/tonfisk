/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import {
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
import { ReactElement } from "react";

export default function Example(): ReactElement {
  const theme = useTheme();
  const { space, fontSizes } = theme;
  const router = useRouter();
  return (
    <Provider>
      <div
        css={{
          marginTop: space[3],
          display: "grid",
          gridTemplateColumns: "1fr min(50ch, 100%) 1fr",
          "& > *": {
            gridColumn: 2,
          },
        }}
      >
        <div css={{ marginBottom: space[3] }}>
          <Button onPress={() => router.back()}>← Back</Button>
        </div>
        <Card>
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
          <HorizontalLine />
          <div css={{ padding: space[3] }}>
            <Switch>
              Enter a fixed price to allow people to purchase your NFT.
            </Switch>
          </div>
          <HorizontalLine />
          <div css={{ padding: space[3] }}>
            <Checkbox>
              I have the rights to publish this artwork, and understand it will
              be minted on the <strong>Polygon</strong> network.
            </Checkbox>
          </div>
          <HorizontalLine />
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
        </Card>
      </div>
    </Provider>
  );
}
