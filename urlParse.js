var url=`http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument`;

var parsedUrl = {
    protocol: '',
    domainName: '',
    port: '',
    filePath: '',
    parametes:'',
    anchor:''
};
parsedUrl.protocol=(/http*|ftp/.exec(url)[0]);
parsedUrl.domainName=(/(:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/.exec(url)[0]);
parsedUrl.port=(/:\d+/.exec(url)[0]);
parsedUrl.filePath=(/(\/[a-z0-9-%#?&=\w]+)/.exec(url)[0]);
parsedUrl.parametes=(/\?[a-z0-9-%?&=\w]+/).exec(url)[0];
parsedUrl.anchor=(/#[a-z0-9-%?&=\w]+/).exec(url)[0];
console.log(parsedUrl);

/* 잘모르겠습니다.. 정규식을 이해하다가 끝난 것 같습니다... */