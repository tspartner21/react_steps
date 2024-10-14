import { useEffect, useRef, useState , useCallback} from "react";
import useThrottle from "../../hooks/useThrottle";

export default function Map(){
    const {kakao} = window;
    /*********useEffect 전까지는 준비 단계임******* */
    //화면 렌더링에 필요한  state값 초기화
    const [Index, setIndex] = useState(0);
    const [Traffic , setTraffic] = useState(false);
    const [Roadview , setRoadview] = useState(false);

  
    //지점 정보가 담긴 참조객체를 생성하고 현재 활성화된 Index 순번의 데이터 비구조화 할당
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
    //비구조화 할당 추출
    const { latlng , markerImg , markerSize , markerPos } = ref_info.current[Index];


    /**********참조객체 값을 담을 수 있는 것과, 담을 수 없는 것 2개(부수효과 여부) */

    //순수함수 형태로 값을 바로 전달받아 반환할 수 있는 인스턴스값 참조객체에 담음
    const ref_instClient = useRef(new kakao.maps.RoadviewClient());
    const ref_instType = useRef(new kakao.maps.MapTypeControl());
    const ref_instZoom = useRef(new kakao.maps.ZoomControl());
      

    //컴포넌트 마운트시에만 전달받을 수 있는 빈 참조 객체 생성
    const ref_mapFrame = useRef(null);
    const ref_viewFrame = useRef(null);
    const ref_instMap = useRef(null);
    const ref_instMarker = useRef(null);
    const ref_instView = useRef(null);

    
    //리사이즈 이벤트에 연결될 화면위치 초기화 함수
    const initPos = useCallback(() => {
        console.log('initPos');
        ref_instMap.current.setCenter(latlng);


    },[latlng]);

    //useThrottle 커스텀훅을 통해서 throttle이 적용된 새로운 throttledInitPos라는 함수 반환
    const throttledInitPos = useThrottle(initPos);
  

     //카카오 지도관련 인스턴스들을 생성해서 최종적으로 화면에 렌더링 해주는 함수
     const createMap = useCallback(() => {
        //강제로 참조된 지도영역안쪽의 html요소들을 계속 초기화처리(지도 레이어 중첩 문제 해결)지도, 트랙픽,컨트롤러 정보 초기화 함수
        ref_mapFrame.current.innerHTML = '';
        
        //맵,마커, 로드뷰, 로드뷰 인스턴스 생성 후 미리 생성한 참조객체 옮겨 담음
        //지도 인스턴스 생성은 ref_mapFrame에 담겨있는 실제 돔요소를 인수로 필요로 하므로 useEffect구문 안쪽에서 생성 이때 두번때 인수로 위치 인스턴스 지정
        ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, {center : latlng}); 
        ref_instMarker.current =  new kakao.maps.Marker({
        position : latlng,
        image : new kakao.maps.MarkerImage(markerImg , markerSize , markerPos)
        });

		//roadview 인스턴스 생성
        ref_instView.current = new kakao.maps.Roadview(ref_viewFrame.current);     
        //생성된 마커인스턴스 setMap 메서드 호출시 위치 인스턴스 값 인수로 전달(바인딩)
        ref_instMarker.current.setMap(ref_instMap.current);        
        

        //Index 상태값 변경시(지점 버튼 클릭해서 지도화면 갱신시) 무조건 트래픽 레이어 제거
        [setTraffic  , setRoadview].forEach(func=> func(false));
        //타입 줌 컨트롤러 인스턴스 반복돌며 인스턴스 위에 바인딩
        [ref_instType.current, ref_instZoom.current].forEach(inst => ref_instMap.current.addControl(inst));
        //로드뷰 인스턴스에 panoId 연결해 실제 로드뷰 화면 출력하는 호출문
        //clientInstance의 getNearestPanoId 함수 호출해서 현재 위치 인스턴스값 기준으로
        //제일 가까운 panoId값을 찾아서 view 인스턴스에 바인딩해서 로드뷰 화면에 출력

         ref_instClient.current.getNearestPanoId(latlng , 50, panoId => ref_instView.current.setPanoId(panoId, latlng));
     }, [kakao,latlng,markerImg,markerSize,markerPos]   );
     

    //initPos , createMap을 useEffect 외부로 분리하면 외존성 배열에 등록하라는 권고메시지 또는 이유
    //이유 : 해당 외부함수는 상태값을 활용해서 동작되는 함수, 해당함수가 외부에서 변경될수도 있다고 인지하기 때문에 해당함수도 의존성 배열에 등록 요청
    
    //initPos, createMap을 useEffect의 의존성 배열에 등록시 다시 해당 함수자체에 useCallback 처리하라는 권고문구 도는 이유
    //

    //Index값이 변경될때마다 지도초기화, 뷰, 마커, 로드뷰인스턴스 생성 및 리사이즈 이벤트 연결
    useEffect(()=>{
  
        //컴포넌트 마운트시 지도생성 함수 호출
        createMap();
         //윈도우 전역 객체에 resize 이벤트 핸들러 연결 및 제거
         window.addEventListener('resize', throttledInitPos);

        //clean-up 함수 - 컴포넌트 언마운트 한번만 호출
        return()  => window.removeEventListener('resize' , throttledInitPos);     
    }, [Index,createMap , throttledInitPos] ); //Index 상태값이 변경될 때마다 변경된 순번 상태값으로 지도 인스턴스 다시 생성해서 화면 갱신

    //Traffic 값이 반절될 때마다 트래픽 레이어 토글, 상태값에 boolean 값을 담아주고 해당 상태가 변경될때마다 지도 레이어 ON/OFF 메서드 호출
   useEffect(()=>{
        Traffic 
        ? ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
        : ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

   },[Traffic, kakao]);

 

    return(
        <section className='map'>
            <h2>Location</h2>

            {/*맵, 로드뷰 프레임 */}
            <figure className="mapFrame">
                <article ref={ref_mapFrame} className={`mapFrame ${!Roadview && 'on'}`}></article>
                <article ref={ref_viewFrame} className={`viewFrame ${Roadview && 'on'}`}></article>
            </figure>

            {/* 컨트롤 버튼 모음 */}
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
