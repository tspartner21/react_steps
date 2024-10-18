import { motion } from 'framer-motion';
import { useZustandStore } from '../../hooks/useZustand';



export default function Modal({ children }) {
	console.log('modal');
	const setModalClose = useZustandStore(state => state.setModalClose);

    return (
        <motion.aside className='modal'>
            <div className="con">{children}</div>
            {/* 순서 4 - 닫기 버튼 클릭시 상태변경함수로 전역 상태값 변경처리해서 모달 닫음 */}
            <button className="btnClose" onClick={setModalClose}>CLOSE</button>
        </motion.aside>
    );
  

   
}
