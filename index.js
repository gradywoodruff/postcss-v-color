/**
 * PostCSS Variable Colors
 *
 * @type {import('postcss').PluginCreator}
 */

const parseGroup = require("./lib/parsers/parse-group")
const parseAttrs = require("./lib/parsers/parse-attrs")

module.exports = (opts = {}) => {
  // const dark = opts.darkSelector || `[data-color-mode="dark"]`
  // const light = `:not([data-color-mode="${
  //   opts.lightSelector || "light"
  // }"])`
  const colors = new Map()

  return {
    postcssPlugin: "postcss-v-color",
    AtRule: {
      "v-color": (atRule, { result }) => {
        let params = parseGroup(atRule.params)[0]
        if (!params) {
          atRule.warn(result, "No color group found")
          atRule.remove()
          return
        }
        params = parseAttrs(params)
        params = params.map(group =>
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
          colors.set(color, { settings, opts })
        }

        const lightEls = []
        const darkEls = []
        for (const [color, values] of Object.entries(
          Object.fromEntries(colors)
        )) {
          const colorName = `--color-${color}`
          lightEls.push(`${colorName}:${values.settings.light};`)
          darkEls.push(`${colorName}:${values.settings.dark};`)
        }

        atRule.parent.insertBefore(
          atRule,
          `:root {${lightEls.join(
            ""
          )}}@media (prefers-color-scheme: dark) {:root {${darkEls.join(
            ""
          )}}}`
        )
        atRule.remove()
      }
    }
  }
}

module.exports.postcss = true
