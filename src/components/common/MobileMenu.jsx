import { useGlobalState } from "../../hooks/useGlobal";

export default function MobileMenu(){


// const closePanel = () => {
//     console.log('closePanel');
//     window.innerWidth >= 1000 && setMobileOpen(false);
// };


// useEffect (()=> {
//     window.addEventListener('resize', closePanel);
//     return () => window.removeEventListener('resize' , closePanel);
// }, [])

  
    const {dispatch} = useGlobalState();
   
    return (
        <>
            <aside className='mobileMenu' onClick={()=>dispatch({type : 'CLOSE'})}>MobileMenu </aside>   
        </>

    );
}

/*
모바일 배경을 효율적으로 관리하기 위해서 다음의 순서로 작업 진행
- 모바일 패널과 호출 버튼을 MobilePanel(MobileMenu) 이라는 컴포넌트안에 모두 추가
- motion.aside  라는 모바일 패널 자체가 컴포넌트 언마운트시에도 모션 끝날때까지 기다리기 위해 AnimatePresence 로 감싸줌
- btnTo
*/