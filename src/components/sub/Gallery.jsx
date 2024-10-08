import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';

export default function Gallery() {
    console.log('Gallery Component renderd!');
	const [Flickr, setFlickr] = useState([]);
    const [ModalOpen, setModalOpen] = useState(false);
    //클릭한 목록요소의 순번을 상태 저장
    const [Index, setIndex] = useState(0);
    
    
    
    
    
	console.log(Flickr);

	useEffect(() => {
		const method = 'flickr.people.getPhotos';
		const flickr_api = import.meta.env.VITE_FLICKR_API;
		const myID = '197119297@N02';
		const num = 10;
		const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				setFlickr(json.photos.photo);

			});
	}, []);

    //의존성 배열에 ModalOpen 상태값을 연결해서 모달창이 열리고 닫힐때마다
    //body요소의 스크롤바 기능 여부를 분기처리 DOM을 제어하는 방식이 아닌 State의 변경에 따라 간접적으로 기능이 구현되는 패턴을 주로 사용
    //위와 같이 state에 따라 UI의 기능화면이 변경되는 로직의 패턴을 사용하면
    //복잡한 대단위 프로젝트에서 state상태값만 관리하면 되기에 업무 채산성, 효율성이 올라감
    //정리 : 리액트는 HTML, JS작업방식처럼 직접적
    useEffect(()=>{
        document.body.style.overflow = ModalOpen ? 'hidden' : 'auto';
    },  [ModalOpen]);
     
    return(

     <>
          <Layout title={'GALLERY'}>
           <section className='galleryList'>     
            {/*            
        미션
        클릭이벤트가 발생하는 각각의 article 요소에 모달안에 출력되어야 되는 큰이미지 url정보값을 속성값 이용해 숨김
        아티클 요소 클릭하는 순간 미리 숨겨놓은 이미지 url정보값을 Modal 안쪽에 Pic 컴포넌트 호출하면서 src 속성 전달
        

        모델 안에 반복 이벤트가 발생한 순번의 요소의 정보를 클릭하는 패턴
        1. 순서값을 저장할 상태값 생성
        2. 반복 요소에 이벤트 발생시 이벤트가 발생한 요소의 순서값을 상태값에 저장
        3. 모달 안쪽에서 출력해야 되는 정보를 순서 상태값에 연동처리
        */}
            {Flickr.map((data, idx) => {
                   return(
                       <article key={idx} onClick={()=>{
                        //해당 요소 클릭시마다 핸들러 함수 안쪽에서 ModalOpen, Index라는 2개의 상태값이 동시에 변경이 되지만, 실제 컴포넌트는 한번만 제렌더링됨
                        //리액트 18이전까지는 AutoBatching 기능이 지원안되어서
                        //같은 렌더링 사이클에서 복수개의 상태값 변경시, 변경되는 상태값의 갯수만큼 제렌더링됨
                        //리액트 18버전부터는 AutoBatching 기능 지원됨
                        //특정 렌더링 사이클에서 복수개의 상태값이 변경되더라도 해당 상태값들을 Batcing(그룹화)처리해 한번만 제런더링 처리
                        setModalOpen(true);
                        //각 이미지 목록 클릭시에 idx순번값을 Inderx상태값에 저장
                        setIndex(idx);
                       }
                       }>
                            <Pic
                                src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`}
                                className='pic' shadow
                            />
                            <h3>{data.title}</h3>
                        </article>
                   );
               })}
               {/* forEach 안해도 되고, 공식이다 map으로 반복돌려라 */}
           </section>
           
           </Layout>
            {/* 자식 컴포넌트인 모달 안쪽에서 부모인 ModalOpen 상태값을 변경해야 되기 때문에 상태 변경함수 
            부모에서 자식 컴포넌트에 전달해서 자식컴포넌트로 마운트 언마운트 제어 */}
           {ModalOpen && 
           <Modal setModalOpen={setModalOpen}>
                <Pic src={`https://live.staticflickr.com/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`} shadow />
               
           </Modal>}
     </>
    );
}
//    Pic 컴포넌트 src값으로 Flicker 전체 배열에서 Index 상태 순번의 정보값으로 _b접미사의 이미지 주소를 Pic에 전달해서 호출
/*
[리액트 70% 구현 로직 패턴]
useState, useEffect 훅을 활용해서 외부 서버데이터를 가져오고 컴포넌트에 렌더링하는 패턴
1. 외부데이터를 담을 State와 State 변경함수를 useState로부터 생성
2. 의존성 배열이 비어있는 useEffect구문 생성(서버 데이터는 컴포넌트 초기 렌더링시 한번만 가져오는 것이 일반적)
3. useEffect구문 안쪽에서 데이터를 요청 URL을 생성하기 위한 정보값 변수에 담기
4. useEffect구문 안쪽에서 완성된 요청 URL로 fetch 함수를 통해 데이터 요청
4-1. 만약 제대로 url 요청을 했음에도 불구하고 콘솔에러로 'not Valid JSON' 에러 뜰시 다음의 쿼리 옵션을 뒤에 추가 
4-2 &nojsoncallback=1&format=json;
5. fetch 함수의 then구문 안에서 전달받은 서버데이터로부터 배열만 뽑아서 미리 준비해놓은 State에 State변경함수로 담기
6. return문 안쪽에서 State값을 map으로 반복돌며 원하는 혀앹의 JSX로 출력

*잘되면 스트레스 받는 것은 뇌에서 무엇을 하려는 정상적인 것, 안 받는 것이 문제다
*/

