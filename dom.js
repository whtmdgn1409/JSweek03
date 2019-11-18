const input = `<html><head><title>Page Title</title></head><body><h1>This is a Heading</h1><p>This is a paragraph.</p></body></html>`;
let count = 0;
const arrayTags = [];
const len = input.length;

const domtree = {
  name: ``,
  level: 0,
  children: []
};

parsingTag(input);

function parsingTag() {
  for (let i = 0; i < len; i++) {
    if (input[i] === "<" && input[i + 1] !== "/") {
      //태그 이름찾기
      count += 1;
      if (count == 1) {
        domtree.name = findTagName(i);
        domtree.level = count;
      } else if (count > 1) {
        domtree.children.push({
          name: findTagName(i),
          level: count,
          children: []
        });
      }
    } else if (input[i] === "<" && input[i + 1] === "/") count--;
  }
}

function findTagName(a) {
  let cnt = 0;
  let start = a + 1;
  for (let j = a + 1; input[j] != ">"; j++) {
    //console.log(input[j]);
    cnt++;
  }
  //console.log(input.slice(start, start + cnt));
  return input.slice(start, start + cnt);
}

console.log(domtree);
