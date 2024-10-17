import { FaBars, FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa';

import {Link, useLocation } from 'react-router-dom';
import { useGlobalState } from '../../hooks/useGlobal';

export default function Header() {
  const {MobileOpen ,setMobileOpen} = useGlobalState();

  const gnbArr = ['members', 'gallery', 'youtube', 'contact', 'posts'];
  const snsArr = [FaEnvelope, FaInstagram, FaYoutube];

  //리턴문 밖에서만 use사용가능함
	// const path = useLocation ();
	// console.log(path);

  

  const {pathname} = useLocation();

  return (
    	//메인전용 헤더에 변경되는 부분이 극히 적으므로 기존 header클래스를 베이스로 하고 메인페이지에서는 main클래스만 추가
   <>
     <header className={`header ${pathname === '/' && 'main'}` }>
      <h1>
         <Link to={'/'}>ALPACO</Link>
      </h1>
      {/*주석 하는 방법 */}
      <nav>
      <ul className='gnb'>
        {gnbArr.map((data, idx) => {
          return (
            <li key={idx} className={pathname === '/' + data ? 'on' : ''}>
              <Link to={'/' + data}>{data.toUpperCase()}</Link>
            </li>
          );
        })}
      </ul>
    
         <ul className="sns">
           {/*화살표 함수 특성상 JSX 반환시 {return}문은 생략 가능 */}
           {snsArr.map((Data,idx)=>(
               <li key={idx}>
               
               <Data />  
               {/* 대문자로 해야 컴포넌트임, 소문자로 하면 리액트에서 태그로 인식 */}
             </li>
    
             ))}
    
         </ul>
      </nav>
        {/* 순서 2 - 모바일 호출 */}
        <span className='btnMobile' onClick={() => setMobileOpen(!MobileOpen)}>
        <FaBars/>
      </span>
    

     </header>

    
   </>

  )
}

/*
미션 
Header 컴포넌트에서 모바일 메뉴 토글 버튼 클릭시
common MobileMenu 컴포넌트를 토글 형식으로 열리고 닫히도록 처리
Modal.jsx 작업 흐름을 참고해서 제작
framer-motion를 이용해서 왼쪽 슬라이딩 되는 모션까지 추가
*/
