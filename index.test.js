const postcss = require("postcss")

const plugin = require("./")

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined
  })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

// Write tests here
it("does something", async () => {
  await run(
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
    ":root {--color-background:var(--color-white);--color-text-headline:var(--color-grey-dark);--color-text-highlight:var(--color-grey-dark);}@media (prefers-color-scheme: dark) {:root {--color-background:var(--color-black);--color-text-headline:var(--color-grey-light);--color-text-highlight:var(--color-grey-light);}}",
    {}
  )
})
