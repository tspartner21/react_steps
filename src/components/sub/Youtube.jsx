import { useState, useEffect, useCallback } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import useShortenText from '../../hooks/useShortenText';
import useCombineText from '../../hooks/useCombineText';
import { Link } from 'react-router-dom';
import Content from '../common/Content';
import { useYoutubeQuery } from '../../hooks/useYoutube';

export default function Youtube() {
	const shortenText = useShortenText();
	const combineText = useCombineText();

	//useQuery 기능이 내장된 유튜브 데이터 가져오는 커스텀 훅
	//useQuery가 반환하는 결과값 중 자주쓰는 프로퍼티 정리
	//data : 실제 반환 받은 서버데이터 / isPending: 요청대기 유무 / isError : 데이터반환 실패 유무 / error : 데이터요청 반환받는 에러 정보객체
	//아래와 같이 리액트쿼리를 활용한 커스텀훅으로 서버데이터를 받으면 기존처럼 지저분하게 useState, useEffect, useCallback 훅을 사용할 필요가 없음
	const {data : Vids ,isPending} = useYoutubeQuery( {type : 'B'});
	console.log(Vids);

	return (
		<Layout title={'YOUTUBE'}>
			<Content delay={1}>
				{isPending && <p> Loading... </p>}
				{Vids?.map((vid, idx) => {
					return (
						<article key={idx}>
							<h3>
								<Link to={'/youtube/' + vid.id}>{shortenText(vid.snippet.title, 60)}</Link>
							</h3>
							<div className='txt'>
								<p>{shortenText(vid.snippet.description, 150)}</p>
								<span>{combineText(vid.snippet.publishedAt.split('T')[0], '-', '.')}</span>
							</div>
							<Pic className='thumb' src={vid.snippet.thumbnails.high.url} />
						</article>
					);
				})}
			</Content>
		</Layout>
	);
}
