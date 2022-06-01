import './App.css';
import { Route,Routes} from 'react-router-dom';
import Chat from './components/Chat';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Info from './components/Info';
import Feedback from './components/Feedback';
import Display from './components/Display';


function App() {
  return (
    <div Name="App">
    
    <Routes>
    <Route exact path="/signup" element={<SignUp/>}/>
    <Route exact path="/" element={<Display/>}/>
    <Route exact path="/login" element={<SignIn/>}/>
    <Route exact path="/chat" element={<Chat/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/info" element={<Info/>}/>
    <Route path="feedback" element={<Feedback/>}/>
    </Routes>

    </div>
  );
}

export default App;
