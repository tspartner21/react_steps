import { useLocation } from 'react-router-dom';
import Mask from './Mask';
import SplitText from './SplitText';
import { useEffect } from 'react';

export default function Layout({ title, children }) {
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');
	console.log(pathname);

	let currentClass = '';

	//path명을 통해 레이아웃에 다른 클래스명 적용 (메인페이지에서만 전용 클래스명 적용)
	if(isDetail) currentClass = 'detail';
	else if (pathname === '/') currentClass = 'main';
	else currentClass = title.toLowerCase();
	
	//리액트쿼리, 리액트 컨텍스트 (10월 16일 수요일까지)
	//파이썬 장고 3주 동안 , 프레임웍이라서 그대로 붙여넣으면 동작한다, 게시판 CRUD ,restAPI 리액트로 만든것을 게시글로 등록 (2주반 동안 진행)

	//라우터를 통해 새로운 페이지 컴포넌트 마운트시 강제로 윈도우의 스크롤 위치값을 0으로 초기화
	useEffect(()=>{
		window.scrollTo({top:0})
	},[]);

	return (
		<>
			<main className={currentClass}>
			

				{pathname !== '/' && <SplitText delay = {0.5}>{title}</SplitText>} 
			
				<section>{children}</section>

			
				
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
