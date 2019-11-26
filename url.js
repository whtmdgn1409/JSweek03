function UrlParser(url) {
  const parser = new RegExp(
    /^(https?):\/\/([^:\/\s]+)(:([0-9]+))?(\/([^#\s\?]*))(\?([^#\s]*))?(#(\w*))?$/,
    "g"
  );
  const result = url.split(parser).reduce((pre, curval, curindex) => {
    if (curval != "") pre[curindex] = curval;
    return pre;
  }, {});
  return result;
}

const input = `http://www.example.com:3000/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument`;
const parsedUrl = new UrlParser(input);
console.log(parsedUrl);
