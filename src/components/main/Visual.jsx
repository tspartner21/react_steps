import { useFlickrQuery } from "../../hooks/useFlickr";
import Pic from "../common/Pic";
import { Swiper, SwiperSlide } from 'swiper/react';
/* */
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function Visual(){
    const { data } = useFlickrQuery({type : 'mine'});
	console.log(data);

    return (
        <figure className='visual'>
                    <Swiper 
                    slidesPerView={3} 
                    spaceBetween={100} 
                    loop={true}                   
                    effect={'coverflow'}
                    coverflowEffect={{
                    rotate: 50, //패널별 회전각도
                    stretch: 0, //패널간 당겨짐 정도
                    depth: 100, //원근감 정도 
                    modifier: 1, //위 3가지 속성의 중첩강도 비율
                    slideShadows: true, //패널의 그림자
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    >
                        {data?.map((pic, idx)=> {  
                            // pending인 경우, 옵셔널 체이닝으로 ? 추가하기
                            if(idx >= 10) return null;
                            return (
                                <SwiperSlide key={idx}>
                                    <Pic src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_z.jpg`} style={{width : '100%', height : '100%'}} shadow/>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper >

        </figure>
    );
}