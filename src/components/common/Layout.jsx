import { useLocation } from 'react-router-dom';
import UseSplitText from '../../hooks/useSplitText';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Layout({ title, children }) {
	//커스텀훅으로 핸들러함수 안쪽에서 호출할 수 있는 실제 사용가능한 함수 반환받음
	const ref_title = useRef(null);
	const splitText = UseSplitText();
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');

	useEffect(()=>{	
		//전달한 인수가 3개 이상일때는 객체형식으로 전달	
		splitText(ref_title, {interval:0.1});
	},[]);

	return (
		<main className={isDetail ? 'detail' : title.toLowerCase()}>
			<h1 ref={ref_title}>{title}</h1>
			<motion.section initial={{opacity : 0, y : 200}}
			animate={{opacity : 1, y : 0}}
			exit= {{opacity : 0 , y : 200, transition : {delay:0} }}
			transition={{duration:1, delay:0.7}}>
			{children}
			</motion.section>
			{/* <motion.h1
				initial={{ x: -200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ scale: 2, opacity: 0, transition: { duration: 0.3 } }}
				transition={{ duration: 1, ease: 'easeIn' }}>
				{title}
			</motion.h1> */}

			
		</main>
	);
}

/*
	motion 컴포넌트에서 자주 쓰는 스타일 속성
	x: 가로축 이동 (숫자, 퍼센트는 문자열 처리)
	y: 세로축 이동
	scale:확대
	rotate: 회전
	opacity: 투명도
*/
