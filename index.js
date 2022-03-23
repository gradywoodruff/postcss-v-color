/**
 * @type {import('postcss').PluginCreator}
 */

const parseGroup = require("./lib/parsers/parse-group");
const parseAttrs = require("./lib/parsers/parse-attrs");

module.exports = (opts = {}) => {
  const dark = opts.darkSelector || `[data-color-mode="dark"]`;
  const light = `:not([data-color-mode="${opts.darkSelector || "light"}"])`;
  const colors = new Map();

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

    AtRuleExit(atrule) {
      if (atrule.name !== "v-color") return;

      // let color = atrule.params.match(/(.*):? ?\(([^)]+)\)/)[1].trim();
      // let params = Object.fromEntries(
      //   atrule.params
      //     .match(/\(([^)]+)\)/)[1]
      //     .split(",")
      //     .map((arg) => arg.trim())
      //     .map((val) => val.split(":").map((val) => val.trim()))
      // );

      const params = parseAttrs(parseGroup(atrule.params)[0]).map((group) =>
        group.map((item, i) =>
          i === 1
            ? Object.fromEntries(
                new Set(
                  item
                    .trim()
                    .split(/,/g)
                    .map((line) => line.split(":").map((prop) => prop.trim()))
                )
              )
            : item.trim()
        )
      );

      for (const [color, settings] of params) {
        colors.set(color, settings);
      }

      console.log("******************");
      console.log("colors");
      console.log(colors);
    },

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
};

module.exports.postcss = true;

// const postcss = require("postcss")
// const parseValue = require("postcss-value-parser")

// module.exports = postcss.plugin("postcss-darkmode", (opts = {}) => {
//   opts.functionName = opts.functionName || "darkmode"

//   return (css) => {
//     css.walkDecls((decl) => {
//       let parsedValue = parseValue(decl.value)

//       decl.value = parsedValue
//         .walk((node) => {
//           if (node.value !== opts.functionName) return

//           let params = [],
//             options = {}
//           if (node.type === "function") {
//             params = node.nodes
//               .filter(({ type }) => type === "word")
//               .map(({ value }) => value)

//             node.type = "word"
//           }

//           if (params[0]) options.luminosity = params[0]
//           if (params[1]) options.hue = params[1]
//           if (opts.format) options.format = opts.format

//           node.value = randomColor(options)
//         })
//         .toString()
//     })
//   }
// })
