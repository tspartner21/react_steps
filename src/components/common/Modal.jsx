import { useGlobalState } from "../../hooks/useGlobal";


export default function Modal({children }){

    const {dispatch } = useGlobalState();

    return (
        <aside className='modal'>
            <div className="con">{children}</div>
            {/* 순서 4 - 닫기 버튼 클릭시 상태변경함수로 전역 상태값 변경처리해서 모달 닫음 */}
            <button className="btnClose" onClick={()=>dispatch({type: 'CLOSE_MODAL'})}>CLOSE</button>
        </aside>
    );
  

   
}
