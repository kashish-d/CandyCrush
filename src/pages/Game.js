/* eslint-disable react-hooks/exhaustive-deps*/
import { useContext, useEffect, useState } from 'react';
import ScoreBoard from '../components/ScoreBoard';
import blueCandy from '../images/blue-candy.png';
import greenCandy from '../images/green-candy.png';
import orangeCandy from '../images/orange-candy.png';
import purpleCandy from '../images/purple-candy.png';
import redCandy from '../images/red-candy.png';
import yellowCandy from '../images/yellow-candy.png';
import blank from '../images/blank.png';

import a1 from '../images/a1.png';
import a2 from '../images/a2.png';
import a3 from '../images/a3.png';
import a4 from '../images/a4.png';
import a5 from '../images/a5.png';
import a6 from '../images/a6.png';

import BackButton from '../components/BackButton';
import Modal from '../components/Modal';
import LevelContext from '../store/levelContext';

function Game() {
    const levelCtx = useContext(LevelContext);

    const width = 8;
    // const candyColors = [a1, a2, a3, a4, a5, a6];
    const candyColors = [
        blueCandy,
        greenCandy,
        orangeCandy,
        purpleCandy,
        redCandy,
        yellowCandy,
    ];

    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
    const [squareBeingDragged, setSquareBeingDragged] = useState(null);
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
    const [scoreDisplay, setScoreDisplay] = useState(0);
    const [movesPending, setMovesPending] = useState(25);

    function checkForColumnOfThree() {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === blank;

            if (
                columnOfThree.every(
                    (square) =>
                        currentColorArrangement[square] === decidedColor &&
                        !isBlank
                )
            ) {
                setScoreDisplay((score) => score + 3);
                columnOfThree.forEach(
                    (square) => (currentColorArrangement[square] = blank)
                );
                return true;
            }
        }
    }
    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === blank;
            // console.log(columnOfThree);

            if (
                columnOfFour.every(
                    (square) =>
                        currentColorArrangement[square] === decidedColor &&
                        !isBlank
                )
            ) {
                setScoreDisplay((score) => score + 4);
                columnOfFour.forEach(
                    (square) => (currentColorArrangement[square] = blank)
                );
                return true;
            }
        }
    };
    const checkForRowOfThree = () => {
        for (let i = 0; i <= 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === blank;

            const notValid = [
                6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
            ];
            if (notValid.includes(i)) {
                continue;
            }

            if (
                rowOfThree.every(
                    (square) =>
                        currentColorArrangement[square] === decidedColor &&
                        !isBlank
                )
            ) {
                setScoreDisplay((score) => score + 3);
                rowOfThree.forEach(
                    (square) => (currentColorArrangement[square] = blank)
                );
                return true;
            }
        }
    };
    const checkForRowOfFour = () => {
        for (let i = 0; i <= 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === blank;

            const notValid = [
                5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46,
                47, 53, 54, 55, 62, 63, 64,
            ];
            if (notValid.includes(i)) {
                continue;
            }

            if (
                rowOfFour.every(
                    (square) =>
                        currentColorArrangement[square] === decidedColor &&
                        !isBlank
                )
            ) {
                setScoreDisplay((score) => score + 4);
                rowOfFour.forEach(
                    (square) => (currentColorArrangement[square] = blank)
                );
                return true;
            }
        }
    };

    function moveIntoSquareBelow() {
        for (let i = 0; i < 64 - width; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];

            if (firstRow.includes(i) && currentColorArrangement[i] === blank) {
                currentColorArrangement[i] =
                    candyColors[Math.floor(Math.random() * candyColors.length)];
            }

            if (currentColorArrangement[i + width] === blank) {
                currentColorArrangement[i + width] = currentColorArrangement[i];
                currentColorArrangement[i] = blank;
            }
        }
    }

    const dragStart = (e) => {
        setSquareBeingDragged(e.target);
    };
    const dragDrop = (e) => {
        setSquareBeingReplaced(e.target);
    };
    const dragEnd = () => {
        const squareBeingDraggedId = parseInt(
            squareBeingDragged.getAttribute('data-id')
        );
        const squareBeingReplacedId = parseInt(
            squareBeingReplaced.getAttribute('data-id')
        );

        currentColorArrangement[squareBeingReplacedId] =
            squareBeingDragged.getAttribute('src');
        currentColorArrangement[squareBeingDraggedId] =
            squareBeingReplaced.getAttribute('src');

        // console.log('squareBeingDraggedId', squareBeingDraggedId);
        // console.log('squareBeingReplacedId', squareBeingReplacedId);

        const isAColumnOfFour = checkForColumnOfFour();
        const isARowOfFour = checkForRowOfFour();
        const isAColumnOfThree = checkForColumnOfThree();
        const isARowOfThree = checkForRowOfThree();

        const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width,
        ];
        // console.log(validMoves);
        const validMove = validMoves.includes(squareBeingReplacedId);
        // console.log(validMove);

        if (
            squareBeingReplacedId &&
            validMove &&
            (isAColumnOfFour ||
                isAColumnOfThree ||
                isARowOfFour ||
                isARowOfThree)
        ) {
            setMovesPending((moves) => moves - 1);
            setSquareBeingReplaced(null);
            setSquareBeingDragged(null);
        } else {
            currentColorArrangement[squareBeingDraggedId] =
                squareBeingDragged.getAttribute('src');
            currentColorArrangement[squareBeingReplacedId] =
                squareBeingReplaced.getAttribute('src');
            setCurrentColorArrangement([...currentColorArrangement]);
        }
    };

    function createBoard() {
        const randomColorArrangement = [];
        for (let i = 0; i < width ** 2; i++) {
            const randomColor =
                candyColors[Math.floor(Math.random() * candyColors.length)];
            randomColorArrangement.push(randomColor);
        }
        setCurrentColorArrangement(randomColorArrangement);
        console.log('done');
    }

    function levelAdvance() {
        if (scoreDisplay >= 20 * levelCtx.currentLevel) {
            levelCtx.setLevelCompleted(true);
            levelCtx.goToNextLevel();
            setScoreDisplay(0);
        }
    }

    useEffect(() => {
        createBoard();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveIntoSquareBelow();
            levelAdvance();
            setCurrentColorArrangement([...currentColorArrangement]);
        }, 100);
        return () => clearInterval(timer);
    }, [
        checkForColumnOfFour,
        checkForRowOfFour,
        checkForColumnOfThree,
        checkForRowOfThree,
        moveIntoSquareBelow,
        currentColorArrangement,
    ]);
    let content;
    if (levelCtx.LevelCompleted || movesPending < 1) {
        content = <Modal />;
    } else {
        content = '';
    }
    return (
        <div className='app'>
            <div className='game'>
                {currentColorArrangement.map((candyColor, index) => (
                    <img
                        key={index}
                        src={candyColor}
                        alt={candyColor}
                        data-id={index}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                        onTouchStart={dragStart}
                        onTouchEnd={(e) => {
                            setSquareBeingReplaced(e.target);
                            dragEnd();
                        }}
                    />
                ))}
            </div>
            <ScoreBoard
                score={scoreDisplay}
                level={levelCtx.currentLevel}
                movesLeft={movesPending}
            />
            <BackButton />
            {content}
        </div>
    );
}

export default Game;
