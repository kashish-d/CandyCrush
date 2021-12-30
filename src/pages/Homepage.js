import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LevelContext from '../store/levelContext';
import ch1 from '../images/ch1.png';
import Loading from '../components/loading';

function HomePage() {
    const levelCtx = useContext(LevelContext);
    // const [isLoading,setIsLoading] = useState(true);

    // if(isLoading){
    //     return <Loading />;
    // }

    return (
        <div className='home'>
            <div className='logo'>
                <img src={ch1} alt='cartoon' />
                <div className='logo-name'>
                    <h1>Kashish's</h1>
                    <h1>CandyCrush</h1>
                </div>
                <img src={ch1} alt='cartoon' />
            </div>
            <div className='home-menu'>
                <h3>
                    <Link to='/game' className='homeMenuButton'>
                        Continue
                        <span>Level: {levelCtx.currentLevel}</span>
                    </Link>
                </h3>
                <h3>
                    <Link to='/levels' className='homeMenuButton pink'>
                        Levels
                    </Link>
                </h3>
                <h3 onClick={() => levelCtx.resetLevelToZero()}>
                    <Link to='/game' className='homeMenuButton red'>
                        New Game
                    </Link>
                </h3>
            </div>
            <p>Developed By: Kashish Dhingra</p>
        </div>
    );
}
export default HomePage;
