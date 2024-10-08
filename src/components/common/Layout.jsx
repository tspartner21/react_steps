import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import UseSplitText from '../../hooks/useSplitText';
import { useEffect, useRef } from 'react';

export default function Layout({ title, children }) {
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');

	//커스텀훅으로 핸들러함수 안쪽에서 호출할 수 있는 실제 사용가능한 함수 반환받음
	const splitText = UseSplitText();

	const ref_title = useRef(null);

	useEffect(()=>{
		splitText(ref_title);

	},[])

	return (
		<main className={isDetail ? 'detail' : title.toLowerCase()}>
			<h1 ref={ref_title}>{title}</h1>
			{/* <motion.h1
				initial={{ x: -200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ scale: 2, opacity: 0, transition: { duration: 0.3 } }}
				transition={{ duration: 1, ease: 'easeIn' }}>
				{title}
			</motion.h1> */}

			<section>{children}</section>
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
