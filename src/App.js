import { Suspense } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Landing from './pages/landing';
import Dao from './pages/dao';
import CreateDao from './pages/createDao';
import { useState, useEffect } from 'react';

const App = () => {
  const [mobile, setMobile] = useState(window.innerWidth <= 675);

  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 675);
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  if (mobile) {
    return (
      <div className="mainContainer">
        <h1 className='description'>Welcome to RocketListDAO</h1>
        <p className='innerText'>mobile coming soon</p>
      </div>
    )
  }

  return (
    <div>
      <ToastContainer theme="dark" hideProgressBar position='bottom-right'/>
      <Suspense fallback = {<h1 id="loading">loading...</h1>}>
        <Routes>
          <Route path="/" element = {<Landing />} />
        </Routes>
        <Routes>
          <Route path="/app" element = {<Dao />} />
        </Routes>
        <Routes>
          <Route path="/app/create" element = {<CreateDao />} />
        </Routes>
        <Routes>
          <Route path="/about" element = {<Dao />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;