import "./styles/index.css"
import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import OrderBuyerScreen from "./screens/OrderBuyerScreen"
import OrderSellerScreen from "./screens/OrderSellerScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import OrderListScreen from "./screens/OrderListScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import UserProfileScreen from "./screens/UserProfileScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import ProductCreateScreen from "./screens/ProductCreateScreen"
import FavouritesScreen from "./screens/FavouritesScreen"
import UserCertsScreen from "./screens/UserCertsScreen"
import CertScreen from "./screens/CertScreen"
import CertCreateScreen from "./screens/CertCreateScreen"
import CertEditScreen from "./screens/CertEditScreen"
import CertListScreen from "./screens/CertListScreen"
import ConversationScreen from "./screens/ConversationsScreen"

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-5'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/orders/buyer' component={OrderBuyerScreen} />
          <Route path='/orders/seller' component={OrderSellerScreen} />
          <Route path='/favourites' component={FavouritesScreen} />
          <Route path='/conversations' component={ConversationScreen} />
          <Route path='/new' component={ProductCreateScreen} />
          <Route path='/product/:id/edit' exact component={ProductEditScreen} />
          <Route path='/product/:id' exact component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/user/:id/listings' component={UserProfileScreen} />
          <Route path='/certificates' component={UserCertsScreen} exact />
          <Route path='/certificates/:id' component={CertScreen} exact />
          <Route path='/newcertificate' component={CertCreateScreen} exact />
          <Route
            path='/certificates/:id/edit'
            component={CertEditScreen}
            exact
          />
          <Route
            path='/admin/certificatelist'
            component={CertListScreen}
            exact
          />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist/' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
