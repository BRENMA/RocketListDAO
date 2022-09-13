import WalletBtn from './components/walletButton';
import { useMemo, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";

const App = () => {
  return (
    <div>
      <ToastContainer theme="dark" hideProgressBar/>
      <WalletBtn />
      <Suspense fallback = {<h1 id="loading">loading...</h1>}>
        <Routes>
          <Route path="/" element = {<Home />} />
        </Routes>
      </Suspense>
    </div>
  )
}
export default App;