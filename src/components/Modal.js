import { useContext } from 'react';
import { Link } from 'react-router-dom';
import LevelContext from '../store/levelContext';
import ch2 from '../images/ch2.png';
import ch3 from '../images/Tiffi-sad.png';

function Modal() {
    let content;
    let image;
    const levelCtx = useContext(LevelContext);
    if (levelCtx.LevelCompleted) {
        content = <h1>Woohoo!! You won!</h1>;
        image = ch2;
    } else {
        content = <h1>Oops! Better luck next time..</h1>;
        image = ch3;
    }
    return (
        <div className='modal-outer'>
            <div className='modal-box'>
                <div className='modal-info'>
                    <div>
                        <img src={image} alt='cartoon' />
                    </div>
                    {content}
                </div>
                <button onClick={() => levelCtx.setLevelCompleted(false)}>
                    <Link to='/' className='modal-btn-link'>
                        Continue
                    </Link>
                </button>
            </div>
        </div>
    );
}
export default Modal;
