# 웹브라우저 동작 원리

## 최신 브라우저의 내부 살펴보기

- [브라우저는 어떻게 동작하는가](https://d2.naver.com/helloworld/59361)

- [최신 브라우저의 내부 살펴보기 1 - CPU, GPU, 메모리 그리고 다중 프로세스 아키텍처](https://d2.naver.com/helloworld/2922312)
- [최신 브라우저의 내부 살펴보기 2 - 내비게이션 과정에서 일어나는 일](https://d2.naver.com/helloworld/9274593)
- [최신 브라우저의 내부 살펴보기 3 - 렌더러 프로세스의 내부 동작](https://d2.naver.com/helloworld/5237120)
- [최신 브라우저의 내부 살펴보기 4 - 컴포지터가 사용자 입력을 받았을 때](https://d2.naver.com/helloworld/6204533)

## 네비게이션

### URL 파서

- 브라우저의 주소 표시줄에 URL을 입력하면 브라우저는 URL을 알맞은 형식으로 파싱을 한다.
  [url의 구조](https://developer.mozilla.org/ko/docs/Learn/Common_questions/What_is_a_URL)

- url이 string으로 들어오면 url구조의 형태를 띄는 객체를 반환하는 함수를 작성한다. 내부 함수는 정규표현식을 이용해서 작성한다.
- 객체를 반환하기 때문에 prototype을 이용한 생성자 함수로 작성한다.
- 생성자 함수는 tokenizer > lexer > parser 3가지 함수로 크게 골격을 잡는다.
- 3가지 함수는 prototype을 이용해 내부 메서드로 작성한다.

## 랜더링

### DOM tree

- 자바스크립트의 실행컨텍스트와 스코프에 대한 html 파일을 string으로 입력받아 HTML 의 DOM tree를 생성하는 함수를 작성한다.
