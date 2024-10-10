import { motion } from "framer-motion";
import Mask from './Mask';

export default function MaskBox({
    children, 
    duration=0.5, 
    delay=0 , 
    color='#000' ,
    style
    }){
    console.log('mask')

    

    const frameStyle = {
    
        display : 'inline-block',
        position : 'relative',
        overflow : 'hidden',      
    };


   

    //motion options 
    const motionBox = {
        in : {opacity : 0},
        on : {opacity : 1},
        out : {opacity : 0.01 , transition : {delay : 0}},
        time : {duration : 0.01 , delay : duration / 2 + delay }
    };
    
    return(
        <div style={{...frameStyle, ...style}}> 
        {/*{...frameStyle, ...style} 전개 스타일로 객체 복사하기  */}
        {/* children으로 전달된 요소가 black 요소가 black 요소이 때문에 내부 wrapper 요소도 div 처리 */}
          <motion.div
            style = {{width : '100%' , height : '100%'}}
            variants={motionBox}
            initial={{opacity : 0}}
            animate={{opacity : 1}}
            exit={{opacity:0, transition:{delay:0}}}
            transition={{duration:0.01 , delay:duration/2 + delay}}>
                {children}
            </motion.div>

            <Mask duration={duration} delay={delay} color={color} />
        </div>
    );
}

/*
미션
- 현재 MaskText, MaskBox에서 페이지 전체(추후 적용예정)에 공통으로 Mask 형태의 모션 요소를 활용하고 있음
- 해당 마스크 기능만 Mask.jsx 라는 별도의 컴포넌트로 분리해서 재활용하는 것이 유리
- 수행작업 1. Mask컴포넌트를 따로 Mask.jsx  형태로 생성
- 수행작업 2. Mask 컴포넌트를 MaskText.jsx , MaskBox.jsx에 각각 호출해서 코드 정리
*/