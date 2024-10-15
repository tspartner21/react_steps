import { FaBars, FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa';
import {Link, useLocation } from 'react-router-dom';

export default function Header() {
  const gnbArr = ['members', 'gallery', 'youtube', 'contact', 'posts'];
  const snsArr = [FaEnvelope, FaInstagram, FaYoutube];

  //리턴문 밖에서만 use사용가능함
	// const path = useLocation ();
	// console.log(path);

  const {pathname} = useLocation();



  return (
    	//메인전용 헤더에 변경되는 부분이 극히 적으므로 기존 header클래스를 베이스로 하고 메인페이지에서는 main클래스만 추가
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

     <FaBars className='btnMenuToggle'/>
    </header>
  )
}
/*
 <li><Link to={'/members'}>MEMBERS</Link></li>
            <li><Link to={'/gallery'}>GALLERY</Link></li>
            <li><Link to={'/youtube'}>YOUTUBE</Link></li>
            <li><Link to={'/contact'}>CONTACT</Link></li>
            <li><Link to={'/posts'}>POSTS</Link></li>


            <li>
          <FaYoutube />
          </li>
          <li>
            <FaInstagramSquare/>
          </li>
          <li>
            <FaEnvelope/>
          </li>
*/

