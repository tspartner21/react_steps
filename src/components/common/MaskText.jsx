import { motion } from "framer-motion";

export default function MaskText({children}){
    console.log('mask')


    const frameStyle = {
    
        fontSize : '1.2rem', 
        fontFamily : 'orbitron' ,
        color : '#555',
        display : 'inline-block',
        position : 'relative',
        overflow : 'hidden',    
        marginBottom : 80
        
    };


    const maskStyle = {
        width  : '100%',
        height : '100%',
        position : 'absolute',
        top : 0,
        backgroundColor : '#555'
    }


    
    return(
        <div style={frameStyle}>
          <motion.span
            initial={{opacity : 0}}
            animate={{opacity : 1}}
            exit={{opacity:0, transition:{delay:0}}}
            transition={{duration:0.01 , delay:0.3}}>
                {children}
            </motion.span>

            <motion.div
            style={maskStyle}
            initial={{x:'-100%'}}
            animate={{x:'100%'}}
            transition={{duration:0.6}}>                
            </motion.div>
        </div>
    );
}