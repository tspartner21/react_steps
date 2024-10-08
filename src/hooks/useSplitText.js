
    //컴포넌트는 반환함수 , 훅은 기능함수
    //훅에서 함수를 리턴하는 이슈
    //여러 컴포넌트에서 동시다발적으로 호출해야 되는데
    //특정 컴포넌트마다 호출될때 필요한 고유 정보값을 계속 유지해야됨
    //클로저 환경 필요
    //함수 안쪽에 지역변수를 만들고 그 지역변수를 활용하는 함수를 리턴하면
    //렉시컬 스코프 환경이 설정됨
    //렉시컬 스코프 환경 : 안쪽의 지역변수가 계속 값이 유지되는 현상

    export default function UseSplitText(){
    //내부적으로 current값을 직접 추출하기 때문에 호출시 참조객체명만 전달
    return (ref, interval=0 , delay = 0) => {
        //인수로 전달받은 참조객체안의 요소의 텍스트만 가져옴
        let text = ref.current.innerText;
        //동적으로 생성될 태그문자열이 담길 빈 변수 생성
        let tags = '';
        let count = 0; //글자 잘라서 표시

        //문자열을 반복돌면서 동적으로 <span>으로 감사면서 문자열 쌓아나감
        for(let letter of text){
            tags += `<span style='display:inline-block;transition-Duration:0.5s; transition-delay:${
                count*interval + delay
            }s'>${letter}</span>`;
            count++;
        }
        //tag문자열이 완성되면 ref참조 요소 안쪽에 변경된 문자열 DOM구조 바꿔치기
        //기존 신입은 hook 쓰기도 어려워함, 커스텀훅을 쓰는 것을 보여주면, 주도적 개발자로 보여줌
        ref.current.innerHTML = tags;

 		//매번 호출하는 부모 컴포넌트에서 on을 추가하는 구문이 번거로우므로
		//훅 자체적으로 해당 요소 자체에 on을 추가
		setTimeout(() => {
			ref.current.classList.add('on');
		}, 100);
	};
}
/*
  setTimeout의 delay값을 0으로만 줘도 연결된 콜백함수는 web api실행 후
  task queue를 거쳐 callstack으로 넘어가게 됨
  따라서 해당 코드는 ref.current.innerHTML = tags; 실행된뒤 호출됨 (동기화됨)

  그럼에도 불구하고 100이라는 지연시간을 준 이유는
  동기화 시점이 innerHTML로 동적 요소를 넣는 호출 시점일 뿐
  실제 동적으로 DOM이 최종 생성된 시점 이후를 보장하진 않기 때문에
  물리적으로 실제 돔으로 변환될 약간의 시간을 확보하기 위함
*/
