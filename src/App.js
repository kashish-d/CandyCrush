import { Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import HomePage from './pages/Homepage';
import LevelPage from './pages/LevelPage';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' exact element={<HomePage />} />
                <Route path='/game' element={<Game />} />
                <Route path='/levels' element={<LevelPage />} />
            </Routes>
        </div>
    );
}
export default App;
