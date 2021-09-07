## Must have

- [ ] Add proper examples going through actually reacting to change in `<Select />`, `Checkbox />`, picking a row in `<Table />` etc.
- [ ] Copy tailwind color palette and remove import.
- [ ] Find out how to support color mode in `vanilla-extract`.
- [ ] Add instructions about setting up `vanilla-extract` plugin for Next.js.
- [ ] Create wrapper next+babel plugins with `vanilla-extract`.

## Next version

- [ ] `<Radio />`.
- [ ] `<RadioGroup />`.
- [ ] `<CheckboxGroup />`.
- [ ] `<SearchField />`.
- [ ] `<Breadcrumbs />`.
- [ ] `<ProgressBar />`.
- [ ] `<ComboBox />`.
- [ ] `<Slider />`.
- [ ] `<TabList />`.

## Nice to have

- [ ] Missing TS typings (especially `Table`, `Menu`).
- [x] Changes `sizes` etc. to use `xs, s, m, l, xl, xxl` instead of indices.
- [ ] Expose API for switching color modes.
- [x] Well specified props instead of passing everything to `react-aria`.
- [ ] Interactive props in examples.
- [ ] Bigger examples to find out missing components.
- [ ] Fully configurable tooltips: system for deciding where tooltip should appear in relation to wrapped content (`bottom-center`, `bottom-left` etc.) and same mechanism for deciding on the arrow placement.

## Done

- [x] Component: `<Card />`.
- [x] Migrate to pure `emotion`, clean up after `stitches`, `theme-ui` and `styled-components`.
- [x] Improve colors for dark mode.
- [x] User text selection color and background.
- [x] `<Spinner />`.
- [x] `<Tooltip />`.
- [x] `<Tag />`.
- [x] `<Menu />`.
- [x] Designs and styling for `Menu`.
- [x] `<Table />`.
- [x] Disabled state for components.
- [x] Usage and example instructions in each component (or make it not public).
- [x] Proper `404` page.
- [x] `<Pagination />`.
- [x] Move disabled opacity to theme.
- [x] Migrate `<Table />` to `vanilla-extract`.
- [x] Find out how to do `keyframes` in `vanilla-extract` and apply them to `<Spinner />`.
- [x] Finish missing `<Tag />`, `<TextInput />`.
- [x] Transfer `<Tooltip />` to `vanilla-extract`.
- [x] Remove remaining `/** @jsx jsx */` etc. from any code.
- [x] Global styles for headers and other elements.
- [x] Find out what styles should be shared (input and select, buttons in pagination and main button etc.).
- [x] Check that there are no dead variables.

## CSS in JS

[jsxstyle](https://github.com/jsxstyle/jsxstyle)

```jsx
<Row alignItems="center" padding={15}>
  <Block backgroundColor="#eee" borderRadius={5} height={64} width={64} />
  <Col fontFamily="sans-serif" fontSize={16} lineHeight="24px">
    <Block fontWeight={600}>Abc</Block>
    <Block fontStyle="italic">def</Block>
  </Col>
</Row>
```

## Interesting CSS in JS related projects

[styled-map](https://github.com/scf4/styled-map)
[manipulative](https://github.com/paulshen/manipulative)
