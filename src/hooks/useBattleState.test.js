import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBattleState } from './useBattleState';
import { poetTheme } from '../data/poetTheme';
import { warriorTheme } from '../data/warriorTheme';
import { poetryDB } from '../data/poetryDatabase';

describe('useBattleState - Flying Flower Mode', () => {
    it('should initialize player hand with correct poetry cards for selected keyword', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        act(() => {
            result.current.handleKeywordSelect('月');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'ff_mode', '月', poetryDB);
        });

        const playerHand = result.current.playerHand;
        expect(playerHand.length).toBeGreaterThan(0);
        expect(playerHand.every(v => v.author === '李白')).toBe(true);
        expect(playerHand.some(v => v.text.includes('月'))).toBe(true);
    });

    it('should initialize player hand with correct poetry cards for Su Shi', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        act(() => {
            result.current.handleKeywordSelect('月');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'suShi', 'ff_mode', '月', poetryDB);
        });

        const playerHand = result.current.playerHand;
        expect(playerHand.length).toBeGreaterThan(0);
        expect(playerHand.every(v => v.author === '苏轼')).toBe(true);
        expect(playerHand.some(v => v.text.includes('月'))).toBe(true);
    });

    it('should handle empty poetry database gracefully', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        act(() => {
            result.current.handleKeywordSelect('月');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'ff_mode', '月', null);
        });

        expect(result.current.playerHand).toEqual([]);
        expect(result.current.gameState).toBe('arena');
    });

    it('should handle unknown keyword gracefully', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        act(() => {
            result.current.handleKeywordSelect('未知');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'ff_mode', '未知', poetryDB);
        });

        expect(result.current.playerHand).toEqual([]);
        expect(result.current.gameState).toBe('arena');
    });

    it('should set up battle state correctly for FF mode', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        act(() => {
            result.current.handleKeywordSelect('花');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'ff_mode', '花', poetryDB);
        });

        expect(result.current.gameState).toBe('arena');
        expect(result.current.battleMode).toBe('ff_mode');
        expect(result.current.selectedKeyword).toBe('花');
        expect(result.current.playerChar.name).toBe('李白');
        expect(result.current.enemyChar.name).toBe('苏轼');
        expect(result.current.isPlayerTurn).toBe(true);
        expect(result.current.winner).toBe(null);
    });

    it('should return to theme selection when handleThemeSelect is called with null', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        act(() => {
            result.current.handleKeywordSelect('月');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'ff_mode', '月', poetryDB);
        });

        expect(result.current.gameState).toBe('arena');

        act(() => {
            result.current.handleThemeSelect(null);
        });

        expect(result.current.gameState).toBe('theme_selection');
        expect(result.current.selectedTheme).toBe(null);
        expect(result.current.battleMode).toBe('standard');
        expect(result.current.selectedKeyword).toBe(null);
        expect(result.current.playerChar).toBe(null);
        expect(result.current.enemyChar).toBe(null);
        expect(result.current.winner).toBe(null);
        expect(result.current.playerHand).toEqual([]);
    });

    it('should handle all available keywords for FF mode', () => {
        const keywords = ['月', '花', '酒', '春'];
        const { result } = renderHook(() => useBattleState());

        keywords.forEach(keyword => {
            act(() => {
                result.current.handleThemeSelect(poetTheme);
            });

            act(() => {
                result.current.handleModeSelect('ff_mode');
            });

            act(() => {
                result.current.handleKeywordSelect(keyword);
            });

            act(() => {
                result.current.handleStartBattle(poetTheme, 'liBai', 'ff_mode', keyword, poetryDB);
            });

            expect(result.current.playerHand.length).toBeGreaterThan(0);
            expect(result.current.playerHand.every(v => v.author === '李白')).toBe(true);
            expect(result.current.gameState).toBe('arena');
        });
    });

    it('should correctly assign enemy based on player selection in FF mode', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        act(() => {
            result.current.handleKeywordSelect('月');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'ff_mode', '月', poetryDB);
        });

        expect(result.current.playerChar.name).toBe('李白');
        expect(result.current.enemyChar.name).toBe('苏轼');

        act(() => {
            result.current.handleThemeSelect(null);
        });

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        act(() => {
            result.current.handleKeywordSelect('月');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'suShi', 'ff_mode', '月', poetryDB);
        });

        expect(result.current.playerChar.name).toBe('苏轼');
        expect(result.current.enemyChar.name).toBe('李白');
    });
});

describe('useBattleState - Warrior Mode', () => {
    it('should initialize battle correctly for warrior mode', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(warriorTheme);
        });

        act(() => {
            result.current.handleStartBattle(warriorTheme, 'guanYu', 'standard', null, poetryDB);
        });

        expect(result.current.gameState).toBe('arena');
        expect(result.current.battleMode).toBe('standard');
        expect(result.current.playerChar.name).toBe('关羽');
        expect(result.current.enemyChar.name).toBe('秦琼');
        expect(result.current.playerHand).toEqual([]);
        expect(result.current.isPlayerTurn).toBe(true);
        expect(result.current.winner).toBe(null);
    });

    it('should assign correct enemy for warrior mode', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(warriorTheme);
        });

        act(() => {
            result.current.handleStartBattle(warriorTheme, 'guanYu', 'standard', null, poetryDB);
        });

        expect(result.current.playerChar.name).toBe('关羽');
        expect(result.current.enemyChar.name).toBe('秦琼');

        act(() => {
            result.current.handleThemeSelect(null);
        });

        act(() => {
            result.current.handleThemeSelect(warriorTheme);
        });

        act(() => {
            result.current.handleStartBattle(warriorTheme, 'qinQiong', 'standard', null, poetryDB);
        });

        expect(result.current.playerChar.name).toBe('秦琼');
        expect(result.current.enemyChar.name).toBe('关羽');
    });

    it('should skip mode selection and go directly to char selection for warrior theme', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(warriorTheme);
        });

        expect(result.current.gameState).toBe('char_selection');
        expect(result.current.battleMode).toBe('standard');
    });

    it('should set correct character stats for warrior mode', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(warriorTheme);
        });

        act(() => {
            result.current.handleStartBattle(warriorTheme, 'guanYu', 'standard', null, poetryDB);
        });

        const player = result.current.playerChar;
        expect(player.hp).toBe(1200);
        expect(player.maxHp).toBe(1200);
        expect(player.atk).toBe(150);
        expect(player.def).toBe(80);
        expect(player.spd).toBe(60);
        // isPoet is undefined for warrior characters, check that skills exist
        expect(player.skills.length).toBe(3);
    });

    it('should set correct character stats for poet standard mode', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('standard');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'standard', null, poetryDB);
        });

        const player = result.current.playerChar;
        expect(player.hp).toBe(1000);
        expect(player.maxHp).toBe(1000);
        expect(player.atk).toBe(160);
        expect(player.def).toBe(50);
        expect(player.spd).toBe(90);
        expect(player.isPoet).toBe(true);
        expect(player.skills.length).toBe(3);
    });
});

describe('useBattleState - State Transitions', () => {
    it('should transition through poet mode flow correctly', () => {
        const { result } = renderHook(() => useBattleState());

        expect(result.current.gameState).toBe('theme_selection');

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });
        expect(result.current.gameState).toBe('mode_selection');

        act(() => {
            result.current.handleModeSelect('standard');
        });
        expect(result.current.gameState).toBe('char_selection');

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'standard', null, poetryDB);
        });
        expect(result.current.gameState).toBe('arena');
    });

    it('should transition through FF mode flow correctly', () => {
        const { result } = renderHook(() => useBattleState());

        expect(result.current.gameState).toBe('theme_selection');

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });
        expect(result.current.gameState).toBe('mode_selection');

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });
        expect(result.current.gameState).toBe('keyword_selection');

        act(() => {
            result.current.handleKeywordSelect('月');
        });
        expect(result.current.gameState).toBe('char_selection');

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'ff_mode', '月', poetryDB);
        });
        expect(result.current.gameState).toBe('arena');
    });
});

describe('useBattleState - Navigation Methods', () => {
    it('should provide goToThemeSelection navigation', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.goToThemeSelection();
        });

        expect(result.current.gameState).toBe('theme_selection');
    });

    it('should provide goToModeSelection navigation', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.goToModeSelection();
        });

        expect(result.current.gameState).toBe('mode_selection');
    });

    it('should provide goToKeywordSelection navigation', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.goToKeywordSelection();
        });

        expect(result.current.gameState).toBe('keyword_selection');
    });

    it('should provide goToCharSelection navigation', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.goToCharSelection();
        });

        expect(result.current.gameState).toBe('char_selection');
    });

    it('should provide goToArena navigation', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.goToArena();
        });

        expect(result.current.gameState).toBe('arena');
    });

    it('should provide goToResult navigation', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.goToResult();
        });

        expect(result.current.gameState).toBe('result');
    });
});

describe('useBattleState - Log Management', () => {
    it('should add log entries correctly', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.addLog('Test log message');
        });

        expect(result.current.battleLogs).toEqual(['Test log message']);
    });

    it('should replace all logs correctly', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.addLog('First log');
        });

        act(() => {
            result.current.addLog('Second log');
        });

        act(() => {
            result.current.setLogs(['New log']);
        });

        expect(result.current.battleLogs).toEqual(['New log']);
    });

    it('should include battle start log in FF mode', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        act(() => {
            result.current.handleKeywordSelect('月');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'ff_mode', '月', poetryDB);
        });

        expect(result.current.battleLogs[0]).toContain('战斗开始');
        expect(result.current.battleLogs[0]).toContain('飞花令关键字：【月】');
    });
});

describe('useBattleState - Edge Cases', () => {
    it('should handle undefined keyword in FF mode', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        act(() => {
            result.current.handleKeywordSelect(undefined);
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'ff_mode', undefined, poetryDB);
        });

        expect(result.current.gameState).toBe('arena');
        expect(result.current.playerHand).toEqual([]);
    });

    it('should reset state properly when returning to theme selection mid-battle', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        act(() => {
            result.current.handleKeywordSelect('月');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'ff_mode', '月', poetryDB);
        });

        expect(result.current.playerHand.length).toBeGreaterThan(0);

        act(() => {
            result.current.handleThemeSelect(null);
        });

        expect(result.current.gameState).toBe('theme_selection');
        expect(result.current.selectedTheme).toBe(null);
        expect(result.current.playerHand).toEqual([]);
    });

    it('should handle rapid theme switching correctly', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });
        expect(result.current.selectedTheme).toEqual(poetTheme);

        act(() => {
            result.current.handleThemeSelect(warriorTheme);
        });
        expect(result.current.selectedTheme).toEqual(warriorTheme);

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });
        expect(result.current.selectedTheme).toEqual(poetTheme);
    });

    it('should not initialize player hand in standard mode', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('standard');
        });

        act(() => {
            result.current.handleStartBattle(poetTheme, 'liBai', 'standard', null, poetryDB);
        });

        expect(result.current.playerHand).toEqual([]);
    });

    it('should preserve theme through mode selection for poet theme', () => {
        const { result } = renderHook(() => useBattleState());

        act(() => {
            result.current.handleThemeSelect(poetTheme);
        });

        act(() => {
            result.current.handleModeSelect('ff_mode');
        });

        expect(result.current.selectedTheme).toEqual(poetTheme);

        act(() => {
            result.current.handleModeSelect('standard');
        });

        expect(result.current.selectedTheme).toEqual(poetTheme);
    });
});
