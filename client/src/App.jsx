import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import VisionMode from './pages/VisionMode';
import CommunicationMode from './pages/CommunicationMode';
import MobilityMode from './pages/MobilityMode';
import { getText } from './utils/translations';

function getInitialPage() {
  const page = window.location.hash.replace('#/', '');
  return ['vision', 'communication', 'mobility'].includes(page) ? page : 'home';
}

export default function App() {
  const [page, setPage] = useState(getInitialPage);
  const [language, setLanguage] = useState('en');
  const text = (key) => {
    return getText(language, key);
  };

  function navigate(nextPage) {
    setPage(nextPage);
    window.location.hash = nextPage === 'home' ? '/' : `/${nextPage}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-shell">
      <Header language={language} onLanguageChange={setLanguage} onHome={() => navigate('home')} />
      {page === 'home' && <Home text={text} onNavigate={navigate} />}
      {page === 'vision' && <VisionMode language={language} text={text} onBack={() => navigate('home')} />}
      {page === 'communication' && <CommunicationMode text={text} onBack={() => navigate('home')} />}
      {page === 'mobility' && <MobilityMode text={text} onBack={() => navigate('home')} />}
      <footer className="site-footer"><span>Accessible India</span><span>{getText(language, 'tagline')}</span><span>Built for equal access.</span></footer>
    </div>
  );
}