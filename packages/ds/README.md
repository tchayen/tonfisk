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
- [ ] Improve colors for dark mode.
- [ ] User text selection color and background.
- [ ] Bigger examples to find out missing components.
- [ ] Component: `<Tooltip />`.
- [ ] Component: `<Pill />`.
- [ ] Component: `<Tag />`.
- [ ] Component: `<Menu />`.
- [ ] Proper dark mode switch.
- [ ] Direct props instead of passing to `react-aria`.
- [ ] Interactive props.

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
