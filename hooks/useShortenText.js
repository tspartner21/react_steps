export default function useShortenText() {
	//파라미터로 사용자 이름을 입력받아 콘솔문을 출력하는 함수자체를 반환
	// return user_name => {
	// 	console.log(`Hello ${user_name}`);
	// };
	return (text, len) => {
		return text.length > len ? text.substr(0 , len) + '...' : text; 
			

	};
}
