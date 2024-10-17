import {createContext , useContext , useState } from 'react';

/*
    해당 파일에서 export할 요소 정리
    state라는 전역 상태값이 담길 공간 생성 후 export
    Provider - store 에 있는 정보값을 공유할 수 있도록 루트 컴포넌트인 App에 전역 상태값을 전달해주는 Wrapping 컴포넌트
    전역데이터 사용 커스텀 훅 - 모든 컴포넌트에 전역에 등록된 상태값을 자유롭게 접근할 수 있도록 usecontext를 활용한 커스텀 훅 export
*/

//모든 자식 컴포넌트들이 사용할 전역 실행 상태 값이 담길 공간 생성
export const GlobalContext = createContext();


//해당 전역 실행 컨텍스트를 전달할 Wrapping 컴포넌트 생성
export function GlobalProvider({children}){
    const [ModalOpen ,setModalOpen] = useState(false);
    const [MobileOpen , setMobileOpen] = useState(false);
    return (<GlobalContext.Provider value={{ModalOpen , setModalOpen , MobileOpen , setMobileOpen}}>{children}</GlobalContext.Provider>);
}

//위에서 전달하는 전역 상태 값을 자식컴포넌트에서 가져오기 위한 실제적인 커스텀 훅 생성
export const useGlobalState = () => {
    const globalContext = useContext(GlobalContext);
    return globalContext;
}

/*
<copy & paste 활용시, 자가진단항목>
[useGlobalData 커스텀 훅] 
{1 : "crateContext로 생성되는 GlobalProvider는 모든 하위 컴포넌트에서 자유롭게 접근할 수 있는 전역 State 공간"}
{2 : "해당 파일에서 export 하고 GlobalProvider라는 컴포넌트는 전역 상태값을 App 하위에 전달해주는 개념 "}
{3 : "해당 파일에서 export하고 있는 useGlobalState라는 커스텀 훅은 자식 컴포넌트에서 전역 상태 값에 접근하기 위한 함수"}
{4 : "GlobalProvider로 App컴포넌트를 Wrapping해서 전역 상태값을 전달하고 있는 흐름 파악"}
{5: "각 서브 컴포넌트에서 useGlobalState로 원하는 전역 상태값을 가져와서 사용 및 변경함수 호출"}

[실제 작업 흐름 순서별로 파악]
{1 : "Gallery 컴포넌트에 Modal 컴포넌트를 열고 닫기 위한 전역 상태값 흐름 숙지"}
{2 : "MobileMenu 컴포넌트로 열고 닫기 위한 전역 상태값 흐름 숙지"}

[점심시간 동안 미리 정리하면 좋을 사항]
오후 1시에는 useReducer로 상태값 관리
- useContext 영상 숙지
- useReducer 영상 숙지

[점심 시간 이후에 진행할 내용]
- 해당 useContext로만 관리되고 있는 useGlobalState 훅을 useReducer를 추가 도입해서 기능 고도화
- useContext, useReducer 조합으로 클라이언트 사이드 데이터 전역 상태 관리할시의 문제점 파악
- 위의 문제점을 개선하기 위한 zustand 라는 관리 라이브러리 개념 정리
- zustand를 통한 클라이언트 사이드 데이터 관리 커스텀 훅 추가 생성


*/