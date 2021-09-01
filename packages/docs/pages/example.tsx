/** @jsxRuntime classic */
/** @jsx jsx */
import {
  Button,
  Checkbox,
  Grid,
  Item,
  jsx,
  Provider,
  Select,
  Switch,
  TextInput,
} from "ds";
import { ReactElement } from "react";

export default function Example(): ReactElement {
  return (
    <Provider>
      <Grid
        columns="1fr min(50ch, 100%) 1fr"
        sx={{
          "& > *": {
            gridColumn: 2,
          },
        }}
      >
        <Grid gap={0}>
          <Grid p={3} gap={3}>
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
          </Grid>
          <Switch p={3}>
            Enter a fixed price to allow people to purchase your NFT.
          </Switch>
          <Checkbox p={3}>
            I have the rights to publish this artwork, and understand it will be
            minted on the <strong>Polygon</strong> network.
          </Checkbox>
          <div
            sx={{
              display: "flex",
              p: 3,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span sx={{ fontSize: 1 }}>Last saved 2 minutes ago</span>
            <Button onPress={() => console.log("aaa")}>Create</Button>
          </div>
        </Grid>
      </Grid>
    </Provider>
  );
}
