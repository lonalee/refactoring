## A Steps

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

#### 3. volumCredits 계산 코드 추출하기
#### 4. format 함수로 추출하기
#### 5. volumCredits 누적 코드 함수로 추출하기
적립포인트 계산만을 위한 루프 추가 -> <br>
바로 파이프라인으로 작성 + "문장 슬라이드 하기" 적용 -> <br>
해당 로직을 별도 함수로 추출 (getTotalVolumeCredits)

#### 6. totalAmount
위 순서와 유사하다.

## B Steps
#### 1. 계산 단계와 포맷팅 단계를 분리
#### 2. 중간 매개체 생성 (statementData)
2-1. 고객정보 옮기기  
2-2. 공연정보 옮기기
#### 3. 공연료 계산기 만들기
3-1. **enrichPerformance** -> amountFor(), volumeCreditsFor()  
3-2. **amountFor(), volumeCreditsFor()**, 이 두 함수를 전용 ***클래스***로 옮긴다. 
```
const calculator = new PerformanceCalculator(perf)
```
3-3. 기존 함수에서 몇 가지 동작을 클래스로 옮겨본다. (메소드화)  
3-3-a. 공연료 계산 코드 (amountFor함수)를 클래스 안으로 이동  
- getter로 메소드 정의 **?** --> get amount는 클래스로 인스턴스 생성 시 계산되어서 일반적인 프로터티와 동일하게 접근한다. (not callable)
```
public get amount() : string|number {
  ...
}
...
function amountFor(perf) {
  return new PerformanceCalculator(perf,playFor(perf)).amount 
  // 메소드 리턴
}
```

3-4. 공연료 계산기를 다형성 버전으로 만들기  
  3-4-a. 팩토리 함수 정의 (createPerformanceCalculator)  
  팩토리 함수는 슈퍼클래스의 인스턴스를 리턴할 뿐이다. ->  
  연극 장르별 amount 분기 로직을 팩토리 함수로 이동해서 장르별 서브클래스 인스턴스를 생성한다. (계산 완료)  
  3-4-b. 2개의 서브클래스 생성  
  각 장르에 대한 요금을 계산한다.(+크레딧 계산 또한 코미디 장르에서 차이가 있으므로 comedyCalculator에만 volumeCredits메소드를 추가한다. -슈퍼클래스의 메소드를 오버라이드 하도록 한다-)  
   서브클래스들은 슈퍼클래스의 프로퍼티를 상속 받기 때문에 다른 부분은 이동 시킬 필요가 없다.