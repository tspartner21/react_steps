import { useTranslation } from 'react-i18next';
import '../../i18n'; // i18n 초기화

export default function Intro(){
    const { t, i18n } = useTranslation();

	const changeLanguage = (lang) => {
	i18n.changeLanguage(lang);
	};

    return(
        
        <div className='intro'>
            <h1>{t('welcome')}</h1>
            <p>{t('description')}</p>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('ko')}>한국어</button>
        </div>

    );
}