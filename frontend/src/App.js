import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import RegisterScreen from './screens/LoginScreen'

const App = () => {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeScreen />} />
                        <Route
                            path='/product/:id'
                            element={<ProductScreen />}
                        />
                        <Route path='/cart/' element={<CartScreen />} />
                        <Route path='/cart/:id' element={<CartScreen />} />
                        <Route path='/login' element={<LoginScreen />} />
                        <Route path='/profile' element={<ProfileScreen />} />
                        <Route path='/shipping' element={<ShippingScreen />} />
                        <Route path='/register' element={<RegisterScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default App
