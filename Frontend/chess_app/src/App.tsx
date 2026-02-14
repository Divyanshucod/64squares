
import './App.css'
import LoginPage from './components/Auth/Login'
import SigninPage from './components/Auth/Signin'
import LandingPage from './components/LandingPage2/MainSection'
import './index.css'
import { BrowserRouter, Route,Routes} from 'react-router-dom'
function App() {
  return (
    <div className="w-full bg-chess-darker">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SigninPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
