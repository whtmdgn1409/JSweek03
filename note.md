# week 03
## URL 파서
1. Protocol
```
^(https?):\/\/
```
- `^(문자열)` : 문자열의 시작과 일치 할 때
- `?` : 바로앞에오는 문자가 존재할수도, 존재하지 않을 수도 있음. (https, http를 모두 가져오기 위함)
- `\/` : `\`가 메타문자를 문자열에서 찾고싶을 때 사용! `\/` == `\`
2. Domain
```
([^:\/\s]+) // 그냥 모든 문자열을 찾음
```
- `.`, `-`을 비롯한 문자들로만 구성된다.
- `^` : 대괄호 안에 존재할때는 부정, 대괄호 밖에서는 문자의 시작을 표현. 여기서는 대괄호 안에 존재하므로 http(protocol) 다음을 보니까, port 번호가 나오기 전까지를 체크한다.
- `+` : 앞에 존재하는 문자가 1번 이상 반복될 때! 
- `\s` : 공백문자 또는 영문
3. PORT
```
(:([^\/]*))?
```

4. pathFile
```
((\/[^\s/\/]+)*)?
```

5. Parameter
```
\/([^#\s\?]*)
```

6. Anchor
```
(#(\w*))?
```

7. 그리고 문자열의 마지막에 끝표시인 `$`을 붙여준다.
자바스크립트에서 쓰고싶다면, 정규식 리터럴을 써준다. `/ /`
global으로 설정하고싶다면 g를 추가. 
```
^(https?):\/\/([^:\/\s]+)(:([^\/]*))?((\/[^\s\/]+)*)?(\?.*)(\#.*)
```







# 자바스크립트의 Prototype
### Object란? 
자바스크립트는 객체기반의 스크립트 언어이고, `key :value`로 구성된 property들의 집합이다. 
그리고 객체는, 데이터를 의미하는 Property와 데이터를 참조하고 조작할수있는 동작을 의미하는 Method(Property값이 함수인 경우)로 구성된 집합이다. 

자바스크립트 객체는 객체지향의 상속을 구현하기 위해 `prototype`이라고 불리는 객체의 프로퍼티, 메소드를 상속받을 수 있다. 

1. 객체 리터럴
```
let student = {
    name: 'pong',
    score: 100,
    sayHello: function () { console.log('hello' + this.name)}
}

student.sayHello();
```
사실 자바스크립트 엔진은 객체 리터럴로 객체를 생성하는 코드를 만나면 내부적으로 object 생성자 함수를 사용하여 객체를 생성한다. 

2. Object 생성자 함수
```
let person = new Object;

person.name = 'pong';
person.score = 100;
person.sayHello = function () { console.log('hello' + this.name)}

console.log(typeof person);
console.log(person);

person.sayHello();

```

3. 생성자 함수
생성자함수를 사용하면 객체를 생성하기 위한 클래스처럼 사용하여 프로퍼티가 동일한 객체 여러개를 간편하게 생성이 가능하다!
```
function Person(name, gender) {
    this.name = name;
    this.gender = gender;
    this.sayHello = function() {
        console.log('Hi! my name is ' + this.name);
    };
}

let person1 = new Person('Pong', 'female');
let person2 = new Person('Gyoo', 'male');

console.log(person1);
console.log(typeof(person1)); 
console.log(person2);

```
그리고 `this`로 바인딩 되어있는 것은 `public`, 생성자 함수 내에서 선언된 일반 변수는 `private`이다.

### prototype property 의 존재 유무
```
function Person(name) {
  this.name = name;
}

var foo = new Person('Lee');

console.dir(Person); // prototype 프로퍼티가 있다.
console.dir(foo);    // prototype 프로퍼티가 없다.
```


## this
java와 c++과는 달리, 인스턴스 자신을 가리키는 참조변수이다. 

## 프로토타입 객체
자바스크립트는 c++,  JAVA와같은 클래스 기반 객체지향 언어가 아닌, `프로토타입 기반 객체지향 언어`이다. 
클래스 기반 객체지향은 객체생성이전에 클래스를 정의 -> 이 클래스를 통해 인스턴스를 생성한다. 하지만 프로토타입 기반 객체지향은 `class-less`로 객체를 생성한다. 

자바스크립트의 모든 객체는 상속의 개념처럼, 부모 객체의 프로퍼티/메소드를 상속받아 사용할 수 있다. 이러한 부모객체를 `Prototype`(객체)라고 한다. 
이 프로토타입 객체는 생성자 함수에 의해 생성된 각각의 객체에 공유 프로퍼티를 제공하기 위해 사용된다. 

자바스크립트의 모든 객체는 `[[Prototype]]`이라는 **internal slot** 을 가지는데, 이 값은null 또는 객체고, 상속을 구현하는데 사용된다.
이 [[Prototype]]객체의 데이터 프로퍼티는 get 액세스를 위해 상속되어 자식객체의 프로퍼티처럼 사용이 가능하다. 
```
var student = {
  name: 'Lee',
  score: 90
}
console.log(student.__proto__ === Object.prototype); // true
```
이처럼 type이 같고, 객체를 생성할 때 프로토타입은 결정된다. 그리고 그 결정된 프로토타입 객체는 상속을 위해 다른 객체로 변경할 수도 있다.ㅎㅎ

```
*// [[Prototype]] : 객체의 입장에서 자신의 부모역할을 하는 프로토타입 객체를 가리키며 함수 객체의 경우 Function.prototype을 가리킨다.*
console.log(Person.__proto__ === Function.prototype);

*// prototype 프로퍼티 : 함수객체가 생성자로 사용될 때 이 함수를 통해 생성될 객체의 부모 역할을 하는 프로토타입 객체를 가리킨다.*
console.log(Person.prototype === foo.__proto__);

```


---
# parse
문자열의 구문을 분석


# tokenizer, laxer, parser
```
"[123, 45, 'hello']"
```

`tokenizer` : 의미있는 단위로 쪼갠다
```
[‘[‘, ‘123’, ’45’, “’hello’”, ‘]’]
```

`laxer` : 쪼개진 데이터에 의미 부여
```
[{type: 'LBracket', value: '['},
 {type: 'number', value: 123},
 {type: 'number', value: 45},
 {type: 'string', value: 'hello'},
 {type: 'RBracket', value: ']'}]

```

`parser` : 의미 부여한 데이터를 구조화 
```
{ type: 'array',
  child: 
   [ { type: 'number', value: 123, child: [] },
     { type: 'number', value: 45, child: [] },
     { type: 'string', value: 'hello', child: [] } 
    ] 
}
```

---

# DOM
웹페이지는 일종의 document이다. 이 문서가 웹브라우저를 통해 그 내용이 화면에 나타나거나, 그저 html 소스 자체로 나타나기도 한다. 이 웹브라우저와 관련된 집합을 브라우저 객체모델(BOM : Browser Object Model) 이라고 부른다. 이 BOM을 이용하여 브라우저와 관련된 기능으 ㄹ구성하는데, DOM은 BOM의 여러종류 중 하나다.

BOM의 최상위 객체는 window라는 객체로, DOM은 window객체의 하위객체이기도 하다. 

그렇다면 DOM은, Document Object Model으로, 문서 객체 모델이다. <html>, <body>같은 **html 문서의 태그를 자바스크립트가 이용가능한 객체로 만들면!! 그것이 DOM**이 되는 것이다! 풀어서 말해서 이렇지, 한마디로 `웹 브라우저가 HTML코드를 인식하는 방식이자 document객체와 관련된 객체의 집합`이다. 

### 구조
[dom 의 트리 구조](https://d2.naver.com/content/images/2019/04/helloworld-201904-sangwoo-ko_3-02.png)
tree형식의 자료구조로, root node 에서 시작하여 아래로 퍼저나가는 형태이다. 

---
# cpu, gpu, mem, 다중 ㅡ로세스 아키텍처
https://d2.naver.com/content/images/2019/03/helloworld-201903-sangwoo-ko_1-03.png
- CPU는 실행성능을 높이고 여러종류의 작업을 하나씩 순서대로 처리하며 대부분의 일을 처리한다
- GPU는 비교적 간단한 작업을 동시에 수행할 수 이쓰며 그래픽 작업 처리(빠른 렌더링, 상호작용)에 크게 관여한다. 
- 프로세스 : OS가 애플리케이션 하나 당 하나의 프로세스공간을 메모리에 만들어준다. IPC를 사용하여 두 프로세스 간 정보를 공유하여 작업 프로세스가 진행하지 않을 때 애플리케이션의 다른 부분을 실행하는 프로세스를 중지하지 않고도 응답하지 않는 프로세스를 다시 시작할 수 있다.
	- Browser Process
	- GPU Process
	- Renderer Process
	- Plugin Process
	- 이러한 다중 프로세스 아키텍처를 통해 크롬의 한 탭이 응답하지 않아도 다른탭은 살아남았다!
- 스레드 : 그 프로세스 내부에서 실행된다.


# 렌더러 
### 렌더러 프로세스
- 렌더러 프로세스는 웹 콘텐츠를 처리한다. Renderer Process의 main Thread가 브라우저로 전송되는 대부분의 코드를 담당하며 html, css, javascript를 웹페이지로 변환한다.
그리고 worker thread가 일부 자바스크립트코드를 변환한다. 그리고 compositer thread, raster thread가 렌더링을 부드럽게 하기위한 역할을 한다.

### DOM 구축
위에서 설명한 Renderer process의 main Thread는 html을 parsing 하여 DOM으로 변환하기 시작한다.
참고로, html문서는 xml문서와 다르게 오류가 존재하지 않는다. (Xml : 데이터 전송, html : 웹페이지 구현에 목적을 둔 코드)

### 하위 리소스(sub resource) 로딩
DOM을 구축하기위해 파싱하는동안 외부 리소스인 image, css, javascript를 만날때마다 메인 쓰레드가 하나하나 요청하면 너무 느리기 때문에, 속도를 위하여 `preload scanner`가 동시에 실행된다.
Html 문서에서 <img> 같은 태그를 만나면, 프리로드 스캐너가 바로 html파서가 생성한 토큰을 확인한후에 브라우저 프로세스의 네트워크 스레드에 request를 보내고 -> 리소스를 loading한다.

그 이후 css 스타일 계산을 하고,  페인트, ~~flex박스를 구현하며 많이 만져보았던~~ 레이아웃트리 또한 생성된다. 

### 합성 composite
브라우저는 웹페이지의 정보들을 화면의 픽셀로 변환하는 작업인 `rasterizing(래스터화)`를 거쳐 비로소 웹페이지에 우리가 볼수있는 형태로 문서를 띄워준다. 
합성은, `웹페이지의 각 부분을 layer별로 분리하여 -> rasterizing 하고 -> 컴포지터 스레드(composites thread) 에서 웹페이지로 합성`하는 과정이다. 
다시말해 웹페이지의 각 부분을 레이어로 분리하여 별도로 래스터화하고, 컴포지터 스레드라는 별도의 스레드에서 웹페이지로 합성한다! 그리고 스크롤하여 로드해야하는 레이어는 이미 래스터화는 되어있으므로, 새프레임을 합성하기만 하면 된다! 

특히나 배경과 위의 텍스트나 오브젝트들..을 다른 레이어에 두고 싶은 경우(예를들어 배경이 움직이고 글씨는 그대로라거나..) 합성에서 별도의 layer로 분리하여 rasterizing -> composites thread 한다.

---
# 컴포지터가 사용자 입력을 받았을 때
### 브라우저 관점에서 입력 이벤트
1. Browser Process가 가장 먼저 사용자 제스처를 수신한다. 하지만 이때 `(x,y)좌표`에서 `touchstart이벤트유형`이벤트가 발생함! 만 알 수 있어서,
2. Renderer Process가 내부의 컨텐츠를 처리한다. 이 안에서 이벤트 대상을 찾고, 해당 대상과 연결된 `event listner`을 실행하여 이벤트를 적절히 처리한다.
-> 이때, 컴포지터(스레드)가 입력 이벤트를 받아 메인스레드로 보내는데 가장 첫번째업무로  `hit test`를 진행한다. 
https://d2.naver.com/content/images/2019/04/helloworld-201904-sangwoo-ko_4-01.png

그렇다면 스크롤을 하여 새롭게 나타난 애니메이션을 화면주기(hz)에 맞춘다는등의 이벤트가 발생할 떄 마다 컴포지터 스레드가 메인스레드로 바로 전송을 한다고 했다. 그리고, 이벤트가 너무 많이 전송해야 할 경우 메인스레드로 이벤트 전송을 최소화한다.


