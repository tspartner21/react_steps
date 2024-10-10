import { motion } from "framer-motion";
import Mask from "./Mask";

export default function MaskText({children, duration = 0.5, delay = 0 , color = '#000 ',style}  ){
    // console.log('mask')

    //기본 스타일 객체
    //외부 스타일 파일로 스타일 지정하면 해당 컴포넌트를 범용적으로 사용하기 어려움
    //이러한 문제점을 개선하기 위해 대안책 (styledComponent, tailwindCSS , 스타일 객체를 직접 내부에 생성)

    const frameStyle = {
    
        fontSize : '1.2rem', 
        fontFamily : 'orbitron' ,
        color : color,
        display : 'inline-block',
        position : 'relative',
        overflow : 'hidden',    
        marginBottom : 10
        
    };


    //span text motion styles
    const {init , active , end , time} = {
        init : {opacity : 0},
        active : {opacity : 1},
        end : {opacity : 0 , transition : {delay : 0}},
        time : {duration : 0.01 , delay : duration / 2 + delay}
    };
   
    return(
        //텍스트를 감싸주는 Wrapper
        //해당 모션 컴포넌트의 스타일을 부모컴포넌트에서 호출시 편하게 변경처리 하기 위해서 전달받는 style  객체로 기존 stgle 객체를 덮어줌
        <div style={{...frameStyle, ...style}}> 
        {/*{...frameStyle, ...style} 전개 스타일로 객체 복사하기  */}
        {/* children 으로 전달된 실제 텍스트를 span으로 전달된 요소 */}
          <motion.span
            initial={init}
            animate={active}
            exit={end}
            transition={time}>
                {children}
            </motion.span>

            <Mask duration={duration} delay={delay} color={color} />
        </div>
    );
}