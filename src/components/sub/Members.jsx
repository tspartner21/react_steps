import Layout from '../common/Layout';
import memberData from '../../data/memberData';
import Pic from '../common/Pic';
import MaskBox from '../common/MaskBox';
import MaskText from '../common/MaskText';
import Content from '../common/Content';

/*
    참조객체의 가상돔을 담아 활용하는 패턴
    1. useRef로 빈 참조객체 생성
    2. 원하는 가상돔 요소(JSX EL) ref속성으로 참조객체 연결
    3. 참조객체명.current로 해당요소를 가져와서 제어
*/

export default function Members() {

	return (
		<Layout title={'MEMBERS'}>

            <MaskText delay={1}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero tenetur quo cumque nostrum, asperiores corporis.
            </MaskText>
            <br/>

            <MaskText delay={1.5} style={{marginBottom : 80}}>
                Lorem, ipsum dolor.
            </MaskText>

			<Content delay={1}>
                <article className='ceoBox'>
                    <div className='txt'>
                        <h2>{memberData[0].name}</h2>
                        <p>{memberData[0].position}</p>
                    </div>
                
                             {/*MaskBox 안쪽에서 Pic 요소가 들어갈 경우 shadow 속성 적용 불가 : Mask frame 객체가 내부 요소를 overflow:hidden 처리하기 때문 */}
                             <MaskBox style={{width : '50%' , height : '65vh'}} delay={2 + 1.5}>
                                 {/*직접 style 객체를 props로 전달하여 불필요한  scss 구문 추가 없이 스타일 적용 */}
                                 {/* <Pic className='pic' src={'/' + memberData[0].pic} shadow/> */}
                                 <Pic style={{ width: '100%', height: '100%' }} src={'/' + memberData[0].pic} />
                             </MaskBox>
                </article>
                
                {/* //첫번째 순번의 데이터가 아닐때에만 반복 출력 */}
                <article className='memberListBox'>
                    <div className='titBox'>
                        <h2>Our Team Members</h2>
                        <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                                possimus non ipsa cum. Veritatis, dolore aliquam? Consectetur
                                assumenda dolor labore.
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
            </Content>


        </Layout>
    );
}

/*
미션
- MaskText컴포넌트 아래쪽의 전체 서브페이지의 콘텐츠를 일괄적으로 페이드모션 처리
- 해당 컨텐츠 모션을 모든 서브페이지 컴포넌트에 일일이 framer-motion 적용하는 것은 비효율적
- layout 컴포넌트에 추가하지 않으면서 각각의 서브페이지 컴포넌트의 특정 부분에 복잡하고 일괄적인 프레임 기능 적용 필요
- 작업 1:  서브페이지 컴포넌트 안쪽에서 컨텐츠 영역만 Wrapping 처리해줄 Content.jsx를 생성
- 작업 2 : Context.jsx의 children으로 각 페이지의 콘텐츠를 전달해주도록 처리
- 작업 3 : 각 서브페이지의 Content 컴포넌트를 Wrapper형태로 감싸서 각 페이지 전용 컨텐츠 내용 전달
- 작업 4 : Content.jsx안쪽에 페이드인 효과의 motion 컴포넌트 처리

*/