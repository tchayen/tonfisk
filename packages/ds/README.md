## Must have

- [ ] Case of custom input like in example: how to provide label to the input.

- [ ] Update spinner to feature background for the circle in the outline color.
- [ ] When button is focused but becomes disabled (pagination) it remains with outline and has it until activated and visited again.
- [ ] User text selection color and background.
- [ ] [50%] Some generic landing page?

## Next version

- [ ] Order of modals in example is wrong (settings and warning).
- [ ] Create wrapper next+babel plugins with `vanilla-extract`.
- [ ] Button variants (link).

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

- [ ] Borderless text input.
- [ ] Ability to remove choice from select.
- [ ] Pagination: popover that appears on click on [...] that allows to select arbitrary page.
- [ ] Any element as menu button `children` (example of 🦊 wallet in Figma).
- [ ] Style `<code>` tags in MDX and override `pre code` through globals to avoid padding and background there.
- [x] Placeholder color.
- [ ] Find out how to access theme in regular JS (not in `atoms`).
- [ ] Missing TS typings (especially `Table`, `Menu`).
- [ ] Expose API for switching color modes.
- [ ] Style browser scrollbars https://github.com/tchayen/md-editor/commit/af7cb357bd6cd6064004af4200ce46ff4a45e7c7.
- [ ] Interactive props in examples.
- [ ] Bigger examples to find out missing components.
- [ ] Fully configurable tooltips: system for deciding where tooltip should appear in relation to wrapped content (`bottom-center`, `bottom-left` etc.) and same mechanism for deciding on the arrow placement.

## Done

- [x] Migrate to pure `emotion`, clean up after `stitches`, `theme-ui` and `styled-components`.
- [x] Improve colors for dark mode.
- [x] `<Spinner />`.
- [x] `<Tooltip />`.
- [x] `<Tag />`.
- [x] `<Menu />`.
- [x] Designs and styling for `Menu`.
- [x] `<Table />`.
- [x] Disabled state for components.
- [x] Usage and example instructions in each component (or make it not public).
- [x] Well specified props instead of passing everything to `react-aria`.
- [x] Proper `404` page.
- [x] `<Pagination />`.
- [x] Move disabled opacity to theme.
- [x] Migrate `<Table />` to `vanilla-extract`.
- [x] Find out how to do `keyframes` in `vanilla-extract` and apply them to `<Spinner />`.
- [x] Finish missing `<Tag />`, `<TextInput />`.
- [x] Changes `sizes` etc. to use `xs, s, m, l, xl, xxl` instead of indices.
- [x] Transfer `<Tooltip />` to `vanilla-extract`.
- [x] Remove remaining `/** @jsx jsx */` etc. from any code.
- [x] Global styles for headers and other elements.
- [x] Find out what styles should be shared (input and select, buttons in pagination and main button etc.).
- [x] Check that there are no dead variables.
- [x] Copy tailwind color palette and remove import.
- [x] Pull tailwind colors to Figma.
- [x] Find out proper colors for dark mode.
- [x] Add proper examples going through actually reacting to change in `<Select />`, `Checkbox />`, picking a row in `<Table />` etc.
- [x] Add instructions about setting up `vanilla-extract` plugin for Next.js.
- [x] Find out how to support color mode in `vanilla-extract`.
- [x] Improve styling of Dialog in dark mode.
- [x] Font config for numbers.
- [x] Clickable rounded pill component.
- [x] Active state for pagination buttons.
- [x] Add hovers in docs navigation.
- [x] Style comments to gray color in code blocks.
- [x] Tag component is unfinished (hide or complete?).
- [x] BorderlessInput probably shouldn't be in the DS.
- [x] Style SVG icons in CSS too.
- [x] Plan code: something like `[30] minutes` input from Figma.

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
