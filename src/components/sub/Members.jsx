import Layout from '../common/Layout';
import memberData from '../../data/memberData';
import Pic from '../common/Pic';
import { useRef, useState } from 'react';

/*
    참조객체의 가상돔을 담아 활용하는 패턴
    1. useRef로 빈 참조객체 생성
    2. 원하는 가상돔 요소(JSX EL) ref속성으로 참조객체 연결
    3. 참조객체명.current로 해당요소를 가져와서 제어
*/

export default function Members() {

    console.log('Member rendered!');

    // const pEl = useRef(null); //참조 객체 정의 , 가상돔에서 생성하고 한번에 바꿈
    // console.log(pEl);

    const refEl = useRef(0);

    const [Num, setNum] = useState(0);

    const changeRef = () => {
        console.log('changeref called');
        refEl.current = 1;
    };

    const changeState = () => {
        console.log('changeState called');
        setNum(Num + 1);
    };

    const changeColor = () => {


        
        //changeColor 함수가 호출되는 순간 가상돔 요소를 찾는 것이 아닌
        //이전 렌더링 사이클 때 변환된 리얼돔을 직접 가져와서 스타일 변경함
        //리액트는 개발 이후 유지보수가 장점임, 스테이트 값만 변경하기 때문에 연결된 것만 추적하면됨
        //document.querySelector로 처리하면 모든 것을 찾아야함, 재렌더링되지 않은 경우, 이전 돔을 가져오는 것임
        // 수많은 스테이트값이 변경되는 경우, 내가 제어하는 돔과 정보값과 다름
        //이처럼 가상돔이 아닌 이전 렌더링 타임에 생성된 리얼돔을 직접 제어하면 안되는 이유
        //문제점 1 : state와 연관이 없는 일반 DOM요소를 제어하기 때문에 추후 데이터 추적 불가능
        //문제점 2 :  현재 렌더링 사이클에서 다루고 있는 최신 요소가 아닌 이전 렌더링때 생성된 요소를 다루기 때문에 잘못된 예전 데이터를 다루게됨
        //우리나라 리액트 뜬 이유 : 배민 자사 홈에 최신점 설명함, 페이스북과 동일한 이슈, 배민 정보가 1초에 수십개 바뀜
        //import { useRef } from 'react'; 이것을 사용한다

        const pEl = document.querySelector('.titleBox p'); //직접 제어는 사용안함
        // console.log(pEl);

        //참조객체의 가상돔을 제어하면, 현재 렌더링 사이클의 최신 가상돔 정보를 제어가능
        pEl.current.style.color = 'red';
      
    };

	return (
		<Layout title={'MEMBERS'}>
			<article className='ceoBox'>
				<div className='txt'>
					<h2>{memberData[0].name}</h2>
					<p>{memberData[0].position}</p>
				</div>
				<Pic className='pic' src={'/' + memberData[0].pic} />
			</article>

        {/* //첫번째 순번의 데이터가 아닐때에만 반복 출력 */}
        <article className='memberListBox'>
            <div className='titBox'>
                <h2 onClick={changeRef}>Our Team Members</h2>
                <p onClick={changeState}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora possimus non ipsa cum. Veritatis, dolore
						aliquam? Consectetur assumenda dolor labore.
					</p>
            </div>

            <ul>
            {memberData.map((member, idx)=>{
                if(idx !== 0){
                    return (
                        <li key={idx}>
                            {/* 이미지 컴포넌트 호출 후 src에 이미지 url값 전달, pic 클래스에는 이미지의 크기정도만 지정 */}
                            <Pic src={member.pic} className='pic' shadow={true}/>
                            {/* <div className="pic">
                                <img src={'/'+member.pic} alt={member.name}/>
                            </div> */}
                            <div className='txt'>
                                <h2>{member.name}</h2>
                                <p>{member.position}</p>
                            </div>
                        </li>
                    );               
                }
            
            })}
            </ul>
            <div className='descBox'>
            <h2>Lorem ipsum dolor sit.</h2>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. A esse cupiditate, vitae deleniti repellat
						explicabo sit, corrupti beatae dicta, nulla optio corporis alias. Perferendis quidem sapiente minima,
						quisquam inventore soluta.
					</p>
            </div>
        </article>
        {/* 첫번째 div 한개 만든뒤,  ceoBox안쪽 출력
            //첫번째를 제외한 나머지 6개 데이터만 기존 반복문 안에서 출력
        */}

        {/* <p>Members Page contents come here....</p>
        <article>
            {memberData.map((data , idx)=>(
                <div className="pic" key={idx}>
                 <img src='../../public/{data.pic}' alt=""/>../public/{data.pic}
                </div>                                
            ))}
            {memberData.map((data , idx)=>(
                <div className="txt" key={idx}>
                    <h2>{data.name}</h2>
                    <p>{data.position}</p>
                </div>                           
            ))}
        </article>    */}


        </Layout>
    );
}