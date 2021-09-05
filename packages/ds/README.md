## Be careful

In order for `sx` prop to work on HTML elements

```jsx
<div
  sx={{
    fontSize: 1,
  }}
>
  Hello world
</div>
```

`jsx` transform must be imported from `theme-ui` and set with special pragmas.

Simply paste:

```jsx
/** @jsxRuntime classic */
/** @jsx jsx */
```

to the top of the file.

A bit more about it in the issues: [theme-ui#1160](https://github.com/system-ui/theme-ui/issues/1160#issuecomment-715530924).

## Must have

- [x] Usage and example instructions in each component (or make it not public).
- [ ] `<Pagination />`.
- [ ] Disabled state for components.
- [ ] Proper examples going through actually reacting to change in `<Select />`, `Checkbox />`, picking a row in `<Table />` etc.
- [ ] Proper color palette.
- [ ] Proper `404` page.

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
- [ ] Changes `sizes` etc. to use `xs, s, m, l, xl, xxl` instead of indices.
- [ ] Override `emotion`'s `css` prop to add shorthands (`padding` → `p`). Refer to: `theme-ui` source [1](https://github.com/system-ui/theme-ui/blob/develop/packages/css/src/index.ts), [2](https://github.com/system-ui/theme-ui/blob/develop/packages/parse-props/src/index.ts).
- [ ] Expose API for switching color modes.
- [ ] Well specified props instead of passing everything to `react-aria`.
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
