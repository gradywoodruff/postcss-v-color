const regex = new RegExp(
  /(?<=\()(?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*(?=\))/,
  "g"
)

module.exports = str => {
  let matches
  let groups = []
  while ((matches = regex.exec(str)) !== null) {
    if (matches.index === regex.lastIndex) {
      regex.lastIndex++
    }

    for (const match of matches) {
      groups.push(match)
    }
  }
  return groups
}
