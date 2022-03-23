/**
 * @type {import('postcss').PluginCreator}
 */

const parseGroup = require("./lib/parsers/parse-group")
const parseAttrs = require("./lib/parsers/parse-attrs")

module.exports = (opts = {}) => {
  const dark = opts.darkSelector || `[data-color-mode="dark"]`
  const light = `:not([data-color-mode="${
    opts.darkSelector || "light"
  }"])`
  const colors = new Map()

  return {
    postcssPlugin: "postcss-darkmode",
    // Root(root, postcss) {
    //   const args = root.nodes[0].params
    //     .match(/\(([^)]+)\)/)[1]
    //     .split(",")
    //     .map((arg) => arg.trim());

    //   for (const arg of args) {
    //     const [key, value] = arg.split(":").map((arg) => arg.trim());
    //   }
    //   console.log("postcss");
    //   console.log(postcss);
    // },

    AtRule: {
      "v-color": atrule => {
        const params = parseAttrs(parseGroup(atrule.params)[0]).map(
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
          colors.set(color, { rule: atrule, settings })
        }
        console.log("******************")
        console.log("colors")
        console.log(colors)
        atrule.each(node => {
          console.log("******************")
          console.log("node")
          console.log(node)
        })
      }
    }
  }
}

module.exports.postcss = true
