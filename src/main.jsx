
//리액트 객체가 생성한 리액트 요소를 일반돔으로 변환하는 객체
import ReactDOM from "react-dom/client";
//루트 컴포넌트 (리액트 요소를 반환해주는 함수)
import App from "./App.jsx";
//루트 컴포넌트에 적용할 전체 스타일 파일
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//쿼리키 : 리액트가 서버데이터 fetching 시 데이터의 구분을 하기 위한 고유의 인식표
//리액트는 해당 쿼리키를 통해 서버데이터의 차이점을 구분
//서버 데이터마다의 쿼리키를 전역에서 모든 컴포넌트가 공유하기 위한 인스턴스 객체
const queryClient = new QueryClient();

//App이라는 마스터 컴포넌트 내용을 돔형태로 구현해서 index.html의 #root요소안에 넣어주는 기능
ReactDOM.createRoot(document.getElementById("root")).render( 
<QueryClientProvider client={queryClient}>
    <BrowserRouter>
          <App />
    </BrowserRouter>

    <ReactQueryDevtools />
</QueryClientProvider>
);