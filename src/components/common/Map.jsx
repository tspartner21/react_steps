import { useEffect, useRef, useState } from "react";

export default function Map(){
    const {kakao} = window;
    const ref_mapFrame = useRef(null);
    
    //지점 정보를 변경하기 위한 데이터 순번을 state에 저장
    //이후 인스턴스 호출하는 구문에 일괄적으로 Index값 연동
    const [Index, setIndex] = useState(0);

   
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
    
//비최적화(지저분한) 코드라 사용안함
//    //마커 인스턴스 생성
//     const inst_markerImg = new kakao.maps.MarkerImage(
//         ref_info.current[0].markerImg,
//         ref_info.current[0].markerSize,
//         ref_info.current[0].markerOffset
//     );

     // 마커 인스턴스 생성시 전달되는 인수의 객체에 두번째 프로퍼티로 인스턴스 변경(이미지가 적용된 마커 생성)
     const inst_marker = new kakao.maps.Marker({
        position : latlng,
        image : new kakao.maps.MarkerImage(markerImg , markerSize , markerPos)
     });

    //Index 상태값이 변경될때마다 순번 상대값으로 지도 인스턴스 다시 생성되어서 화면갱신
    //이슈사항 1 : 지점버튼 클릭시마다 Index 상태값이 의존성배열로 등록되어 있는 useEffect 콜백함수를 재호출
    //해당 콜백이 호출될때마다 내부적으로 새로운 지도 인스턴스가 생성됨
    //리액트는 (SPA : 단일페이지 어플리케이션) 특성상 index.html은 그대로 있고 리액트 컴포넌트 함수만 재호출되는 구조
    //useEffect의 콜백함수가 재호출될때마다 기존 생성된 지도 인스턴스를 삭제하지 않고 계속해서 추가가됨(mapFrame 안쪽에 지도 div가 계속 중첩됨)
    //jsx 변환되고 화면에 컴포넌트 마운트시 지도 인스턴스 생성
    useEffect(()=>{
        //강제로 참조된 지도영역안쪽의 html요소들을 계속 초기화처리(지도 레이어 중첩 문제 해결)
        ref_mapFrame.current.innerHTML = '';

            // 지도 인스턴스 생성은 ref_mapFrame에 담겨있는 실제 돔요소를 인수로 필요로 하므로 useEffect구문 안쪽에서 생성
            //이때 두번때 인수로 위치 인스턴스 지정
            const inst_map = new kakao.maps.Map(ref_mapFrame.current, {center : latlng}); 

            //생성된 마커인스턴스 setMap 메서드 호출시 위치 인스턴스 값 인수로 전달(바인딩)
            inst_marker.setMap(inst_map);

    }, [Index]); //Index 상태값이 변경될 때마다 변경된 순번 상태값으로 지도 인스턴스 다시 생성해서 화면 갱신

    return(
        <section className='map'>
            <h2>Location</h2>

            <figure ref={ref_mapFrame} className="mapFrame"></figure>

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
           </nav>

        </section>
    );
}


//미션(11시 23분)
//지도 출력박스 밑에 참조객체 담겨있는 지점정보 배열을 활용하여 동적으로 지점 버튼 3개 출력
//이때 title 정보값으로 버튼 이름 활용
//버튼 클릭시 Index상태값을 변경해 바뀐 순번의 지점 정보로 화면이 갱신되도록 이벤트 처리