import { motion } from "framer-motion";

export default function Content({children ,duration = 1, delay = 0 ,customMotion}){
    //motion data
    //default motion data
    const defaultMotion = {
        init : {opacity : 0, y : 200},
        active : {opacity : 1, y : 0},
        end : {opacity : 0, y : 200, transition : {delay : 0 }},
    }

    //호출시 props로 전달되는 커스텀 옵션 객체가 
    const {init ,active, end} = {...defaultMotion, ...customMotion};

    return(
        <motion.div className='content' initial = {init} animate={active} exit={end} transition={{duration:duration, delay : delay}}>
            {children}
        </motion.div>
    );
}

