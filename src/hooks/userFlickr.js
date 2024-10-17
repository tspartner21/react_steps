import { useQuery } from "@tanstack/react-query"; 

//아래 커스텀 훅에서 활용될 fetching 함수
//순서4 - useQuery를 통해서 전달된 opt값을 비구조화할당으로 queryKey로 뽑아서 fetching함수 내부로 전달
const fetchFlickr = async ({ queryKey }) => {
    const baseURL = 'https://www.flickr.com/services/rest/';
    const method_mine = 'flickr.people.getPhotos';
    const method_interest = 'flickr.interestingness.getList';
    const method_search = 'flickr.photos.search';
    const flickr_api = import.meta.env.VITE_FLICKR_API;
    const myID = '197119297@N02';
    const num = 20;
    let url = '';
    const urlMine = `${baseURL}?method=${method_mine}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;
    const urlInterest = `${baseURL}?method=${method_interest}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json`;
    const urlSearch = `${baseURL}?method=${method_search}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json&tags=${queryKey[1].tag}`;

	queryKey[1].type === 'mine' && (url = urlMine);
	queryKey[1].type === 'interest' && (url = urlInterest);
	queryKey[1].type === 'search' && (url = urlSearch);


    const data = await fetch(url);
    const json = await data.json();

    return json.photos.photo;
    
}


//useQuery기능이 내장된 실제 호출될 커스텀
export const useFlickrQuery = (opt = {type : 'mine'}) =>{
    return useQuery({
    //결과적으로 커스텀 훅 호출시 옵션값을 쿼리키의 배열의 두번째 요소에 등록하면 해당
    //옵션값에 따른 고유 쿼리키가 자동생성
    queryKey : ['FlickrList',  opt],
    queryFn : fetchFlickr,
    staleTime : 1000 * 60,
    gcTime : 1000 * 60
    });
};

