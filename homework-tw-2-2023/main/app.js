/**
 * the function renders an object to a tagged string and performs token substitution
 * @param {object} input - a javascript object representing a hierachycal structure
 * @param {object} values - a list of key value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values) {
  if (typeof input != "object" || typeof values != "object") {
    throw new Error("InvalidType");
  }
  if (Object.keys(input).length === 0) return "";

  let resultedString = "";

  for (let tag in input) {
    if (typeof input[tag] === "object") {
      let inside = render(input[tag], values);
      resultedString += `<${tag}>${inside}</${tag}>`;
    } else {
      resultedString += `<${tag}>${input[tag]}</${tag}>`;
    }
  }
  for (key in values) {
    resultedString = resultedString.replace(`\$\{${key}\}`, values[key]);
  }

  return resultedString;
}

module.exports = {
  render,
};
