import { useQuery } from "@tanstack/react-query"; 

//아래 커스텀 훅에서 활용될 fetching 함수
const fetchYoutube = async ({queryKey}) => {
    //useQuery로 전달된 opt객체는 fetching 함수 안쪽의 queryKey로 전달받음
    console.log(queryKey[1]); //{type:'A'}
    const api_key = import.meta.env.VITE_YOUTUBE_API;
    const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
    const pidA = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
    const pidB = 'PLJFNBkP72ghvzB5HGeHLBQq5_Lna7ODXI'
    const num = 10;
    let url = ''
    const urlA = `${baseURL}?part=snippet&playlistId=${pidA}&key=${api_key}&maxResults=${num}`;
    const urlB = `${baseURL}?part=snippet&playlistId=${pidB}&key=${api_key}&maxResults=${num}`;

    //전달된 queryKey 옵션 값에 따라서 최종 요청 url변경 후, fetch 요청
    queryKey[1].type === 'A' && (url = urlA);
    queryKey[1].type === 'B' && (url = urlB); 

    //promise를 반환하는 함수 앞쪽에 await 등록하면 해당함수가 아무리 시간오래걸려도 결과값이 완료될때까지 다음구문이 동기적으로 holding 
    const data = await fetch(url);
    const json = await data.json();
    return json.items;

};

//useQuery기능이 내장된 실제 호출될 커스텀훅
export const useYoutubeQuery = ( opt = {type : 'A'}) => {
    return useQuery({
        //결과적으로 커스텀 훅 호출시 옵션값을 쿼리키의 배열의 두번째 요소에 등록하면 해당 옵션값에 따른 고유쿼리키가 자동 생성
        queryKey : ['youtubeList' , opt],
        queryFn : fetchYoutube,
        staleTime : 1000 * 60,
        gcTime : 1000 * 60
    });
};

/*
1. 유튜브 데이터 fetching 함수(전달될 인수값 필요)

2. uesQuery를 활용한 커스텀훅 함수
- queryKey : 요청  url을 활용해서 각 서버 데이터마다의 고유 쿼리키를 배열형태로 등록
- queryFn : 위에서 미리 제작한 유튜브 fetching 함수 등록
- stateTime : 불러온 서버데이터의 refetching 금지 시간을 설정
- gcTime : 더이상 사용되지 않는 서버데이터를 메모리 해제까지의 시간 설정

위의 useQuery를 활용한 커스텀훅으로부터 반환된 데이터는 미리 설정한 옵션대로 브라우저단에서 캐싱처리되며 재활용, 데이터가 변경되면(요청url, 쿼리키 값)이 달리지면 다시 새롭게 fetching

3. useQuery가 쿼리키를 통해서 관리하는 서버사이드 데이터의 4가지 상태 
- pending : 데이터 요청후 응답받기까지의 상태
- fresh : 데이터를 최신상태로 인식해서 재요청할 필요가 없는 상태
- stale : 데이터를 오래된 상태로 인식해서 재요청할 필요가 없는 상태
- inactive : 현재 출력되고 있는 컴포넌트에 사용되고 있지 않는 상태

서버데이터가 컴포넌트에서 활용되다가 해당 서버데이터를 활용하지 않는 다른 컴포넌트 마운트시
해당서버 데이터는 inactive상태로 전환됨
- inactive 상태에 돌입하면 그때부터 작업자가 실정한 gcTime이 소진되기 시작
- inactive 상태에서 gcTime이 소진완료되면 garbage collection 처리됨(메모리에서 해제됨)
*/