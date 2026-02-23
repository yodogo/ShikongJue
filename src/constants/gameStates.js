/**
 * Game state constants for the state machine
 */
export const GAME_STATES = {
    THEME_SELECTION: 'theme_selection',
    MODE_SELECTION: 'mode_selection',
    KEYWORD_SELECTION: 'keyword_selection',
    CHAR_SELECTION: 'char_selection',
    ARENA: 'arena',
    RESULT: 'result',
};

/**
 * Battle modes
 */
export const BATTLE_MODES = {
    STANDARD: 'standard',
    FF_MODE: 'ff_mode',
};

/**
 * Character animation states
 */
export const ANIMATION_STATES = {
    IDLE: 'idle',
    ATTACK_0: 'attack_0',
    ATTACK_1: 'attack_1',
    ATTACK_2: 'attack_2',
    ATTACK_BASIC: 'attack_basic',
    HIT: 'hit',
    JUMP: 'jump',
    MOVE_FORWARD: 'move_forward',
    MOVE_BACK: 'move_back',
    DODGE: 'dodge',
};

/**
 * Control mappings for both players
 */
export const CONTROLS = {
    PLAYER_1: {
        MOVE_BACK: 'q',
        JUMP: 'w',
        MOVE_FORWARD: 'e',
        DODGE: 'r',
        SKILL_1: 'a',
        SKILL_2: 's',
        SKILL_3: 'd',
        BASIC_ATTACK: 'f',
    },
    PLAYER_2: {
        MOVE_BACK: 'u',
        JUMP: 'i',
        MOVE_FORWARD: 'o',
        DODGE: 'p',
        SKILL_1: 'h',
        SKILL_2: 'j',
        SKILL_3: 'k',
        BASIC_ATTACK: 'l',
    },
};

/**
 * All control keys as arrays for easy checking
 */
export const PLAYER_1_KEYS = ['a', 's', 'd', 'f', 'q', 'w', 'e', 'r'];
export const PLAYER_2_KEYS = ['h', 'j', 'k', 'l', 'u', 'i', 'o', 'p'];

/**
 * Movement keys (non-attack)
 */
export const MOVEMENT_KEYS = ['q', 'w', 'e', 'r', 'u', 'i', 'o', 'p'];
