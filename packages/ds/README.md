## Must have

- [ ] Rename table components without prefix Table to contain it.
- [ ] [50%] Some generic landing page?
- [ ] Review styles to find out what is worth reusing.
- [ ] Animate fade in/out of modals (https://www.framer.com/docs/animate-presence/).

### Example improvements

- [ ] Make tick and selection in tables white in dark mode and text white in light mode.
- [ ] Refactor example a lot, share code, get rid of props spaghetti, split main form into two components.
- [ ] In example, when user presses swap, show non-dismisable modal with progress of transaction (TODO: find out what are the steps).

[Ethereum Docs / Transactions](https://ethereum.org/en/developers/docs/transactions/)

## Bugs

- [ ] Pagination dots popover does not always appear on keyboard.
- [ ] Case of custom input like in example: how to provide label to the input.
- [ ] When button is focused but becomes disabled (pagination) it remains with outline and has it until activated and visited again.

## Next version

- [ ] `(?)` button? for form labels that show tooltip.
- [ ] Create wrapper next+babel plugins with `vanilla-extract`.
- [ ] Button variants (link).
- [ ] Ability to remove choice from select.

- [ ] Accordion
- [ ] Radio
- [ ] [RadioGroup](https://react-spectrum.adobe.com/react-aria/useRadioGroup.html)
- [ ] [CheckboxGroup](https://react-spectrum.adobe.com/react-aria/useCheckboxGroup.html)
- [ ] [SearchField](https://react-spectrum.adobe.com/react-aria/useSearchField.html)
- [ ] [Breadcrumbs](https://react-spectrum.adobe.com/react-aria/useBreadcrumbs.html)
- [ ] [ProgressBar](https://react-spectrum.adobe.com/react-aria/useProgressBar.html)
- [ ] [ComboBox](https://react-spectrum.adobe.com/react-aria/useComboBox.html)
- [ ] [Slider](https://react-spectrum.adobe.com/react-aria/useSlider.html)
- [ ] TabList

## Nice to have

- [ ] Order guides without need for `\d+\-[A-z]+` pattern in the name.
- [ ] Releases tab as in Braid https://seek-oss.github.io/braid-design-system/components/Box/releases
- [ ] Borderless text input.
- [ ] Any element as menu button `children` (example of 🦊 wallet in Figma).
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
- [x] Update spinner to feature background for the circle in the outline color.
- [x] Make all pages have equal width.
- [x] Update `react-aria` and `@vanilla-extract/css`.
- [x] Import CSS from `*.css.ts` files as `import * from ...` to refer to them as `styles.className` instead of just `className` (too much wondering where did this variable come from).
- [x] Implement TODOs about converting code to recipes.
- [x] Active link is missing in sidebar on homepage.
- [x] External links are missing hovers.
- [x] Style `<code>` properly.
- [x] Fix margins (getting started paragraphs and headers as example).
- [x] Homepage in MDX.
- [x] Add a 'copy code' button for code blocks.
- [x] Style `<code>` tags in MDX and override `pre code` through globals to avoid padding and background there.
