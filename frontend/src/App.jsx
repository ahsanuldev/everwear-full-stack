import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'

// react toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Footer'
import Search from './components/Search'

const App = () => {

    useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://api.labtoai.com/widget.js";
    script.setAttribute('data-api-key', "aiw_live_72fcd037176f7a8afd7117db8c47f495d0f848d0cb4251be");
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Search />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/collection' element={<Collection />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/product/:productId' element={<Product />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/place-order' element={<PlaceOrder />}/>
        <Route path='/orders' element={<Orders />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
