import WalletBtn from './components/walletButton';
import { useMemo, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
//import { ToastContainer } from "react-toastify";
//import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";
import Landing from './pages/landing';

const App = () => {
  return (
    <div>
      <WalletBtn />
      <Suspense fallback = {<h1 id="loading">loading...</h1>}>
        <Routes>
          <Route path="/" element = {<Landing />} />
        </Routes>
        <Routes>
          <Route path="/app" element = {<Home />} />
        </Routes>
      </Suspense>
    </div>
  )
}

//const App = () => {
//  return (
//    <div>
//      <ToastContainer theme="dark" hideProgressBar/>
//      <WalletBtn />
//      <Suspense fallback = {<h1 id="loading">loading...</h1>}>
//        <Routes>
//          <Route path="/" element = {<Landing />} />
//        </Routes>
//        <Routes>
//          <Route path="/app" element = {<Home />} />
//        </Routes>
//      </Suspense>
//    </div>
//  )
//}
export default App;