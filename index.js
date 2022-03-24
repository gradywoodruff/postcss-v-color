/**
 * @type {import('postcss').PluginCreator}
 */

const parseGroup = require("./lib/parsers/parse-group")
const parseAttrs = require("./lib/parsers/parse-attrs")

module.exports = (opts = {}) => {
  // const dark = opts.darkSelector || `[data-color-mode="dark"]`
  // const light = `:not([data-color-mode="${
  //   opts.darkSelector || "light"
  // }"])`
  const colors = new Map()

  return {
    postcssPlugin: "postcss-darkmode",
    AtRule: {
      "v-color": (atRule, { result }) => {
        const params = parseAttrs(parseGroup(atRule.params)[0]).map(
          group =>
            group.map((item, i) =>
              i === 1
                ? Object.fromEntries(
                    new Set(
                      item
                        .trim()
                        .split(/,/g)
                        .map(line =>
                          line.split(":").map(prop => prop.trim())
                        )
                    )
                  )
                : item.trim()
            )
        )

        for (const [color, settings] of params) {
          colors.set(color, settings)
        }

        const lightEls = []
        const darkEls = []
        for (const [color, values] of Object.entries(
          Object.fromEntries(colors)
        )) {
          const colorName = `--color-${color}`
          lightEls.push(`${colorName}:${values.light};`)
          darkEls.push(`${colorName}:${values.dark};`)
        }

        try {
          atRule.parent.insertBefore(
            atRule,
            `:root {${lightEls.join(
              ""
            )}}@media (prefers-color-scheme: dark) {:root {${darkEls.join(
              ""
            )}}}`
          )
          atRule.remove()
        } catch (error) {
          atRule.warn(result, error)
        }
      }
    }
  }
}

module.exports.postcss = true
