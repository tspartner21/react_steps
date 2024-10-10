import {useParams} from 'react-router-dom';
import Layout from '../common/Layout';
import {useEffect , useState} from 'react';
import useCombineText from '../../hooks/useCombineText';
import useShortenText from '../../hooks/useShortenText';
import Content from '../common/Content';

export default function YoutubeDetail(){
    //useParams로 url을 통해 전달되는 파라미터값을 반환
    //주소 /youtube/abc(abc라는 값을 params객체로 전달받음)
    const { id } = useParams();

    const [YoutubeVid, setYoutubeVid] = useState(null);
    const combineText = useCombineText();
    const shortenText = useShortenText();
        // 해당 컴포넌트는 2번 재렌더링됨
        // YoutubeVid 상태값이  null 상태로 렌더링되고 그때 fetching 함수가 받아온 데이터를 해당 상태에 담아주면서 2차 렌더링발생
               
        
        //이전 목록화면에서 제목 클릭시 전달되는 id값을 param로 받아서
        //새로운 요청 url을 만들고 useEffect로 컴포넌트 마운트시 한번만 서버쪽에서 데이터 요청 후 배열값 잔달받음
    useEffect(()=>{
    
        const api_key = import.meta.env.VITE_YOUTUBE_API;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

        fetch(url)
        .then(data=>data.json())
        .then(json=> {
            //  console.log(json);
            setYoutubeVid(json.items[0]);
            
        });
    }, []);

    {/* 제목, iframe 영상, 본문 ,날짜순으로 출력 */}
    return(
        <Layout title={YoutubeVid?.snippet.title}>
            <Content delay={1}>
                <figure className='vidFrame'>
                    <iframe width='100%' height='100%' title='youtube' src={`https://www.youtube.com/embed/${YoutubeVid?.snippet?.resourceId?.videoId || ''}`}></iframe>
                </figure>
                <p>{shortenText(YoutubeVid?.snippet.description || '', 250)}</p>
                <span>{combineText(YoutubeVid?.snippet.publishedAt.split('T')[0] || '', '-','.')}</span>
            </Content>
        </Layout>
      
    );
}
//아래와 같이 첫번째 렌더링시에는 YoutubeVid상태값이 null인 상태
    //null요소의 snipet라는 프로퍼티 접근을 하는 것이기 때문에 문법 에러 발생
    //2번째 렌더링시부터는 상태값이 담겨있으므로 에러발생하지 않음
    //해결방법 : 처음 렌더링시 초기 상태값이 비어있을 때 오류해결 방법(Optional chaining)

//미션
//위에서 반환받은 데이터로 상세 데이터 호출
//제목, iframe 영상, 본문 ,날짜순으로 출력
/* 
자가진단 항목
1. useState를 이용해서 state에 값을 옮겨담고 state변경 함수로 state값 변경처리
2. useEffect구문의 구조를 파악하고 의존성 배열의 역할
3. useState와 useEffect를 활용해서 서버 데이터 fetching 처리 후 state에 담기
4. 다이나믹 라우터를 이용해서 /youtube/:id를 이용해서 상세페이지에 특정 id값 전달하는 방법
5. 상태값에 있는 객체를 불어올때 ?. 형태로 옵셔널 체이닝을 처리하는 이유
6. 커스텀훅을 만드는 방법(선택사항)
7. useShortenText 커스텀훅 사용방법 (선택사항)
8. useCombineText 커스텀훅 사용방법 (선택사항)
*/