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

## TODO

- [x] Migrate to pure `emotion`, clean up after `stitches`, `theme-ui` and `styled-components`.
- [ ] Changes `sizes` etc. to use `xs, s, m, l, xl, xxl` instead of indices.
- [ ] Override `emotion`'s `css` prop to add shorthands (`padding` → `p`). Refer to: `theme-ui` source [1](https://github.com/system-ui/theme-ui/blob/develop/packages/css/src/index.ts), [2](https://github.com/system-ui/theme-ui/blob/develop/packages/parse-props/src/index.ts).
- [ ] Improve colors for dark mode.
- [ ] Expose API for switching color modes.
- [ ] User text selection color and background.
- [ ] Bigger examples to find out missing components.
- [ ] Component: `<Tooltip />`.
- [ ] Component: `<Pill />`.
- [ ] Component: `<Tag />`.
- [ ] Component: `<Menu />`.
- [x] Component: `<Card />`.
- [ ] Component: `<Tabs />`.
- [ ] Component: `<Table />`.
- [ ] Component: `<Spinner />`.
- [ ] Component: `<Pagination />`.
- [ ] Component: `<ProgressBar />`.
- [ ] Well specified props instead of passing everything to `react-aria`.
- [ ] Interactive props in examples.

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
