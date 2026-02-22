
import './App.css'
import LoginPage from './components/Auth/Login'
import SigninPage from './components/Auth/Signin'
import HistoryPage from './components/HistorySection/HistoryPage'
import LandingPage from './components/LandingPage2/MainSection'
import Navigation from './components/LandingPage2/Navigation'
import GameBoard from './components/MainGameSection/GameBoard'
import GameLandingPage from './components/MainGameSection/GameLandingPage'
import './index.css'
import { BrowserRouter, Route,Routes} from 'react-router-dom'
function App() {
  return (
    <div className="w-full h-full bg-chess-darker">
      <BrowserRouter>
          {/* <Navigation/> */}
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SigninPage/>}/>
          <Route path="/game" element={<GameLandingPage/>}/>
          <Route path='/history' element={<HistoryPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
