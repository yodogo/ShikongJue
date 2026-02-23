import { useEffect } from 'react';
import { PLAYER_1_KEYS, PLAYER_2_KEYS, MOVEMENT_KEYS } from '../constants/gameStates';
import { keyToMovementState, keyToActionParams } from '../utils/animationUtils';

/**
 * Custom hook for keyboard controls in battle
 * @param {Function} onPlayerAction - Callback when player performs action
 * @param {Object} options - Configuration options
 */
export function useKeyboardControls(onPlayerAction, options = {}) {
    const {
        enabled = false,
        isFfMode = false,
        isP1Idle = true,
        isP2Idle = true,
        hasWinner = false,
        playerCharName = '',
        enemyCharName = '',
    } = options;

    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();

            // Don't allow actions during animations or if battle is over
            if (!isP1Idle || !isP2Idle || hasWinner) return;

            // Player 1 (Left) Controls
            if (PLAYER_1_KEYS.includes(key)) {
                // Movement keys
                if (MOVEMENT_KEYS.includes(key)) {
                    const movementState = keyToMovementState(key);
                    if (movementState && onPlayerAction.onMovement) {
                        onPlayerAction.onMovement(1, movementState);
                    }
                    return;
                }

                // Action keys
                const actionParams = keyToActionParams(key);
                if (actionParams && onPlayerAction.onCombatAction) {
                    onPlayerAction.onCombatAction(playerCharName, actionParams, 1);
                }
            }

            // Player 2 (Right) Controls
            if (PLAYER_2_KEYS.includes(key)) {
                // Movement keys
                if (MOVEMENT_KEYS.includes(key)) {
                    const movementState = keyToMovementState(key);
                    if (movementState && onPlayerAction.onMovement) {
                        onPlayerAction.onMovement(2, movementState);
                    }
                    return;
                }

                // Action keys
                const actionParams = keyToActionParams(key);
                if (actionParams && onPlayerAction.onCombatAction) {
                    onPlayerAction.onCombatAction(enemyCharName, actionParams, 2);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [
        enabled,
        isFfMode,
        isP1Idle,
        isP2Idle,
        hasWinner,
        playerCharName,
        enemyCharName,
        onPlayerAction,
    ]);
}
