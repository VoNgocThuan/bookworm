import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Home from './pages/home/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import BookDetail from './pages/detail/BookDetail';
import Shop from './pages/shop/Shop';
import LoginModal from './pages/login/LoginModal';
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers/index";
import Cart from './pages/cart/Cart';
import About from './pages/about/About';

const store = createStore(reducers);

function App() {
  return (
    <div className="App">

      <Header></Header>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
      <LoginModal></LoginModal>
      <Footer></Footer>
    </div>
  );
}

export default App;

if (document.getElementById('root')) {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
}