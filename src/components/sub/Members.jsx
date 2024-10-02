import Layout from "../common/Layout";
import memberData from '../../data/memberData';

export default function Members(){
    // console.log(memberData);
    return(
       <Layout title={'MEMBERS'}>
        
        <article className="ceoBox">
            <div className="txt">
                <h2>{memberData[0].name}</h2>
                <p>{memberData[0].position}</p>
                
            </div>
            <div className='pic'>
                <img src={'/' + memberData[0].pic} alt={memberData[0].name}/>
            </div>
        </article>

        {/* //첫번째 순번의 데이터가 아닐때에만 반복 출력 */}
        <article className="memberListbox">
            <div className="titBox">
                <h2>Our Team Members</h2>
                <p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora possimus non ipsa cum. Veritatis, dolore
						aliquam? Consectetur assumenda dolor labore.
					</p>
            </div>

            <ul>
            {memberData.map((member, idx)=>{
                if(idx !== 0){
                    return (
                        <li key={idx}>
                            <div className="pic">
                                <img src={'/'+member.pic} alt={member.name}/>
                            </div>
                            <div className='txt'>
                                <h2>{member.name}</h2>
                                <p>{member.position}</p>
                            </div>
                        </li>
                    );               
                }
            
            })}
            </ul>
            <div className="decBox">
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