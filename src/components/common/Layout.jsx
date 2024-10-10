import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MaskText from './MaskText';
import Mask from './Mask';
import SplitText from './SplitText';

export default function Layout({ title, children }) {
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');
	
	//리액트쿼리, 리액트 컨텍스트 (10월 16일 수요일까지)
	//파이썬 장고 3주 동안 , 프레임웍이라서 그대로 붙여넣으면 동작한다, 게시판 CRUD ,restAPI 리액트로 만든것을 게시글로 등록 (2주반 동안 진행)

	return (
		<>
			<main className={isDetail ? 'detail' : title.toLowerCase()}>
			

				<SplitText delay = {0.5}>{title}</SplitText>
				
			
				{/* 순서 3 : 텍스트 타이밍 모션 끝날 시점에 첫줄 텍스트 마스크 모션 시작 */}
				<MaskText delay={1} color={'#444'} style={{fontSize:20 , fontWeight:'normal', fontFamily:'arial'}}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero tenetur quo cumque nostrum, asperiores corporis.
				</MaskText>
				<br/>

				{/* 순서 4 : 윗줄의 텍스트 마스크 모션 끝날 때 둘째줄 텍스트 마스크 모션 시작 */}
				<MaskText delay={1.5} color={'#222'} style={{marginBottom : 120}}>
					Lorem, ipsum dolor.
				</MaskText>
				
				{/* 순서 5 : 두번째 마스크 모션 끝날 때 즈음 전체 컨텐츠 영역 위쪽으로 페이드인 시작 */}
				<motion.section 
				initial={{opacity : 0, y : 200}}
				animate={{opacity : 1, y : 0}}
				exit= {{opacity : 0 , y : 200, transition : {delay:0} }}
				transition={{duration:1, delay:1.5 , ease:'linear'}}>
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
			{/*다른 요소와는 다르게 전체 페이지를 덮을 때에는 Mask 요소가 브라우저를 기준으로 위치가 배치되어야 하므로 fixed 속성으로 변경 */}
			{/* 순번 1 : 페이지 전환시 */}
			<Mask duration={0.5} delay={0} style={{position : 'fixed'}}/> 
		</>
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
