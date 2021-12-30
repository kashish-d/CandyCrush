import { useContext } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import LevelContext from '../store/levelContext';

function LevelPage() {
    const levelCtx = useContext(LevelContext);
    let content = [];
    for (let i = 1; i <= 15; i++) {
        content.push(
            <div
                className='level-item'
                data-id={i}
                onClick={(e) => {
                    levelCtx.setCustomLevel(
                        parseInt(e.target.parentElement.getAttribute('data-id'))
                    );
                }}
            >
                <Link className='level-item-link' to='/game'>
                    {i}
                </Link>
            </div>
        );
    }

    return (
        <div className='levelPage'>
            {content}
            <BackButton />
        </div>
    );
}
export default LevelPage;
