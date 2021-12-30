import ch1 from '../images/ch1.png';

function ScoreBoard(params) {
    let scoreToComplete =
        params.level * 20 - params.score > 0
            ? params.level * 20 - params.score
            : 0;
    return (
        <div className='score-board'>
            <div className='score-panel'>
                <h2>Moves Pending: {params.movesLeft}</h2>
                <h2>Current Score: {params.score}</h2>
                <h2>Score to Complete: {scoreToComplete}</h2>
                <h1>Game Level: {params.level}</h1>
            </div>
            <div className='score-image'>
                <img src={ch1} alt='cartoon' />
            </div>
        </div>
    );
}

export default ScoreBoard;
