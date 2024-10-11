import { useEffect, useRef, useState } from "react";

export default function Map(){
    const {kakao} = window;
    const [Index, setIndex] = useState(0);
    //Traffic 레이어 활성/비활성
    const [Traffic , setTraffic] = useState(false);
    const [Roadview , setRoadview] = useState(false);

    const ref_mapFrame = useRef(null);
    const ref_viewFrame = useRef(null);

    //지도 인스턴스가 담길 빈 참조객체 생성
    const ref_instMap = useRef(null);


    const ref_instView = useRef(null);
    const ref_instClient = useRef(new kakao.maps.RoadviewClient());

  
    const ref_info = useRef([ //개체를 미리 생성함
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
    const { latlng , markerImg , markerSize , markerPos } = ref_info.current[Index];

//위의 비구조화할당으로 추출한 정보값으로 마커 인스턴스 생성


     // 마커 인스턴스 생성시 전달되는 인수의 객체에 두번째 프로퍼티로 인스턴스 변경(이미지가 적용된 마커 생성)
     const inst_marker = new kakao.maps.Marker({
        position : latlng,
        image : new kakao.maps.MarkerImage(markerImg , markerSize , markerPos)
     });

    //일반지도/스카이뷰 전환
    const instType = new kakao.maps.MapTypeControl();
    const instZoom = new kakao.maps.ZoomControl();
    
    const initPos = () => {
        console.log('initPost called!')
        ref_instMap.current.setCenter(latlng);
     };

    //Index값이 변경될때마다 실행할 useEffect(새로운 Index값으로 지도 인스턴스 갱신)
    useEffect(()=>{

        //Index 상태값 변경시(지점 버튼 클릭해서 지도화면 갱신시) 무조건 트래픽 레이어 제거
        [setTraffic  , setRoadview].forEach(func=> func(false));

        //강제로 참조된 지도영역안쪽의 html요소들을 계속 초기화처리(지도 레이어 중첩 문제 해결)
        ref_mapFrame.current.innerHTML = '';

        // 지도 인스턴스 생성은 ref_mapFrame에 담겨있는 실제 돔요소를 인수로 필요로 하므로 useEffect구문 안쪽에서 생성
        //이때 두번때 인수로 위치 인스턴스 지정
        ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, {center : latlng}); 


        //생성된 마커인스턴스 setMap 메서드 호출시 위치 인스턴스 값 인수로 전달(바인딩)
        inst_marker.setMap(ref_instMap.current);

        //타입 줌 컨트롤러 인스턴스 반복돌며 인스턴스 위에 바인딩
        [instType, instZoom].forEach(inst => ref_instMap.current.addControl(inst));

        
		//roadview 인스턴스 생성
        ref_instView.current = new kakao.maps.Roadview(ref_viewFrame.current);
        //clientInstance의 getNearestPanoId 함수 호출해서 현재 위치 인스턴스값 기준으로
        //제일 가까운 panoId값을 찾아서 view 인스턴스에 바인딩해서 로드뷰 화면에 출력
         ref_instClient.current.getNearestPanoId(latlng , 50, panoId => ref_instView.current.setPanoId(panoId, latlng));

        window.addEventListener('resize', initPos);

        //clean-up 함수 - 컴포넌트 언마운트 한번만 호출
        return()  => window.removeEventListener('resize' , initPos);     
    }, [Index]); //Index 상태값이 변경될 때마다 변경된 순번 상태값으로 지도 인스턴스 다시 생성해서 화면 갱신

    //Traffic 상태값에 boolean 값을 담아주고 해당 상태가 변경될때마다 지도 레이어 ON/OFF 메서드 호출
   useEffect(()=>{
        Traffic 
        ? ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
        : ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

   },[Traffic]);

 

    return(
        <section className='map'>
            <h2>Location</h2>

            <figure className="mapFrame">
                <article ref={ref_mapFrame} className={`mapFrame ${!Roadview && 'on'}`}></article>
                <article ref={ref_viewFrame} className={`viewFrame ${Roadview && 'on'}`}></article>

            </figure>

           <nav className="btnSet">
             <ul className = "branch">
                 {ref_info.current.map((el, idx)=>(
                     //동적으로 li 생성 : 클릭한 li의 순서값 idx로 Index 상태값 변경
                     //컴포넌트 재렌더링되면서 변경된 순번의 정보값으로 지도화면 변경됨
                     <li key={idx} className={idx === Index ? 'on' : '' } onClick = {() => setIndex(idx)}>
                         {el.title}
                     </li>
                     )
                 )
             }
             </ul>
             <ul className='btnToggleSet'>
					{/* 버튼 클릭시 상태변경함수로 Traffic상태값 반전 및 3항 연산자로 버튼 활성/비활성화 처리 */}
					<li onClick={() => setTraffic(!Traffic)} className={Traffic ? 'on' : ''}>
						{`Traffic ${Traffic ? 'OFF' : 'ON'}`}
					</li>
                    {/* Roadview 상태값에 따라 버튼 활성화, 비활성화 처리 */}
					<li onClick={() => setRoadview(!Roadview)} className={Roadview ? 'on' : ''}>
                        {`Roadview ${Roadview ? 'OFF' : 'ON'}`}
                    </li>
				</ul>
			</nav>

        </section>
    );
}
