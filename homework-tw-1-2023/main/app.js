const compress = (a, b = true) => {
  //TODO: implementați funcția
  // TODO: implement the function
  if (!(typeof a === "string" || a instanceof String))
    throw new Error("InvalidType");
  if (a == "") return "";
  if (b === true) {
    let compressedString = "";
    let occurrences = 0;
    let letter = a[0];
    for (let i = 0; i < a.length; i++) {
      if (a[i] === letter) {
        occurrences++;
      } else {
        compressedString += letter;
        compressedString += occurrences;
        letter = a[i];
        occurrences = 1;
      }
    }
    compressedString += letter;
    compressedString += occurrences;
    return compressedString;
  }
  if (b === false) {
    let decompressedString = "";
    let i = 1;
    while (i < a.length) {
      let n = a[i];
      for (n; n > 0; n--) {
        decompressedString += a[i - 1];
      }
      i += 2;
    }
    return decompressedString;
  }
};

module.exports = compress;
