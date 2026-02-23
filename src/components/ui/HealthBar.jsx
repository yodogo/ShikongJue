import React from 'react';
import { calculateHpPercent } from '../../utils/damageUtils';

/**
 * Health bar component displaying current/max HP
 */
function HealthBar({ character, showLabel = true }) {
    const hpPercent = calculateHpPercent(character.hp, character.maxHp);

    return (
        <div className="health-bar">
            <div className="hp-bar-container">
                <div
                    className="hp-bar-fill"
                    style={{ width: `${hpPercent}%` }}
                />
            </div>
            {showLabel && (
                <p style={{ margin: '0.5rem 0' }}>
                    HP: {character.hp} / {character.maxHp}
                </p>
            )}
        </div>
    );
}

export default HealthBar;
