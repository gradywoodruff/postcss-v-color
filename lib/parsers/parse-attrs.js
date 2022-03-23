const regex = new RegExp(
  /([a-zA-Z0-9\-_]* ?)\(((?<=\()(?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*(?=))/,
  "g"
)

module.exports = str => {
  let matches
  let groups = []
  while ((matches = regex.exec(str)) !== null) {
    let data = []
    if (matches.index === regex.lastIndex) {
      regex.lastIndex++
    }

    for (const [i, match] of matches.entries()) {
      if (i > 0) {
        data.push(match)
      }
    }

    groups.push(data)
  }
  return groups
}
