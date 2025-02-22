import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Header from './components/common/Header';
//import Footer from './components/common/Footer';
import DonationCenter from './components/DonationCenter';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/*<Header />*/}
        <main className="main-content">
          <Routes>
            {/* Your other routes would go here */}
            <Route path="/" element={<DonationCenter />} />
          </Routes>
        </main>
        {/*<Footer />*/}
      </div>
    </Router>
  );
}

export default App;