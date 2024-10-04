import { useEffect, useState } from "react";
import Layout from "../common/Layout";

export default function Contact(){
    //순서 1 : 서버쪽에서 받아올 데이터를 담을 빈 배열 state공간 및 함수 생성
    //mus 실행
    const [Data, setData] = useState([]);
    
    //순서 2: 의존성 배열이 비어있는 useEffect 코드
    useEffect(()=>{
       fetch('/data.json') 
       .then(data => data.json())
       .then(json => {
        console.log(json);
        //순서 3 서버에서 가져온 데이터에서 배열만 뽑은뒤 무조건 state에 옮겨담기
        setData(json.data);
       })
    },[])
    

    return(
       <Layout title={'CONTACT'}>
        {/* 순서4 :반복시 무조건 idx로 키값 설정 */}
       {Data.map((data, idx)=>{
        return(
            <article key={idx}>
                <h2>{data.name}</h2>
            </article>
        );
       })}
        </Layout>
    );
}