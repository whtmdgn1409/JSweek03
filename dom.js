function textNode(html, cursor, cur) {
  const idx = html.indexOf("<", cursor);
  cur.push({ type: "textNode", value: html.substring(cursor, idx) });
  return idx;
}

function elementNode(content, cur) {
  const [tagName, ...attributes] = content.split(" ");

  cur.push({
    type: "elementNode",
    tagName,
    attributes: attributes.reduce((result, attribute) => {
      const [key, value] = attribute.split("=");
      Object.assign(result, { [key]: value });
      return result;
    }, {}),
    children: []
  });
}

function dom(html) {
  const length = html.length;
  let index = 0;
  const result = { tagName: "ROOT", type: "node", children: [] };
  let cur = result.children;
  let back;
  while (index < length) {
    if (html[index] === "<") {
      const idx = html.indexOf(">", index);

      if (html[index + 1] === "/") {
        cur = back;
      } else {
        if (html[idx - 1] === "/") {
          const content = html.substring(index + 1, idx - 1);

          elementNode(content, cur);
        } else {
          const content = html.substring(index + 1, idx);

          elementNode(content, cur);
          back = cur;
          cur = cur[cur.length - 1].children;
        }
      }

      index = idx + 1;
    } else {
      index = textNode(html, index, cur);
    }
  }
  return JSON.stringify(result, null, 2);
}

// console.log(
//   dom(
//     "<html> <head> <title>자바스크립트 실행 컨텍스트와 스코프</title> </head> <body> <header> <h1>자바스크립트의 실행 컨텍스트와 스코프</h1> </header> <nav> <ul> <li>실행 컨텍스트</li> <li>스코프</li> </ul> </nav> <main> <ariticle> <h2>실행 컨텍스트</h2> <section> <p> 실행 컨텍스트란 자바스크립트 코드가 실행되고 연산되는 범위를 나타내는 추상적인 개념이다. </p> <p> 자바스크립트 엔진이 코드를 실행하기 위해서는 다음과 같은 정보를 알고 있어야한다. </p> <ul> <li>변수, 함수</li> <li>변수의 유효범위</li> <li>this</li> </ul> <p> 현재 코드가 실행되고 있는 범위에서 필요한 정보들을 관리해 주는 것이 실행 컨텍스트 이다. 실행컨텍스트의 종류에는 3가지가 있지만 현재는 두가지가 사용된다. </p> <ul> <li>Global Execution Context : script태그를 만날때 생성</li> <li>Functional Execution Context : 함수 호출 시 생성</li> <li><del>Eval Function Execution Context</del></li> </ul> </section> <section> <h4> 전역컨텍스트 </h4> <ul> <li>Variable Object : 변수 (전역변수, 전역함수)</li> <li>Scope Chain : [window]</li> <li>this : window</li> </ul> <h4> 함수컨텍스트 </h4> <ul> <li> Variable Object : 변수 (지역변수, 지역함수), 인자 (arguments) </li> <li>Scope Chain : [해당 함수의 활성화 객체, 전역 객체]</li> <li>this : window</li> </ul> <p>this는 new 키워드를 이용해 변경할 수 있다.</p> </section> <section> <h3>스코프</h3> <p> 현재 코드에서 접근 가능한 유효범위를 뜻한다. 현재 코드가 실행할 때의 컨텍스트가 유효한 범위를 뜻한다. 따라서 자바스크립트의 스코프는 전역 스코프와 함수 스코프로 나뉜다. </p> </section> </ariticle> </main> <footer> © 2019 닷제이에스 </footer> </body> </html>"
//   )
// );

console.log(dom("<html><head><link href=''/></head><body>aa</body></html>"));
