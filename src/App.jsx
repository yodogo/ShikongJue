import { useEffect } from 'react';
import './App.css';
import './index.css';
import './ffMode.css';

// Constants
import { GAME_STATES } from './constants/gameStates';

// Data
import { ALL_THEMES, poetryDB, COMMON_KEYWORDS } from './data';

// Components
import ThemeSelector from './components/ThemeSelector';
import CharacterSelector from './components/CharacterSelector';
import ModeSelection from './components/screens/ModeSelection';
import KeywordSelection from './components/screens/KeywordSelection';
import BattleResult from './components/screens/BattleResult';

// Arena Components
import BattleCharacter from './components/arena/BattleCharacter';
import PoetryStage from './components/arena/PoetryStage';
import FlyingFlowerArena from './components/arena/FlyingFlowerArena';
import BattleLogs from './components/arena/BattleLogs';

// UI Components
import HealthBar from './components/ui/HealthBar';
import SkillIndicator from './components/ui/SkillIndicator';

// Hooks
import { useBattleState } from './hooks/useBattleState';
import { useAnimations } from './hooks/useAnimations';
import { useKeyboardControls } from './hooks/useKeyboardControls';

// Services
import { battleService } from './services/battleService';
import { expandPoetryLibrary } from './data/poetryDatabase';
import { ANIMATION_STATES } from './constants/gameStates';

// Controls configuration
const PLAYER_1_CONTROLS = {
    MOVE_BACK: 'q',
    JUMP: 'w',
    MOVE_FORWARD: 'e',
    DODGE: 'r',
    SKILL_1: 'a',
    SKILL_2: 's',
    SKILL_3: 'd',
    BASIC_ATTACK: 'f',
    label: '1P: QWER移动 / ASDF攻击',
};

const PLAYER_2_CONTROLS = {
    MOVE_BACK: 'u',
    JUMP: 'i',
    MOVE_FORWARD: 'o',
    DODGE: 'p',
    SKILL_1: 'h',
    SKILL_2: 'j',
    SKILL_3: 'k',
    BASIC_ATTACK: 'l',
    label: '2P: UIOP移动 / HJKL攻击',
};

function App() {
    const {
        gameState,
        selectedTheme,
        battleMode,
        selectedKeyword,
        playerChar,
        enemyChar,
        battleLogs,
        battleInstance,
        winner,
        isPlayerTurn,
        playerHand,
        logEndRef,

        handleThemeSelect,
        handleModeSelect,
        handleKeywordSelect,
        handleStartBattle,
        setPlayerChar,
        setEnemyChar,
        setWinner,
        setIsPlayerTurn,
        setPlayerHand,
        setLogs,
        addLog,
        goToResult,
        scrollToLogEnd,
    } = useBattleState();

    const {
        p1State,
        p2State,
        p1DamageTexts,
        p2DamageTexts,
        inkSplashes,
        activeVerse,
        activeVerseOwner,
        setP1State,
        setP2State,
        addDamageText,
        addInkSplash,
        showVerse,
        resetAnimations,
    } = useAnimations();

    // Auto-scroll logs when they change
    useEffect(() => {
        scrollToLogEnd();
    }, [battleLogs, scrollToLogEnd]);

    // Handle starting a battle
    const handleStartBattleWrapper = (charKey) => {
        handleStartBattle(selectedTheme, charKey, battleMode, selectedKeyword, poetryDB);
        resetAnimations();
    };

    // Handle state update after battle action
    const handleStateUpdate = (result) => {
        setPlayerChar({ ...battleInstance.charA });
        setEnemyChar({ ...battleInstance.charB });
        setLogs(result.logs);
    };

    // Handle animation state change
    const handleAnimationChange = (playerNum, state) => {
        if (playerNum === 1) setP1State(state);
        else setP2State(state);
    };

    // Handle showing damage
    const handleDamageShow = (playerNum, damage) => {
        addDamageText(playerNum, `-${damage}`);
    };

    // Handle showing verse
    const handleVerseShow = (verse, source, owner) => {
        showVerse(verse, source, owner);
    };

    // Handle battle end
    const handleBattleEnd = (winningChar) => {
        setWinner(winningChar);
        setTimeout(() => goToResult(), 1500);
    };

    // Handle hand update (FF mode)
    const handleHandUpdate = (newHand) => {
        setPlayerHand(newHand);
    };

    // Handle FF round execution
    const executeFFRound = async (verse, source) => {
        if (gameState !== GAME_STATES.ARENA || !isPlayerTurn || winner) return;

        setIsPlayerTurn(false);

        await battleService.executeFFRound({
            battleInstance,
            playerChar,
            enemyChar,
            selectedKeyword,
            playerHand,
            verse,
            source,
            poetryDB,
            expandPoetryLibrary,
            onStateUpdate: handleStateUpdate,
            onAnimationChange: handleAnimationChange,
            onDamageShow: handleDamageShow,
            onVerseShow: handleVerseShow,
            onInkSplash: addInkSplash,
            onBattleEnd: handleBattleEnd,
            onHandUpdate: handleHandUpdate,
            onLogAdd: addLog,
        });

        setIsPlayerTurn(true);
    };

    // Handle standard combat action
    const executeCombatSequence = (attackerName, actionParams, playerNum) => {
        if (!battleInstance) return;

        battleService.executeCombatAction({
            battleInstance,
            attackerName,
            actionParams,
            playerNum,
            onStateUpdate: handleStateUpdate,
            onAnimationChange: handleAnimationChange,
            onDamageShow: handleDamageShow,
            onVerseShow: (verse, owner) => showVerse(verse, '', owner),
            onBattleEnd: handleBattleEnd,
        });
    };

    // Keyboard controls
    useKeyboardControls({
        onMovement: (playerNum, movementState) => {
            handleAnimationChange(playerNum, movementState);
            setTimeout(() => {
                handleAnimationChange(playerNum, ANIMATION_STATES.IDLE);
            }, 600);
        },
        onCombatAction: executeCombatSequence,
    }, {
        enabled: gameState === GAME_STATES.ARENA,
        isFfMode: battleMode === 'ff_mode',
        isP1Idle: p1State === ANIMATION_STATES.IDLE,
        isP2Idle: p2State === ANIMATION_STATES.IDLE,
        hasWinner: !!winner,
        playerCharName: playerChar?.name,
        enemyCharName: enemyChar?.name,
    });

    const isArenaBg = gameState === GAME_STATES.ARENA;

    return (
        <div
            className={`app-container ${isArenaBg ? 'arena-bg' : 'menu-bg'}`}
            style={isArenaBg && selectedTheme?.background ? {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${selectedTheme.background})`
            } : {}}
        >
            {/* Theme Selection */}
            {gameState === GAME_STATES.THEME_SELECTION && (
                <ThemeSelector themes={ALL_THEMES} onSelect={handleThemeSelect} />
            )}

            {/* Mode Selection (Poet only) */}
            {gameState === GAME_STATES.MODE_SELECTION && (
                <ModeSelection
                    onModeSelect={handleModeSelect}
                    onBack={() => handleThemeSelect(selectedTheme)}
                />
            )}

            {/* Keyword Selection (FF mode only) */}
            {gameState === GAME_STATES.KEYWORD_SELECTION && (
                <KeywordSelection
                    keywords={COMMON_KEYWORDS}
                    onSelect={handleKeywordSelect}
                    onBack={() => handleModeSelect(battleMode)}
                />
            )}

            {/* Character Selection */}
            {gameState === GAME_STATES.CHAR_SELECTION && (
                <CharacterSelector
                    theme={selectedTheme}
                    onSelect={handleStartBattleWrapper}
                    onBack={() => selectedTheme.id === 'poet'
                        ? handleModeSelect(battleMode)
                        : handleThemeSelect(selectedTheme)
                    }
                />
            )}

            {/* Battle Arena */}
            {gameState === GAME_STATES.ARENA && (
                <div className={`arena-wrapper ${battleMode === 'ff_mode' ? 'ff-arena-wrapper' : ''}`}>
                    {/* FF Mode Top Bar */}
                    {battleMode === 'ff_mode' && (
                        <FlyingFlowerArena
                            selectedKeyword={selectedKeyword}
                            isPlayerTurn={isPlayerTurn}
                        />
                    )}

                    <div className={`arena-container ${battleMode === 'ff_mode' ? 'ff-arena' : ''}`}>
                        {/* Player 1 Area */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <BattleCharacter
                                character={playerChar}
                                animationState={p1State}
                                damageTexts={p1DamageTexts}
                                isActiveSpeaker={activeVerseOwner === 1}
                                inkSplashes={inkSplashes}
                                controls={PLAYER_1_CONTROLS}
                                isPlayer1={true}
                                battleMode={battleMode}
                            />
                            <HealthBar character={playerChar} />
                            {battleMode === 'standard' && playerChar?.skills && (
                                <SkillIndicator
                                    skills={playerChar.skills}
                                    controls={PLAYER_1_CONTROLS}
                                    isIdle={p1State === ANIMATION_STATES.IDLE}
                                />
                            )}
                        </div>

                        {/* Poetry Stage (Central Area) */}
                        <PoetryStage
                            activeVerse={activeVerse}
                            activeVerseOwner={activeVerseOwner}
                            battleMode={battleMode}
                        />

                        {/* Player 2 Area */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <BattleCharacter
                                character={enemyChar}
                                animationState={p2State}
                                damageTexts={p2DamageTexts}
                                isActiveSpeaker={activeVerseOwner === 2}
                                inkSplashes={[]}
                                controls={PLAYER_2_CONTROLS}
                                isPlayer1={false}
                                battleMode={battleMode}
                            />
                            <HealthBar character={enemyChar} />
                            {battleMode === 'standard' && enemyChar?.skills && (
                                <SkillIndicator
                                    skills={enemyChar.skills}
                                    controls={PLAYER_2_CONTROLS}
                                    isIdle={p2State === ANIMATION_STATES.IDLE}
                                />
                            )}
                        </div>
                    </div>

                    {/* Battle Logs (Standard mode only) */}
                    {battleMode === 'standard' && (
                        <BattleLogs logs={battleLogs} ref={logEndRef} />
                    )}

                    {/* FF Mode Hand Container (Bottom) */}
                    {battleMode === 'ff_mode' && (
                        <div className="ff-hand-container">
                            {playerHand.length > 0 ? (
                                playerHand.map((verse, index) => (
                                    <div
                                        key={index}
                                        className={`poetry-card ${!isPlayerTurn ? 'disabled' : ''}`}
                                        onClick={() => isPlayerTurn && executeFFRound(verse.text, verse.source)}
                                    >
                                        <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', lineHeight: '1.4' }}>
                                            {verse.text}
                                        </p>
                                        <small style={{ marginTop: 'auto' }}>— {verse.author}</small>
                                    </div>
                                ))
                            ) : (
                                <p>你已经词穷了...</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Result Screen */}
            {gameState === GAME_STATES.RESULT && (
                <BattleResult winner={winner} onRestart={() => handleThemeSelect(null)} />
            )}
        </div>
    );
}

export default App;
