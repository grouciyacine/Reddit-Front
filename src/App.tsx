import './App.scss';
import Home from './screen/Home';
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import Upload from './screen/Upload';
import Comment from './screen/Comment';
function App() {


  return (
    <div className={true ? 'App dark-theme' : 'App white-theme'}>
      <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/Upload'  element={<Upload/>}/>
        <Route path='/Comment/:id/:userId' element={<Comment/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
