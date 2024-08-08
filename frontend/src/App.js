import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer'
import SignUp from './components/SignUp';
import LogIn from './components/LogIn'
import AddProduct from './components/AddProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Private from './components/Private';
import ProductList from './components/ProductList'
import UpdateProduct from './components/UpdateProduct';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route element={<Private />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/logout" element={<h1>Logout Products Component</h1>} />
          <Route path="/profile" element={<h1>Profile Products Component</h1>} />
          </Route>
          
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn/>} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
