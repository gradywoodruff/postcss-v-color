# postcss-v-color

[PostCSS] plugin for creating color variables.

[PostCSS]: https://github.com/postcss/postcss

```
@v-color (
  bg-default ( 
    light: var(--color-white),
    dark: var(--color-black)
  ),
  fg-default ( 
    light: var(--color-grey-dark),
    dark: var(--color-grey-light)
  ),
  text-highlight ( 
    light: var(--color-grey-dark),
    dark: var(--color-grey-light)
  )
);
```

```css
:root {
  --color-bg-default: var(--color-white);
  --color-fg-default: var(--color-grey-dark);
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-default: var(--color-black);
    --color-fg-default: var(--color-grey-light);
  }
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-v-color
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-v-color'),
    require('autoprefixer')
  ]
}
```

## Todo

- [ ] Add manual mode toggle support
- [ ] Add ability to add custom themes (like dark_dimmed)
- [ ] Add ability to use args in postcss.config.js


[official docs]: https://github.com/postcss/postcss#usage
