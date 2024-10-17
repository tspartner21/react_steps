import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';
import Content from '../common/Content';
import { useFlickrQuery } from '../../hooks/useFlickr';
import { useGlobalState } from '../../hooks/useGlobal';

//미션 - 전역 상태 관리 훅으로 전역 상태관리를 가져온다음 모달창 제어
export default function Gallery() {
    const globalstate = useGlobalState();
    console.log(globalstate);

    const ref_gallery = useRef(null);
    const [ModalOpen, setModalOpen] = useState(false);
    //클릭한 목록요소의 순번을 상태 저장
    const [Index, setIndex] = useState(0);
    //순서 1 : {type : 'mine'}값으로 Type 상태값 초기화
    const [Type, setType] = useState({type : 'mine'});
    //순서1 - 갤러리 컴포넌트에 커스텀 훅 호출시 전달해야되는 옵션 객체를 인수로 전달해야되는 옵션 객체를 인수로 전달
    //처음 마운트시 위쪽의 상대값으로 data fetching 및 반환
    const { data : Flickr } = useFlickrQuery(Type);

    
    //Gallery 페이지에만 전용으로 동작할 커스텀 모션 객체 생성
    const customMotion = {
        init : {opacity : 0, x : 200},
        active : {opacity : 1, x : 0},
        end : {opacity : 0, x : -200 }

    };       

    const handleSearch = e => {
        e.preventDefault();
        if(!e.target[0].value.trim()) return alert('검색어를 입력해주세요');
        // console.dir(e.target);
        setType({type:'search', tag: e.target[0].value});
        e.target[0].value = '';
    };

	useEffect(() => {
        //현업에서는 사용자 인지 측면에서, 사용자 기대심리를 위해, isPending을 통해서 로딩바 보여주기
        //gallery type변경시 일단 갤러리 요소에 on을 제거해서 비활성화처리
        ref_gallery.current.classList.remove('on'); //내려갔다가 올라갈 시간 벌어주어야한다;5초지연
        //비활성화 트랜지션 모션시간 확보를 위해서 0.8초 뒤에 다시 on을 붙여서 활성화 처리 
        setTimeout(()=>{
            ref_gallery.current.classList.add('on');
        }, 800);
        
		
	}, [Type]);

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
				<Content delay={1.5} customMotion={customMotion}>
					<article className='controller'>
						<ul className='type'>

                            {/*className 을 조건처리할때는 &&연산자 사용불가, className에는 boolean이 아닌 문자값이 와야함 */}
							{/* <li onClick={() => setType({ type: 'mine' })} className={Type.type === 'mine' && 'on'}> */}
                            <li onClick={() => setType({ type: 'mine' })} className={Type.type === 'mine' ? 'on' : ''}>
								My Gallery
							</li>
							{/* <li onClick={() => setType({ type: 'interest' })} className={Type.type === 'interest' && 'on'}> */}
                            <li onClick={() => setType({ type: 'interest' })} className={Type.type === 'interest' ? 'on' : ''}>
								Interest Gallery
							</li>
						</ul>

						<form onSubmit={handleSearch}>
							<input type='text' placeholder='검색어를 입력하세요.' />
							<button>search</button>
						</form>
					</article>

					<section className='galleryList' ref={ref_gallery}>
                        {/*Flickr값이 있을 때, 해당 배열 값의 갯수가 0이면 검색결과가 없으므로 안내문구 출력*/}
                        {Flickr?.length === 0 && <p>해당 검색어의 검색결과가 없습니다.</p>}
						{Flickr?.map((data, idx) => {
							return (
								<article
									key={idx}
									onClick={() => {
										setModalOpen(true);
										setIndex(idx);
									}}>
									<Pic src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`} className='pic' shadow />
									{/* <h3>{data.title}</h3> */}
								</article>
							);
						})}
					</section>
				</Content>
			</Layout>

			{ModalOpen && (
				<Modal setModalOpen={setModalOpen}>
					<Pic src={`https://live.staticflickr.com/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`} shadow />
				</Modal>
			)}
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

