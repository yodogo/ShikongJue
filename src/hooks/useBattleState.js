import { useState, useCallback, useRef } from 'react';
import { BattleEngine } from '../core/BattleEngine';
import { GAME_STATES } from '../constants/gameStates';

/**
 * Custom hook for managing battle state
 * Handles battle initialization, execution, and state updates
 */
export function useBattleState() {
    const [gameState, setGameState] = useState(GAME_STATES.THEME_SELECTION);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [battleMode, setBattleMode] = useState('standard');
    const [selectedKeyword, setSelectedKeyword] = useState(null);
    const [playerChar, setPlayerChar] = useState(null);
    const [enemyChar, setEnemyChar] = useState(null);
    const [battleLogs, setBattleLogs] = useState([]);
    const [battleInstance, setBattleInstance] = useState(null);
    const [winner, setWinner] = useState(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [playerHand, setPlayerHand] = useState([]);

    const logEndRef = useRef(null);

    // Auto-scroll to bottom of logs
    const scrollToLogEnd = () => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Navigation handlers
    const goToThemeSelection = useCallback(() => {
        setGameState(GAME_STATES.THEME_SELECTION);
    }, []);

    const goToModeSelection = useCallback(() => {
        setGameState(GAME_STATES.MODE_SELECTION);
    }, []);

    const goToKeywordSelection = useCallback(() => {
        setGameState(GAME_STATES.KEYWORD_SELECTION);
    }, []);

    const goToCharSelection = useCallback(() => {
        setGameState(GAME_STATES.CHAR_SELECTION);
    }, []);

    const goToArena = useCallback(() => {
        setGameState(GAME_STATES.ARENA);
    }, []);

    const goToResult = useCallback(() => {
        setGameState(GAME_STATES.RESULT);
    }, []);

    // Theme selection handler
    const handleThemeSelect = useCallback((theme) => {
        if (!theme) {
            // Return to theme selection screen
            setSelectedTheme(null);
            setBattleMode('standard');
            setSelectedKeyword(null);
            setPlayerChar(null);
            setEnemyChar(null);
            setBattleInstance(null);
            setWinner(null);
            setPlayerHand([]);
            goToThemeSelection();
            return;
        }

        setSelectedTheme(theme);
        if (theme.id === 'poet') {
            goToModeSelection();
        } else {
            setBattleMode('standard');
            goToCharSelection();
        }
    }, [goToThemeSelection, goToModeSelection, goToCharSelection]);

    // Mode selection handler
    const handleModeSelect = useCallback((mode) => {
        setBattleMode(mode);
        if (mode === 'ff_mode') {
            goToKeywordSelection();
        } else {
            goToCharSelection();
        }
    }, [goToKeywordSelection, goToCharSelection]);

    // Keyword selection handler
    const handleKeywordSelect = useCallback((keyword) => {
        setSelectedKeyword(keyword);
        goToCharSelection();
    }, [goToCharSelection]);

    // Start battle handler
    const handleStartBattle = useCallback((theme, charKey, battleMode, selectedKeyword, poetryDB) => {
        const characters = theme.characters;
        const player = { ...characters[charKey] };
        const enemyKey = Object.keys(characters).find(k => k !== charKey);
        const enemy = { ...characters[enemyKey] };

        const engine = new BattleEngine(player, enemy);

        if (battleMode === 'ff_mode' && selectedKeyword) {
            engine.setKeyword(selectedKeyword);
            // poetryDB is the actual DB object, access keyword directly
            const allVerses = (poetryDB && poetryDB[selectedKeyword]) ? poetryDB[selectedKeyword] : [];
            const pHand = allVerses.filter(v => v.author === player.name);
            setPlayerHand(pHand);
        }

        setPlayerChar(player);
        setEnemyChar(enemy);
        setBattleInstance(engine);
        setBattleLogs(["战斗开始！" + (battleMode === 'ff_mode' ? ` 飞花令关键字：【${selectedKeyword}】` : "")]);
        setWinner(null);
        setIsPlayerTurn(true);
        goToArena();
    }, [goToArena]);

    // Add log entry
    const addLog = useCallback((log) => {
        setBattleLogs(prev => [...prev, log]);
    }, []);

    // Set battle logs (replaces entire log array)
    const setLogs = useCallback((logs) => {
        setBattleLogs(logs);
    }, []);

    return {
        // State
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

        // Setters
        setGameState,
        setSelectedTheme,
        setPlayerChar,
        setEnemyChar,
        setWinner,
        setIsPlayerTurn,
        setPlayerHand,
        setBattleInstance,

        // Navigation
        goToThemeSelection,
        goToModeSelection,
        goToKeywordSelection,
        goToCharSelection,
        goToArena,
        goToResult,

        // Handlers
        handleThemeSelect,
        handleModeSelect,
        handleKeywordSelect,
        handleStartBattle,
        addLog,
        setLogs,
        scrollToLogEnd,
    };
}
