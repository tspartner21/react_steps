

export default function Modal({children , setModalOpen}){
    return (
        <aside className='modal'>
            <div className="con">{children}</div>
            {/* 자식에서 부모의 상태값을 변경 */}
            <button className="btnClose" onClick={()=>setModalOpen(false)}>CLOSE</button>
        </aside>
    );
  

   
}

// 미션
// 모달창 생성시 document.body.style.overflow = 'hidden' 으로 처리해서 스크롤 기능 비활성화 처리
// 모달창 제거시 document.style.overflow = 'auto' 로 처리해서 스크롤 기능 다시 활성화 