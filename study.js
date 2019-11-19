a = { a:10 };
a.b =20;
Object.assign(a, {c:20, d:40});

const [a,b,c] = [1,2,3];
switch(true){
    // case ...
    // case ...
    // case ...
    // default: ... 
    //통과 못하는 경우가 있으니까 항상 디폴트문을 써준다
}
// 병렬처리는 스위치를 쓰자 

// trim() -> 양끝의 빈 문자열을 다 날려주는 함수