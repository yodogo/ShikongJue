import React from 'react';

/**
 * Floating damage text display
 */
function FloatingDamage({ damageTexts, color }) {
    if (!damageTexts || damageTexts.length === 0) return null;

    return (
        <>
            {damageTexts.map(dt => (
                <div
                    key={dt.id}
                    className="floating-damage"
                    style={{ color: color || '#ff3333' }}
                >
                    {dt.value}
                </div>
            ))}
        </>
    );
}

export default FloatingDamage;
