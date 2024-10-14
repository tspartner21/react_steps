import { useRef } from "react";

export default function useThrottle(func , interval = 300){
    const ref_timer = useRef(null);

    return() => {
        //만약 setTimeout으로부터 반환받은 timer 값이 있으면 강제 중지하면서 아래쪽의 중복 setTimeout호출방지
        if(ref_timer.current) return;

        //setTimeout이 실행되자마자 timer에 반환값 담음
        ref_timer.current = setTimeout(()=>{
            //무조건 interval시간 이후에 연결된 콜백 함수 호출됨
            func();

            //콜백함수 호출시 타이머값 제거해서 setTimeout 다시 호출할 수 있도록 처리
            ref_timer.current = null;
        }, interval);
    };
}

/*
특정 함수를 인수로 받아서 throttle 기능을 적용처리해서
전달된 원본 함수에 기능을 확장해서 새로운 함수를 반환처리(고차함수 : HOF : High Order Function)

useThrottle 로직 최종 처리
- 처음 setTimeout이 한번 실행 즉시 반환값을 timer에 담음
- 반복되는 setTimeout요청이 들어와도 상단에 있는 if문에 의해서 무시됨()
- throttle은 이벤트의 발생자체를 막는 것이 아닌, 이벤트에 연결되어 있는 핸들러 함수의 호출자체를 줄임

*/