function Url(url) {
  this.parser(url);
}

Url.prototype.parser = function(url) {
  const reg = /^([\w]+):\/\/([\w\.]+):?([\d]+)?([\/\w\.-]+)?\??([^#]+)?\#?([\w\W]+)?$/g;
  const [_, scheme, host, port, resource, query, anchor] = reg.exec(url);
  Object.assign(this, {
    scheme,
    host,
    port,
    resource,
    parameter: query.split("&").reduce((result, cur) => {
      const [key, value] = cur.split("=");
      Object.assign(result, { [key]: value });
      return result;
    }, {}),
    anchor
  });
};

const example = new Url("http://www.example.com?key1=value1&key2=value2");

console.log(example);
