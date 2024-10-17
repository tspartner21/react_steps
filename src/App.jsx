import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Home from "./components/main/Home";

import Gallery from "./components/sub/Gallery";
import Members from "./components/sub/Members";
import Posts from "./components/sub/Posts";
import Youtube from "./components/sub/Youtube";
import YoutubeDetail from "./components/sub/YoutubeDetail";
import Contact from "./components/sub/Contact";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MobileMenu from "./components/common/MobileMenu";
import { useGlobalState } from "./hooks/useGlobal";

export default function App() {
	const { store } = useGlobalState();
	// console.log(MenuState);
	const location = useLocation();


	return (
		
				<>
			
			
				<Header/>

				{/* <Intro/> */}
				{/* 라우터를 통한 컴포넌트 전환시, 이전 컴포넌트에서 모션이 동작되고 있으면, 해당 모션이 끝날때까지 컴포넌트 언마운트 시점을 지연처리 */}
				<AnimatePresence mode='wait'>
					{/* 라우터 이동시마다의 컴포넌트 고유값을 전달하기 위해서 각 컴포넌트마다의 path경로를 key로 지정 */}
					<Routes location={location} key={location.pathname}>
						<Route path='/' element={<Home/>}/>
						<Route path='/members' element={<Members/>}/>
						<Route path='/gallery' element={<Gallery/>}/>
						<Route path='/youtube' element={<Youtube/>}/>
						<Route path='/youtube/:id' element={<YoutubeDetail />}/> 
						<Route path='/contact' element={<Contact/>}/>
						<Route path='/posts' element={<Posts/>}/>		
					</Routes>
				</AnimatePresence>

				{store.isMenu && <MobileMenu/>}


				<Footer/>

				</>		
			
	);
}

/**
client side data 전역 상태관리
-클라이언트에서 생성된 데이터(state)를 부모 자식 상관없이 모든 컴포넌트가 접근 및 수정 요청을 해야될 필요가 발생
- 이때 useContext, useReducer를 조합해서 state값을 컴포넌트 외부에 store라는 전역공간을 생성하고 해당 전역 상태값을 reducer를 통해서만 변경요청
- 위 개념의 로직을 통합해서 라이브러리화 - Redux ,(Redux Saga[1위], Redux Thunk , Redux Toolkit[2위] , recoil) -> 차세대 React-Query 사용함

실제 전역 상태관리를 해야되는 경우는 언제인가?
- 모달창을 열고 닫기 위한 state 정보값을 모달컴포넌트 호출하는 모든 부모컴포넌트에 일일이 전역 상태값 생성(비효율적)
- 해결방법 : 전역 store 공간에 모달관리를 위한 state를 담아주고 해당 모달을 열고 닫아야 될때마다 매번 state생성이 아닌 전역 state정보값 변경 요청
 */
