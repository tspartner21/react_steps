import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

export default function MobileMenu(){
const {initial , animate , exit, transition} = {
    initial : {x : -300 , opacity : 0},
    animate : { x: 0, opacity : 1},
    exit : {x : -300 , opacity : 0},
    transition : {duration : 0.5}
};

const closePanel = () => {
    console.log('closePanel');
    window.innerWidth >= 1000 && setMobileOpen(false);
};


useEffect (()=> {
    window.addEventListener('resize', closePanel);
    return () => window.removeEventListener('resize' , closePanel);
}, [])

         //모바일 메뉴는 초기값 false
const [MobileOpen, setMobileOpen] = useState(false);
   
    return (
        <>
            <button className='btnToggle' onClick={()=>setMobileOpen(!MobileOpen)}>
                <FaBars />
            </button>
            
            <AnimatePresence>
            {MobileOpen && (<motion.aside className='mobileMenu' initial={initial} animate={animate} exit={exit} transition={transition}>MobileMenu </motion.aside>)}           
            </AnimatePresence>
        </>

    );
}

/*
모바일 배경을 효율적으로 관리하기 위해서 다음의 순서로 작업 진행
- 모바일 패널과 호출 버튼을 MobilePanel(MobileMenu) 이라는 컴포넌트안에 모두 추가
- motion.aside  라는 모바일 패널 자체가 컴포넌트 언마운트시에도 모션 끝날때까지 기다리기 위해 AnimatePresence 로 감싸줌
- btnTo
*/