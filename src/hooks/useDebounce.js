import { useRef, useState } from "react";

export default function useDebounce(state, interval = 500){
    const [Debounced , setDebounced] = useState(state);
    const ref_timer = useRef(null);

    //interval 시간이 끝나기도 전에 새로운 state가 전달되면
    //clearTimout으로 반환값이 초기화
    //clearTimout으로 timer값을 제거가 아닌 초기화처리하면 연결된 interval 시간도 초기화됨
    clearTimeout(ref_timer.current);

    //위의 clearTimeout에 의해서 interval 시간이 계속 초기화되면,
    //연결된 콜백함수의 호출이 계속해서 연기됨(초기화됨)
    //결국 해당 로직을 통해서 만약 기존 state 변경 요청이 0.5초가 끝나기 전에 추가요청이 들어오면 계속 해당 시간을 초기화시키면서 새로운  state 값 변경을 계속 지연 
    //0.5초 동안 새로운 요청이 들어오지 않으면 0.5초 뒤에 해당 콜백 함수 호출
    ref_timer.current = setTimeout(() => {
        setDebounced(state);
    },interval)

    // console.log(`debounce {Debounced}`);
    return Debounced;
}

/*
useDebounce의 로직 정리 및 사용목적
- 인수로 특정 상태값 전달받음
- 내부적으로 setTimeout 호출해서 interval 시간 뒤에 콜백 함수 호출
- 이때 interval이 끝나기 전 추가적인 이벤트 발생하면 interval 시간을 초기화해서 계속 연결된 콜백함수 호출 미룸
- interval이 끝날동안 추가적인 이벤트 발생없으면 비로소 콜백함수 호출해서 새로운 상태값 반환

useDebounce 사용 목적
- 특정 시간 동안 이벤트가 계속 발생하고 있으면 미리 설정한 시간동안 발생하는 모든 이벤트 요청을 지연시켜서
- 반복적인 이벤트가 끝나야지만 최종적으로 제일 마지막 이벤트만 요청받아 특정함수 호출

useDebounce 의 실사용예
- input에 값을 변경할때마다 연결된 함수를 계속 호출하는 것이 아닌, 입력이 다 끝난 이후에 연결된 함수를 한번만 호출하고 싶을때
- 만약 연결된 함수가 서버 데이터를 fetch 해야되는 무거운 로직의 함수일경우 꽤 높은 성능 향상을 유지할 수 있음
*/