import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Home from "./components/main/Home";
import Intro from "./components/main/Intro";
import Contact from "./components/sub/Contact";
import Gallery from "./components/sub/Gallery";
import Members from "./components/sub/Members";
import Posts from "./components/sub/Posts";
import Youtube from "./components/sub/Youtube";
import { Route, Routes } from "react-router-dom";

export default function App() {


	return (
		
				<>
			
			
				<Header/>

				{/* <Intro/> */}

				<Routes>
					<Route path='/home' element={<Home/>}/>
					<Route path='/members' element={<Members/>}/>
					<Route path='/gallery' element={<Gallery/>}/>
					<Route path='/youtube' element={<Youtube/>}/>
					<Route path='/contact' element={<Contact/>}/>
					<Route path='/posts' element={<Posts/>}/>		
				</Routes>


				<Footer/>

				</>		
			
	);
}


