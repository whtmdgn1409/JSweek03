var Tree = (function() {
  function Tree() { // Tree 객체
    this.count = 0;
    this.root;
  }
  function Node(data) { // Node 객체
      this.data = data;

    // DOM tree를 위함
      this.type;
      this.tagName;
      this.attributes;
      this.children; //Node[] 형
  }

  Tree.prototype.add = function(data) { // 추가. 0일경우 root가 되고 그 외에는 insert하여 값의 크기별로 트리 생성
    var node = new Node(data);
    if (this.count == 0) {
      this.root = node;
    } else {
      _insert(this.root, node);
    }
    return ++this.count;
  };
  return Tree;
})();





// var DOMtree = new Tree('<html><head><title>Sample Pate</title></head><body><p>Hello world!</p></body></html>');

var doc = "<html><head><title>Sample Pate</title></head><body><p>Hello world!</p></body></html>";
var regex = /\<+\w*\>/g;

console.log(regex.exec(doc)[0]);
console.log(regex.exec(doc)[0]);
console.log(regex.exec(doc)[0]);
console.log(regex.exec(doc)[0]);
console.log(regex.exec(doc)[0]);

// 저의 원래 생각은.. 
// 1. tokenizer : <~~>의 코드를 만나면 그 꺾쇄표시 안에있는 string을 객체의 tagName으로 받으면서, 그 태그별로 쪼갭니다. 
// 2. lexer : 쪼개진 태그들을 객체화(의미부여) 시킵니다.
// 3. parser : 그 결과를 갖는 객체들을 조직화합니다. (child, link)
// 이렇게 진행하려고 했으나.. 쉽지않았습니다 ... 개념을 익히는데만 시간이 엄청나게 걸렸고.. 