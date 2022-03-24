/**
 * Regex Parser for attributes
 *
 * @author J Grady Woodruff IV
 * @since 0.0.0
 */

const REGEX = new RegExp(
  /([a-zA-Z0-9\-_]* ?)\(((?<=\()(?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*(?=))/,
  "g"
)

module.exports = str => {
  let matches
  let groups = []
  while ((matches = REGEX.exec(str)) !== null) {
    let data = []
    if (matches.index === REGEX.lastIndex) {
      REGEX.lastIndex++
    }

    for (const [i, match] of matches.entries()) {
      /// Skip the first match, which is the title
      /// of the color definition
      if (i > 0) {
        data.push(match)
      }
    }

    groups.push(data)
  }
  return groups
}
