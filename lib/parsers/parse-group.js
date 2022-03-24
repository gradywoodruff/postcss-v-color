/**
 * Regex Parser for color group
 *
 * @author J Grady Woodruff IV
 * @since 0.0.0
 */

const REGEX = new RegExp(
  /(?<=\()(?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*(?=\))/,
  "g"
)

module.exports = str => {
  let matches
  let groups = []
  while ((matches = REGEX.exec(str)) !== null) {
    for (const match of matches) {
      groups.push(match)
    }
  }

  return groups
}
