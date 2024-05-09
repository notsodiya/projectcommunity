import React, { useState } from 'react';
import './Navbar.css'; // Assuming you have a corresponding CSS file for styling
import Home from '../Home/Home';

// Navbar component
const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  // Event listener for scrolling
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  // Attach scroll listener when component mounts
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleActiveLink = () => {
    const currentPath = window.location.pathname;
    setActiveLink(currentPath);
  };

  return (
    <nav className={isSticky ? 'nav sticky' : 'nav'}>
      <div className="nav-content">
        <div className="logo">
          <a href="#">commUnity connect</a>
        </div>
        <ul className="nav-links">
          <li><a href="/profile" className={activeLink === '/profile' ? 'active' : ''}>Profile</a></li>
          <li><a href="/familymembers" className={activeLink === '/familymembers' ? 'active' : ''}>Family Members</a></li>
          <li><a href="/communityMembers" className={activeLink === '/communityMembers' ? 'active' : ''}>Community Members</a></li>
          <li><a href="/insertmembers" className={activeLink === '/insertmembers' ? 'active' : ''}>Insert Members</a></li>
          <li><a href="/advertisement" className={activeLink === '/advertisement' ? 'active' : ''}>Advertisement</a></li>
          <li><a href="/showads" className={activeLink === '/showads' ? 'active' : ''}>Show Ads</a></li>
          <li><a href="/loginregister" className={activeLink === '/loginregister' ? 'active' : ''}>Logout</a></li>
        </ul>
      </div>
    </nav>
  );
};

// MainContent component
const MainContent = () => {
  return (
    <div className="main-content">
      <section className="home">
        <div className="text">
          <h2 className='h2fornavbar' >Sticky Navigation Bar</h2>
          {/* Your content here */}
        </div>
      </section>
      <div className="text">
        {/* More content here */}
      </div>
    </div>
  );
};

// App component
const App = () => {
  return (
    <div className="App">
      <Navbar />
      {/* <Home /> */}
    </div>
  );
};

export default App;
