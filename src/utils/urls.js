function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function json2queryString(json) {
  if (!json) return '';
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) {
      return '';
    }
    return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
  })).join('&');
}

export default json2queryString;
