export default function Title({color, children}){
    return(
        <h1 className='title' style={{color : color}}>
            {children}
        </h1>
    );
}