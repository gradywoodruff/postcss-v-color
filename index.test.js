const postcss = require("postcss");

const plugin = require("./");

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

// Write tests here
it("does something", async () => {
  await run(
    `
    @v-color (
      text-background ( 
        light: var(--color-white), 
        light_high_contrast: var(--color-white),
        dark: var(--color-black),
        dark_high_contrast: var(--color-white),
        dark_dimmed: var(--color-grey-dark)
      ),
      text-headline ( 
        light: var(--color-grey-dark), 
        light_high_contrast: var(--color-black),
        dark: var(--color-grey-light),
        dark_high_contrast: var(--color-white),
        dark_dimmed: var(--color-grey-medium)
      ),
      text-highlight ( 
        light: var(--color-grey-dark), 
        light_high_contrast: var(--color-black),
        dark: var(--color-grey-light),
        dark_high_contrast: var(--color-white),
        dark_dimmed: var(--color-grey-medium)
      )
    );
  `,
    `
    :root {
      --color-highlight-text: #000;
      --color-normal-text: #000;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --color-highlight-text: #fff;
        --color-normal-text: #fff;
      }
    }
  `,
    {}
  );
});
