import { useEffect, useRef, useState } from "react";

export default function Map(){
    const {kakao} = window;
    const ref_mapFrame = useRef(null);
    
   
    const [Index, setIndex] = useState(0);

    //지도 인스턴스가 담길 빈 참조객체 생성
    const ref_instMap = useRef(null);

   
    const {current : ref_info} = useRef([ //개체를 미리 생성함
        {
        title : 'COEX' ,
        latlng : new kakao.maps.LatLng(37.51013685499783, 127.06217376752065) , 
        markerImg : 'marker1.png',  //마커 이미지 경로
        markerSize : new kakao.maps.Size(232, 99),  //마커사이즈 인스턴스
        markerOffset : {offset: new kakao.maps.Point(150, 120)} //마커 좌표와 일치시킬 이미지 안 좌표
        },
        {
			title: 'NEXON',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			markerImg: 'marker2.png',
			markerSize: new kakao.maps.Size(232, 99),
			markerPos: { offset: new kakao.maps.Point(116, 99) }
		},
		{
			title: 'CITYHALL',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			markerImg: 'marker3.png',
			markerSize: new kakao.maps.Size(232, 99),
			markerPos: { offset: new kakao.maps.Point(116, 99) }
		}
    ]);

    //기존 참조객체명까지 매번 호출하기 번거로우므로 비구조할당을 통해 현재 Index순번 상태변화에 따라 활성화되고 있는 객체의 key값을 바로 추출
    const { latlng , markerImg , markerSize , markerPos } = ref_info[Index];

//위의 비구조화할당으로 추출한 정보값으로 마커 인스턴스 생성


     // 마커 인스턴스 생성시 전달되는 인수의 객체에 두번째 프로퍼티로 인스턴스 변경(이미지가 적용된 마커 생성)
     const inst_marker = new kakao.maps.Marker({
        position : latlng,
        image : new kakao.maps.MarkerImage(markerImg , markerSize , markerPos)
     });

     //지도 위치 중앙으로 초기화 함수
     const initPos = () => {
        console.log('initPost called!')
        ref_instMap.current.setCenter(latlng);
     };

    //일반지도/스카이뷰 전환
    const instType = new kakao.maps.MapTypeControl();
    const instZoom = new kakao.maps.ZoomControl();

    //Index값이 변경될때마다 실행할 useEffect(새로운 Index값으로 지도 인스턴스 갱신)
    useEffect(()=>{


        //강제로 참조된 지도영역안쪽의 html요소들을 계속 초기화처리(지도 레이어 중첩 문제 해결)
        ref_mapFrame.current.innerHTML = '';

        // 지도 인스턴스 생성은 ref_mapFrame에 담겨있는 실제 돔요소를 인수로 필요로 하므로 useEffect구문 안쪽에서 생성
        //이때 두번때 인수로 위치 인스턴스 지정
        ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, {center : latlng}); 


        //생성된 마커인스턴스 setMap 메서드 호출시 위치 인스턴스 값 인수로 전달(바인딩)
        inst_marker.setMap(ref_instMap.current);

        //타입 줌 컨트롤러 인스턴스 반복돌며 인스턴스 위에 바인딩
        [instType, instZoom].forEach(inst => ref_instMap.current.addControl(inst));

        //해당 전역이벤트 연결 구문이 빈 의존성 배열의 콜백 안쪽에 등록되었을 때의 문제점
        //window에 연결되는 initPos 핸들러 함수는 내부적으로 지도인스턴스에 위치 인스턴스값을 활용해서 위치를 갱신하는 구조
        //리사이즈될때마다 인스턴스 정보값이 갱신되어야 하므로 Index 의존성 배열 안쪽의 콜백에서 호출
        window.addEventListener('resize', initPos);

        //clean-up 함수 - 컴포넌트 언마운트 한번만 호출
        return()  => {
        //window 객체에 이벤트 핸들러 연결시에는 설사 해당 컴포넌트가 언마운트되더라도 계속해서 윈도우 전역객체에 등록되어 있음
        //해결방법 : clean-up 함수를 활용해서 컴포넌트 언마운트시 강제로 window 객체에 연결한 핸들러 함수를 직접 제거
        console.log('Map Unmounted initPos handler removed');
        window.removeEventListener('resize' , initPos);
        };

       

    }, [Index]); //Index 상태값이 변경될 때마다 변경된 순번 상태값으로 지도 인스턴스 다시 생성해서 화면 갱신

   

    return(
        <section className='map'>
            <h2>Location</h2>

            <figure ref={ref_mapFrame} className="mapFrame"></figure>

           <nav className="btnSet">
             <ul className = "branch">
                 {ref_info.map((el, idx)=>(
                     //동적으로 li 생성 : 클릭한 li의 순서값 idx로 Index 상태값 변경
                     //컴포넌트 재렌더링되면서 변경된 순번의 정보값으로 지도화면 변경됨
                     <li key={idx} className={idx === Index ? 'on' : '' } onClick = {() => setIndex(idx)}>
                         {el.title}
                     </li>
                     )
                 )
             }
             </ul>
           </nav>

        </section>
    );
}

