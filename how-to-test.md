## Province 클래스 생성

## sample json data 생성

## TEST 1.
픽스처 설정
픽스처의 속성 검증 (shortFall)
픽스처의 속성 검증 (profit)

## TEST 2.
경계 조건 검증
producers 배열 length === 0일 경우, demand === 0 또는 demand < 0 과 같은 경우 등을 검증하다보면 특이 케이스를 발견하기 쉬워진다. (예를 들어 수요가 음수라는 성립 자체가 불가능한 케이스)

* producers 배열에 문자열을 대입해서 테스트 해본다.
    * 당연히 ```doc.producers.forEach is not a function``` 에러 발생
    * 테스트 프레임워크에 따라 테스트 실패 / 에러로 간주될 수 있다.
    * 테스트 실패는 검증 과정에서 값이 예상 범위를 벗어난 것을 의미한다.
    * 에러는 설정이나 코드레벨에서의 예외 상황 (syntax, reference error 등등)을 의미한다.

경계 조건 검증을 하다보면 다양한 실패/에러 케이스를 마주하고 이에 대해 보다 사용자 친화적인 예외처리를 구현할 수 있다.