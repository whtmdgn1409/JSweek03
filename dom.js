const input = `<html><head><title>Page Title</title></head><body><h1>This is a Heading</h1><p>This is a paragraph.</p></body></html>`;
let count = 0;
const arrayTags = [];
const len = input.length;

parsingTag(input);

function parsingTag() {
  for (let i = 0; i < len; i++) {
    if (input[i] === "<") {
      //태그 이름찾기
      count++;
      //console.log(i, findTagName(i));
      arrayTags.push(findTagName(i));
    }
  }
  return arrayTags;
}

/*
function findTagName(st, a) {
  let cnt = 0;
  for (let j = a + 1; j < st.length && st[j] !== ">"; j++) {
    cnt++;
  }
  console.log(st.slice(a + 1, cnt + 1));
  return st.slice(a + 1, cnt + 1);
}
*/

function findTagName(a) {
  let cnt = 0;
  let start = a + 1;
  for (let j = a + 1; input[j] != ">"; j++) {
    console.log(input[j]);
    cnt++;
  }
  console.log(input.slice(start, cnt + 1));
  return input.slice(start, cnt + 1);
}
