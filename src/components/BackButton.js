import { Link } from 'react-router-dom';

function BackButton() {
    return (
        <button className='backButton'>
            <Link to='/' className='buttonText'>
                ↩
            </Link>
        </button>
    );
}
export default BackButton;
