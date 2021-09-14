## Must have

- [ ] [50%] Some generic landing page?
- [ ] Pagination dots popover does not always appear on keyboard.

## Next version

- [ ] Change design and implement new look for switch to look like classic iOS switch and not material design one.
- [ ] When button is focused but becomes disabled (pagination) it remains with outline and has it until activated and visited again.
- [ ] Update spinner to feature background for the circle in the outline color.
- [ ] Case of custom input like in example: how to provide label to the input.
- [ ] Change focus outline on buttons to look more like twitter.
- [ ] Create wrapper next+babel plugins with `vanilla-extract`.
- [ ] Button variants (link).

- [ ] Accordion
- [ ] Radio
- [ ] RadioGroup
- [ ] CheckboxGroup
- [ ] SearchField
- [ ] Breadcrumbs
- [ ] [ProgressBar](https://react-spectrum.adobe.com/react-aria/useProgressBar.html)
- [ ] [ComboBox](https://react-spectrum.adobe.com/react-aria/useComboBox.html)
- [ ] [Slider](https://react-spectrum.adobe.com/react-aria/useSlider.html)
- [ ] TabList

## Nice to have

- [ ] Releases tab as in Braid https://seek-oss.github.io/braid-design-system/components/Box/releases
- [ ] Borderless text input.
- [ ] Ability to remove choice from select.
- [ ] Any element as menu button `children` (example of 🦊 wallet in Figma).
- [ ] Style `<code>` tags in MDX and override `pre code` through globals to avoid padding and background there.
- [ ] Find out how to access theme in regular JS (not in `atoms`).
- [ ] Missing TS typings (especially `Table`, `Menu`).
- [ ] Expose API for switching color modes.
- [ ] Interactive props in examples.
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
- [x] Placeholder color.
- [x] Order of modals in example is wrong (settings and warning).
- [x] Style browser scrollbars.
- [x] User text selection color and background.
- [x] Pagination: popover that appears on click on [...] that allows to select arbitrary page.
- [x] Bigger examples to find out missing components.
