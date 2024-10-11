import { useEffect, useRef } from "react";

export default function Map(){

    const {kakao} = window;
    const ref_mapFrame = useRef(null);

    //각 지도를 출력하기 위한 정보값의 구조가 복잡하고 자주 변경되지 않는 데이터일때에는 일반 지역변수보다 useRef를 통한 참조객체 등록
    //참조객체는 state 변경에 의해서 컴포넌트 재렌더링이 되더라도 메모리가 해제되지 않고 해당 값이 계속 유지됨(closure 개념 언급)
    
    //컴포넌트 함수가 자바스크립트 함수라 계속 같은 값이 생성/해제 되며 렌더링됨(비효율적)
    //돔요소를 useState , 렉시컬스코프는 브라우저가 렌더링되어도 값이 지워지지 않음
    //컴포넌트가 언마운트가 되지 않으면, 계속 값을 유지함(useRef에 넣어야 유리함)

    const ref_info = useRef([ //개체를 미리 생성함
        {
        title : 'COEX' ,
        latlng : new kakao.maps.LatLng(37.51013685499783, 127.06217376752065) , 
        markerImg : 'marker1.png', 
        markerSize : new kakao.maps.Size(64, 69),  //마커사이즈 인스턴스
        markerOffset : {offset: new kakao.maps.Point(0, 0)} //마커 좌표와 일치시킬 이미지 안 좌표
        }
    ]);

  
    
    //위치 인스턴스(지도, 마커 인스턴스 생성시 필요)

    // 마커 인스턴스 생성
    const inst_marker = new kakao.maps.Marker({ position : ref_info.current[0].lating });


    //jsx 변환되고 화면에 컴포넌트 마운트시 지도 인스턴스 생성
    useEffect(()=>{
            // 지도 인스턴스 생성은 ref_mapFrame에 담겨있는 실제 돔요소를 인수로 필요로 하므로 useEffect구문 안쪽에서 생성
            //이때 두번때 인수로 위치 인스턴스 지정
            const inst_map = new kakao.maps.Map(ref_mapFrame.current, {center : ref_info.current[0].latlng}); 

            //생성된 마커인스턴스 setMap 메서드 호출시 위치 인스턴스 값 인수로 전달(바인딩)
            inst_marker.setMap(inst_map);

    }, []);

    return(
        <section className='map'>
            <h2>Location</h2>
            <figure ref={ref_mapFrame} className="mapFrame"></figure>
        </section>
    );
}