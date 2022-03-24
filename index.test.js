/**
 * Tests
 *
 * @author J Grady Woodruff IV
 * @since 0.0.0
 */

const postcss = require("postcss")
const plugin = require("./")
const expect = require("expect")
const TESTS = {
  success: {
    idealFormatting: [
      `
      @v-color (
        background ( 
          light: var(--color-white),
          dark: var(--color-black)
        ),
        text-headline ( 
          light: var(--color-grey-dark),
          dark: var(--color-grey-light)
        ),
        text-highlight ( 
          light: var(--color-grey-dark),
          dark: var(--color-grey-light)
        )
      );`,
      ":root {--color-background:var(--color-white);--color-text-headline:var(--color-grey-dark);--color-text-highlight:var(--color-grey-dark);}@media (prefers-color-scheme: dark) {:root {--color-background:var(--color-black);--color-text-headline:var(--color-grey-light);--color-text-highlight:var(--color-grey-light);}}"
    ],
    oneLiner: [
      `
      @v-color(background(light:var(--color-white),dark:var(--color-black)),text-headline(light:var(--color-grey-dark),dark: var(--color-grey-light)),text-highlight(light:var(--color-grey-dark),dark: var(--color-grey-light)));`,
      ":root {--color-background:var(--color-white);--color-text-headline:var(--color-grey-dark);--color-text-highlight:var(--color-grey-dark);}@media (prefers-color-scheme: dark) {:root {--color-background:var(--color-black);--color-text-headline:var(--color-grey-light);--color-text-highlight:var(--color-grey-light);}}"
    ],
    linearFormattingWithSpaces: [
      `
      @v-color (
        background ( light: var(--color-white), dark: var(--color-black) ),
        text-headline ( light: var(--color-grey-dark), dark: var(--color-grey-light) ),
        text-highlight ( light: var(--color-grey-dark), dark: var(--color-grey-light) )
      );`,
      ":root {--color-background:var(--color-white);--color-text-headline:var(--color-grey-dark);--color-text-highlight:var(--color-grey-dark);}@media (prefers-color-scheme: dark) {:root {--color-background:var(--color-black);--color-text-headline:var(--color-grey-light);--color-text-highlight:var(--color-grey-light);}}"
    ],
    linearFormattingWithoutSpaces: [
      `
      @v-color(
        background (light:var(--color-white),dark:var(--color-black)),
        text-headline (light:var(--color-grey-dark),dark: var(--color-grey-light)),
        text-highlight (light:var(--color-grey-dark),dark: var(--color-grey-light))
      );`,
      ":root {--color-background:var(--color-white);--color-text-headline:var(--color-grey-dark);--color-text-highlight:var(--color-grey-dark);}@media (prefers-color-scheme: dark) {:root {--color-background:var(--color-black);--color-text-headline:var(--color-grey-light);--color-text-highlight:var(--color-grey-light);}}"
    ]
  },
  failure: {
    noParentheses: [
      `
      @v-color background;`,
      "",
      { expectEmpty: true }
    ]
  }
}

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined
  })
  expect(result.css).toEqual(output)
  if (!opts.expectEmpty) {
    expect(result.warnings()).toHaveLength(0)
  }
}

for (const [type, tests] of Object.entries(TESTS)) {
  for (let [name, [input, output, opts]] of Object.entries(tests)) {
    name = name.replace(/([A-Z])/g, " $1")
    name = name.charAt(0).toUpperCase() + name.slice(1)

    // eslint-disable-next-line no-undef
    it(`${type.toUpperCase()}: ${name}`, async () => {
      await run(input, output, opts || {})
    })
  }
}
