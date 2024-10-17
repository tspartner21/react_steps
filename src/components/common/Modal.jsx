import { useGlobalState } from "../../hooks/useGlobal";


export default function Modal({children }){

    const {setModalOpen } = useGlobalState();

    return (
        <aside className='modal'>
            <div className="con">{children}</div>
            {/* 순서 4 - 닫기 버튼 클릭시 상태변경함수로 전역 상태값 변경처리해서 모달 닫음 */}
            <button className="btnClose" onClick={()=>setModalOpen(false)}>CLOSE</button>
        </aside>
    );
  

   
}

// 미션
// 모달창 생성시 document.body.style.overflow = 'hidden' 으로 처리해서 스크롤 기능 비활성화 처리
// 모달창 제거시 document.style.overflow = 'auto' 로 처리해서 스크롤 기능 다시 활성화 