import { createContext, useState } from 'react';

const LevelContext = createContext({
    currentLevel: 1,
    goToNextLevel: () => {},
    setCustomLevel: () => {},
    resetLevelToZero: () => {},
    LevelCompleted: false,
    setLevelCompleted: () => {},
});

export function LevelContextProvider(props) {
    const [levelIsCompleted, setLevelIsCompleted] = useState(false);
    const [level, setLevel] = useState(1);

    function goToNextLevelHandler() {
        setLevel((levelDisplay) => levelDisplay + 1);
        console.log(level);
    }

    function resetLevelToZeroHandler() {
        setLevel(1);
    }

    function setLevelCompletedHandler(answer) {
        setLevelIsCompleted(answer);
    }
    function setCustomLevelHandler(params) {
        setLevel(params);
    }

    const context = {
        currentLevel: level,
        goToNextLevel: goToNextLevelHandler,
        setCustomLevel: setCustomLevelHandler,
        resetLevelToZero: resetLevelToZeroHandler,
        LevelCompleted: levelIsCompleted,
        setLevelCompleted: setLevelCompletedHandler,
    };

    return (
        <LevelContext.Provider value={context}>
            {props.children}
        </LevelContext.Provider>
    );
}

export default LevelContext;
