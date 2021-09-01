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

- Dark mode.
- Direct props instead of passing to `react-aria`.
- Interactive props.
