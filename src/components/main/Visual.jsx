import { useFlickrQuery } from '../../hooks/useFlickr';
import Pic from '../common/Pic';
import { Swiper, SwiperSlide, useSwiper  } from 'swiper/react';
//Autoplasy 모듈 가져옴
import { Autoplay , Pagination } from 'swiper/modules'; 
import { useState } from 'react';
import 'swiper/css';
import { FaPlay } from 'react-icons/fa';
//Swiper 컴포넌트 안쪽에서 호출할 자동롤링 시작 버튼 컴포넌트
//해당 swiper 인스턴스를 활용하는 컴포넌트는 무조건 Swiper가 활용되고 있는 부모 컴포넌트 안에서 호출되어야함
//swiper 인스턴스로부터 다양한 메서드를 호출하기 위해서 useSwiper 커스텀 훅으로 swiper 인스턴스 생성

function BtnStart(){
	//스와이퍼 전용 autoplay 관련 메서드를 호출하기 위해서 useSwiper 커스텀 훅으로 swiper 인스턴스 생성
	const swiper = useSwiper();
	console.log(swiper);
	return (
		//hidden(true : 숨김, false : 보임), disabled(true : 기능 비활성화, false : 기능활성화)
		<button hidden={swiper.autoplay.running} className = 'btnStart' onClick={()=> swiper.autoplay.start()}>
			<FaPlay/>
		</button>
	)
}

export default function Visual() {
	const [Index, setIndex] = useState(0);
	const { data, isSuccess } = useFlickrQuery({ type: 'mine' });
	return (
		<figure className='visual'>
			{/* Img titles */}
			<div className='textBox'>
				{/*이미지 타이틀 정보만 별로 뽑아서 Swipe 변경시마다 해당 순번의 타이틀도 같이 모션 처리 */}
				{data?.map((el, idx) => (
					<h2 key={idx} className={Index === idx ? 'on' : ''}>
						{el.title.substr(0, 30)}
					</h2>
				))}
			</div>

			{/* Img Pics */}
			{/* onSlideChange 이벤트 발생시 내부 순서값 구하는 프로퍼티로 index (loop:x), realIndex (loop: 0) */}
			<Swiper
				//autoplay 모듈 연결
				modules={[Autoplay, Pagination]}
				pagination={{ type: 'fraction' }}
				slidesPerView={3}
				spaceBetween={100}
				loop={true}				
				breakpoints={{
					1000 : {
					  slidesPerView: 2,
					  spaceBetween: 50
					},
					1400: {
					  slidesPerView: 3,
					  spaceBetween: 50
					}
				}}
				centeredSlides={true}
				onSlideChange={el => setIndex(el.realIndex)}
				//autoplay속성(delay : 인터벌 시간 ,disableOnInteraction : true)
				autoplay={{
					delay : 2000,
					disableOnInteraction : true
				}}
				//스와이퍼 기능이 아직 활성화되지 않은 상태에서 autoplay가 적용안되는 이슈 발생
				//onSwiper : 모든 스와이퍼 모듈을 불러온 뒤에 기능 적용할 준비완료시
				//해당 이벤트 발생시 자동적으로 파라미터를 통해 swiper 인스턴스가 전달됨
				onSwiper={swiper => {
					//swiper 컴포넌트의 준비가 완료되었더라도 리액트 쿼리로 데이터를 받아서 동적으로 slide 컴포넌트가 완성될때까지의 시간을 setTimeout으로 홀딩
					setTimeout(()=>{
						//1초뒤에 SwiperSlide 컴포넌트까지 완료시 전달받은 스와이퍼 인스턴스로 강제 롤링시작
						swiper.autoplay.start();
					},1000)
				}}
				>
				
				{isSuccess && 
					data?.map((pic, idx) => {
						if (idx >= 10) return null;
						return (
							<SwiperSlide key={idx}>
								{/* swiperSlide요소에는 바로 css모션 스타일 적용 비권장 */}
								<div className='inner'>
									<Pic
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
										style={{ width: '100%', height: '100%' }}
										shadow
									/>
								</div>
							</SwiperSlide>
					);
				})}
				{/*자동 롤링 시작 버튼 컴포넌트 호출 */}
				<BtnStart/>
			</Swiper>
		</figure>
	);
}

