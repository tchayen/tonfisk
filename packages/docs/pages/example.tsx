/** @jsxRuntime classic */
/** @jsx jsx */
import {
  Button,
  Checkbox,
  Grid,
  Input,
  Item,
  jsx,
  Provider,
  Select,
  Switch,
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
            <Select label="Network" onSelectionChange={(key) => {}}>
              {[
                { id: 1, name: "Apple" },
                { id: 2, name: "Orange" },
                { id: 3, name: "Plum" },
              ].map((item) => (
                <Item key={item.id}>{item.name}</Item>
              ))}
            </Select>
            <Input label="Title" placeholder="Title" />
            <Input label="Description" placeholder="Cool" />
          </Grid>
          <Switch p={3}>
            Enter a fixed price to allow people to purchase your NFT.
          </Switch>
          <Checkbox p={3}>
            I have the rights to publish this artwork, and understand it will be
            minted on the Polygon network.
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
