import { useEffect } from "react";
import {motion} from 'framer-motion';
import useThrottle from "../../hooks/useThrottle";
import { useZustandStore } from '../../hooks/useZustand';

export default function MobileMenu() {
	console.log('mobileMenu');
	const setMenuClose = useZustandStore(state => state.setMenuClose);

    const { initial, animate, exit, transition } = {
		initial: { x: -300, opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: -300, opacity: 0 },
		transition: { duration: 0.5 }
	};


    const closeMenu = () => {
        console.log('closeMenu');
        if(window.innerWidth >= 1000)  setMenuClose();
    };



    const throttledCloseMenu = useThrottle(closeMenu);

    useEffect(()=>{
        window.addEventListener('resize' , throttledCloseMenu);

        
        return () => window.removeEventListener('resize' , throttledCloseMenu);
        
    },[throttledCloseMenu]);
   
    return (
        <>
            <motion.aside className='mobileMenu' onClick={setMenuClose} initial={initial}  animate={animate} exit={exit} transition={transition} >MobileMenu 
                
            </motion.aside>   
            
        </>

    );
}

/*
모바일 배경을 효율적으로 관리하기 위해서 다음의 순서로 작업 진행
- 모바일 패널과 호출 버튼을 MobilePanel(MobileMenu) 이라는 컴포넌트안에 모두 추가
- motion.aside  라는 모바일 패널 자체가 컴포넌트 언마운트시에도 모션 끝날때까지 기다리기 위해 AnimatePresence 로 감싸줌
- btnTo
*/