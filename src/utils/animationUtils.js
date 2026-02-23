import { ANIMATION_STATES } from '../constants/gameStates';

/**
 * Animation utilities for character sprite and state management
 */

/**
 * Map action type and skill index to animation state
 * @param {string} actionType - 'skill' or 'attack'
 * @param {number} skillIndex - Index of skill (0, 1, 2) or -1 for basic attack
 * @returns {string} Animation state key
 */
export function getActionAnimationState(actionType, skillIndex) {
    if (actionType === 'skill' && skillIndex >= 0) {
        return `attack_${skillIndex}`;
    }
    return ANIMATION_STATES.ATTACK_BASIC;
}

/**
 * Get animation CSS class for a character state
 * @param {string} state - Current animation state
 * @param {boolean} isPoet - Whether character is a poet
 * @returns {string} CSS animation class name
 */
export function getAnimationClass(state, isPoet) {
    if (state.startsWith('attack_')) {
        if (isPoet) {
            return 'anim-write';
        }
        const idx = state.split('_')[1];
        if (idx === 'basic') return 'anim-basic';
        if (idx === '0') return 'anim-swing';
        if (idx === '1') return 'anim-thrust';
        if (idx === '2') return 'anim-rapid';
    }

    const stateToClass = {
        [ANIMATION_STATES.IDLE]: 'anim-idle',
        [ANIMATION_STATES.HIT]: 'anim-hit',
        [ANIMATION_STATES.JUMP]: 'anim-jump',
        [ANIMATION_STATES.MOVE_FORWARD]: 'anim-forward',
        [ANIMATION_STATES.MOVE_BACK]: 'anim-backward',
        [ANIMATION_STATES.DODGE]: 'anim-dodge',
    };

    return stateToClass[state] || 'anim-idle';
}

/**
 * Get the appropriate image source based on character state
 * @param {Object} character - Character object with combatImg and attackImages
 * @param {string} state - Current animation state
 * @returns {string} Image source URL
 */
export function getCharacterImage(character, state) {
    if (!character.isPoet && state.startsWith('attack_')) {
        const idx = state.split('_')[1];
        if (character.attackImages?.[idx]) {
            return character.attackImages[idx];
        }
        if (idx === 'basic' && character.attackImages?.basic) {
            return character.attackImages.basic;
        }
    }
    return character.combatImg;
}

/**
 * Get image width based on character type and battle mode
 * @param {boolean} isPoet - Whether character is a poet
 * @param {string} battleMode - Current battle mode
 * @returns {string} CSS width value
 */
export function getCharacterImageWidth(isPoet, battleMode) {
    if (isPoet && battleMode === 'ff_mode') return '380px';
    if (isPoet) return '400px';
    return '450px';
}

/**
 * Map keyboard key to movement state
 * @param {string} key - Keyboard key
 * @returns {string|null} Animation state or null
 */
export function keyToMovementState(key) {
    const keyToState = {
        'q': ANIMATION_STATES.MOVE_BACK,
        'w': ANIMATION_STATES.JUMP,
        'e': ANIMATION_STATES.MOVE_FORWARD,
        'r': ANIMATION_STATES.DODGE,
        'u': ANIMATION_STATES.MOVE_BACK,
        'i': ANIMATION_STATES.JUMP,
        'o': ANIMATION_STATES.MOVE_FORWARD,
        'p': ANIMATION_STATES.DODGE,
    };
    return keyToState[key] || null;
}

/**
 * Map keyboard key to action parameters
 * @param {string} key - Keyboard key
 * @returns {Array|null} Action parameters [actionType, skillIndex] or null
 */
export function keyToActionParams(key) {
    const keyToAction = {
        'a': ['skill', 0],
        's': ['skill', 1],
        'd': ['skill', 2],
        'f': ['attack', -1],
        'h': ['skill', 0],
        'j': ['skill', 1],
        'k': ['skill', 2],
        'l': ['attack', -1],
    };
    return keyToAction[key] || null;
}

/**
 * Generate unique ID for damage text
 * @returns {number} Unique timestamp-based ID
 */
export function generateDamageId() {
    return Date.now();
}
