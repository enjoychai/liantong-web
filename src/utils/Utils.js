
export default {
  // Remove left and right spaces
  trim(str) {
    return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '')
  },
}
