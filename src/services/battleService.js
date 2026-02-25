import { speechService } from './speechService';
import { ANIMATION_STATES } from '../constants/gameStates';
import { getActionAnimationState } from '../utils/animationUtils';

/**
 * Battle execution service
 * Handles combat sequences and Flying Flower mode rounds
 */
class BattleService {
    constructor() {
        this.pendingActions = [];
    }

    /**
     * Execute a standard combat action
     * @param {Object} params - Battle parameters
     * @returns {Object} Battle result
     */
    async executeCombatAction({
        battleInstance,
        attackerName,
        actionParams,
        playerNum,
        onStateUpdate,
        onAnimationChange,
        onDamageShow,
        onVerseShow,
        onBattleEnd,
    }) {
        const [actionType, skillIndex] = actionParams;
        const stateString = getActionAnimationState(actionType, skillIndex);

        // Set attack animation
        onAnimationChange(playerNum, stateString);

        // Delay for animation, then execute logic
        await new Promise(resolve => setTimeout(resolve, 200));

        const result = battleInstance.executeAction(attackerName, ...actionParams);

        // Update character states
        onStateUpdate(result);

        // Show verse if applicable
        if (result.verse) {
            onVerseShow(result.verse, playerNum);
        }

        // Show damage
        const targetPlayerNum = playerNum === 1 ? 2 : 1;
        onAnimationChange(targetPlayerNum, ANIMATION_STATES.HIT);
        onDamageShow(targetPlayerNum, result.damageDealt);

        // Reset animations after delay
        setTimeout(() => {
            onAnimationChange(1, ANIMATION_STATES.IDLE);
            onAnimationChange(2, ANIMATION_STATES.IDLE);

            if (result.status === 'finished') {
                onBattleEnd(result.winner);
            }
        }, 500);

        // Remove damage text after delay
        setTimeout(() => {
            // Damage removal handled by animation hook
        }, 1000);

        return result;
    }

    /**
     * Execute a Flying Flower mode round
     * @param {Object} params - FF mode parameters
     */
    async executeFFAction({
        battleInstance,
        attackerName,
        verse,
        playerNum,
        source,
        onStateUpdate,
        onAnimationChange,
        onDamageShow,
        onVerseShow,
        onInkSplash,
        onBattleEnd,
    }) {
        // Set attack animation
        onAnimationChange(playerNum, ANIMATION_STATES.ATTACK_0);

        // Execute battle logic
        const result = battleInstance.executeFFAction(attackerName, verse);

        // Update states
        onStateUpdate(result);

        // Show poetry effects
        onVerseShow(verse, source, playerNum);
        onInkSplash();

        // Show damage
        const targetPlayerNum = playerNum === 1 ? 2 : 1;
        onAnimationChange(targetPlayerNum, ANIMATION_STATES.HIT);
        onDamageShow(targetPlayerNum, result.damageDealt);

        // Reset animations
        setTimeout(() => {
            onAnimationChange(1, ANIMATION_STATES.IDLE);
            onAnimationChange(2, ANIMATION_STATES.IDLE);

            if (result.status === 'finished') {
                onBattleEnd(result.winner);
            }
        }, 500);

        // Speak the verse
        await speechService.speak(verse, attackerName);

        return result;
    }

    /**
     * Execute a complete FF round (player + AI response)
     */
    async executeFFRound({
        battleInstance,
        playerChar,
        enemyChar,
        selectedKeyword,
        playerHand,
        verse,
        source,
        poetryDB,
        expandPoetryLibrary,
        onStateUpdate,
        onAnimationChange,
        onDamageShow,
        onVerseShow,
        onInkSplash,
        onBattleEnd,
        onHandUpdate,
        onLogAdd,
    }) {
        // Player's turn
        const playerResult = await this.executeFFAction({
            battleInstance,
            attackerName: playerChar.name,
            verse,
            playerNum: 1,
            source,
            onStateUpdate,
            onAnimationChange,
            onDamageShow,
            onVerseShow,
            onInkSplash,
            onBattleEnd,
        });

        // If battle ended during player's turn, don't continue
        if (playerResult.status === 'finished') {
            return;
        }

        // Update player hand
        const nextHand = playerHand.filter(h => h.text !== verse);
        onHandUpdate(nextHand);

        // Check if player ran out of verses
        if (nextHand.length === 0) {
            const used = battleInstance.usedLines;
            const newVerses = expandPoetryLibrary(selectedKeyword, used, playerChar.name);

            if (newVerses.length > 0) {
                onHandUpdate(newVerses);
                onLogAdd(`诗库扩充！新增 ${newVerses.length} 首诗句`);
            } else {
                onLogAdd(`${playerChar.name} 词穷了！${battleInstance.charB.name} 在文坛大胜！`);
                onBattleEnd(battleInstance.charB);
                return;
            }
        }

        // AI's turn after delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const used = battleInstance.usedLines;
        let aiValid = (poetryDB[selectedKeyword] || []).filter(
            v => v.author === enemyChar.name && !used.has(v.text)
        );

        if (aiValid.length === 0) {
            aiValid = expandPoetryLibrary(selectedKeyword, used, enemyChar.name);
        }

        if (aiValid.length > 0) {
            const aiPick = aiValid[Math.floor(Math.random() * aiValid.length)];
            await this.executeFFAction({
                battleInstance,
                attackerName: enemyChar.name,
                verse: aiPick.text,
                playerNum: 2,
                source: aiPick.source,
                onStateUpdate,
                onAnimationChange,
                onDamageShow,
                onVerseShow,
                onInkSplash,
                onBattleEnd,
            });
        } else {
            onLogAdd(`${enemyChar.name} 词穷了！${playerChar.name} 在文坛大胜！`);
            onBattleEnd(playerChar);
        }
    }
}

// Singleton instance
export const battleService = new BattleService();
export default battleService;
