import { motion } from "framer-motion";

export default function Content({children ,duration = 1, delay = 0 ,customMotion}){
    //motion data
    //default motion data
    const defaultMotion = {
        init : {opacity : 0, y : 200},
        active : {opacity : 1, y : 0},
        // end : {opacity : 0, y : 200, transition : {delay : 0 }},
        end : {opacity : 0, y : 200},
    }

    //호출시 props로 전달되는 커스텀 옵션 객체가 있으면 기존 디폴트 객체를 덮어쓰기한 뒤, 비구조화할당으로 바로 추출
    const combined = {...defaultMotion, ...customMotion};
    //우항에서 기존 합쳐진 combined객체를 다시 deep copy처리한 뒤에 end프로퍼티에 delay값을 0으로 초기화하는 하위 프로퍼티만 다시 덮어씀
	//최종적으로 변경된 객체값에서 비구조활당 처리
	const { init, active, end } = { ...combined, end: { ...combined.end, transition: { delay: 0 } } };
	console.log(end);

    return(
        <motion.div className='content' initial = {init} animate={active} exit={end} transition={{duration:duration, delay : delay}}>
            {children}
        </motion.div>
    );
}

