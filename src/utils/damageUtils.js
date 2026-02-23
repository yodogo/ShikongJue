/**
 * Damage calculation utilities
 */

/**
 * Calculate damage based on attacker stats, defender defense, and skill multiplier
 * @param {Object} attacker - Character with atk stat
 * @param {Object} defender - Character with def stat
 * @param {number} multiplier - Skill damage multiplier
 * @returns {number} Calculated damage
 */
export function calculateDamage(attacker, defender, multiplier) {
    const baseDamage = attacker.atk * multiplier;
    const reducedDamage = Math.max(10, baseDamage - (defender.def || 0));
    const variance = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
    return Math.floor(reducedDamage * variance);
}

/**
 * Calculate HP percentage for health bar display
 * @param {number} currentHp - Current HP value
 * @param {number} maxHp - Maximum HP value
 * @returns {number} Percentage (0-100)
 */
export function calculateHpPercent(currentHp, maxHp) {
    return Math.max(0, Math.min(100, (currentHp / maxHp) * 100));
}

/**
 * Check if a character is defeated
 * @param {Object} character - Character with hp stat
 * @returns {boolean} True if HP is 0 or below
 */
export function isDefeated(character) {
    return character.hp <= 0;
}
