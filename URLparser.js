let obj = { result: "", protocol: "", domainName: "", port:"", pathFile:"", parameter:"", anchor:"" };

function Parse(url) {
    // tokenizer 
    var regex = /^(https?)?:\/\/([^:\/\s]+)?:([^\/]*)?((\/[^\s\/]+)*)?(\?.*)(\#.*)/g;
    let match = regex.exec(url);

    // lexer : tokenizer 한 결과를 객체에 넣기 + parser : 그 결과를 갖는 객체 바로 생성
    // 예외처리 하지 못했읍니다 ... 
    this.result = match[0];
    this.protocol = match[1]; // http://
    this.domainName = match[2]; // www.example.com
    this.port = match[3]; // :80
    this.pathFile = match[4]; // /path/to/myfile.html
    // this.file = match[5];
    this.parameter = match[6]; // ?key1=value1&key2=value2
    this.anchor = match[7]; // #SomewhereInTheDocument
}
 

let example = new Parse('http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument');
let naver = new Parse('https://naver.com:8000/aaa/bbb/ccc.html?key1=value1&key2=value2#anchor');
console.log(naver);
console.log(example);
