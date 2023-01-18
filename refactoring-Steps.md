### Steps

#### 1. switch문 추출 (함수 추출하기 - 6.1)
for문 전체를 추출하려고 생각했으나, 함수가 하는 일을 최대한 명확하게 만들기 위한 목적으로 for문은 그대로 유지하고 내부 로직만을 추출한다. 
추후에 for문은 파이프라인으로 바꿀 수도 있다.

switch문의 역할은 장르(``play.type``)별 비용을 계산하는 것이다.
이 역할에 따라 함수를 명명한다. -> amountFor(aPerformance)

```
interface Performance {
  playID: string;
  audience: number;
}

export function amountFor(aPerformance:Performance) {
 ...switch문
}
```

switch문 이동시 사용하던 변수들(perf, play, thisAmount)은 유효범위를 잃게 된다. 

이들 중 매개변수로 전달 가능한 것들도 있고 그렇지 않은, 값이 변하는 변수(thisAmount)도 있다.
이런 변수는 추출하는 함수의 새로운 지역변수로 정의 및 초기화한다. (***바로 테스트***)

해당 지역변수는 외부 스코프(for문 스코프)로 리턴되어야 하며, 출력에 적합한 형식으로 가공, totalAmount 변수에 누적되어야 한다.

기존 thisAmount 변수로 amountFor의 리턴을 할당해서 필요한 연산을 수행한다. (***statement 함수 바로 테스트***)

#### 2. playFor 추출 (임시 변수를 질의 함수로 바꾸기 - 7.4)
아래 코드를 함수로 추출하였다.
```
const play = plays[perf.playID];
```

```
export function playFor(perf: Performance) {
  const play = plays[perf.playID];
  return play;
}
```

기존의 play 변수 자리는 playFor 함수로 아래와 같이 인라인 처리한다. (***바로 테스트***)

```
const thisAmount = amountFor(perf, playFor(perf));
```

``함수 amountFor``에서도 playFor 함수를 이용하여 변수를 인라인 처리할 수 있고, 전달되는 매개변수 갯수도 줄일 수 있다.