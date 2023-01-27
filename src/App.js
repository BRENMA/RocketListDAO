import { Suspense } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";
import Landing from './pages/landing';

const App = () => {
  return (
    <div>
      <ToastContainer theme="dark" hideProgressBar/>
      <Suspense fallback = {<h1 id="loading">loading...</h1>}>
        <Routes>
          <Route path="/" element = {<Landing />} />
        </Routes>
        <Routes>
          <Route path="/app" element = {<Home />} />
        </Routes>
        <Routes>
          <Route path="/about" element = {<Home />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;