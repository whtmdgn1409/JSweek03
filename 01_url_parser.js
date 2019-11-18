function Url(urlString) {
	this.parseUrl(urlString);
}

//urlString을 ':'기준으로 자른다
Url.prototype.tokenizer = function (urlString) {
	let tokens = urlString.split(':');
	tokens = tokens.filter(e => e); //''을 없애주기 위해
	tokens = (tokens.flatMap(e => e.split('/'))).filter(e => e); // http://의 '//'를 지워주기 위해
  this.href = urlString;
  
	return tokens;
}

Url.prototype.lexer = function (tokens) {
  let lexedTokens = tokens;
  const portReg = RegExp('(https?://.*):(\d*)\/?(.*)');
  const searchReg = RegExp('((.*)\?(.*))');
	const hasPort = portReg.test(this.href);
	const hasSearch = searchReg.test(this.href);
	lexedTokens = lexedTokens.flatMap(e => e.split('?')).filter(e => e);

	return {
		tokens: lexedTokens,
		hasPort,
		hasSearch,
	};
}

Url.prototype.parser = function (lexedObj) {
	this.protocol = `${lexedObj.tokens[0]}:`;
	this.hostname = lexedObj.tokens[1];
  this.host = lexedObj.hasPort ?  `${lexedObj.tokens[1]}:${lexedObj.tokens[2]}` : lexedObj.tokens[1];
  this.origin = `${this.protocol}//${this.host}`;
  this.port = lexedObj.hasPort ?  Number(lexedObj.tokens[2]) : "";
	this.search = lexedObj.hasSearch ? `?${lexedObj.tokens[lexedObj.tokens.length -1]}` : '';
	const makePathName = () => {
		let start = lexedObj.hasPort ? 3 : 2;
		let end = lexedObj.hasSearch ? lexedObj.tokens.length - 1 : lexedObj.tokens.length;
		const pathArray = lexedObj.tokens.slice(start, end);

		return `/${pathArray.join('/')}`
	}
  this.pathname = makePathName()
}

Url.prototype.parseUrl = function (urlString) {
	this.parser(this.lexer(this.tokenizer(urlString)))
}

const myUrl = new Url('http://www.goolge.com:8080/root/sub/resource.html?p1=v1&p2=v2');
console.log(myUrl)

/*
Url {
  href: 'http://www.goolge.com:8080/root/sub/resource.html?p1=v1&p2=v2',
  protocol: 'http:',
  hostname: 'www.goolge.com',
  host: 'www.goolge.com:8080',
  origin: 'http://www.goolge.com:8080',
  port: 8080,
  search: '?p1=v1&p2=v2',
  pathname: '/root/sub/resource.html'
}
 */
