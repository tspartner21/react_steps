//리액트 객체가 생성한 리액트 요소를 일반돔으로 변환하는 객체
import ReactDOM from "react-dom/client";
//루트 컴포넌트 (리액트 요소를 반환해주는 함수)
import App from "./App.jsx";
//루트 컴포넌트에 적용할 전체 스타일 파일
import "./styles/index.scss";

//App이라는 마스터 컴포넌트 내용을 돔형태로 구현해서 index.html의 #root요소안에 넣어주는 기능
ReactDOM.createRoot(document.getElementById("root")).render( <App />);
