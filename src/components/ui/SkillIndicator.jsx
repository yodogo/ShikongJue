import React from 'react';

/**
 * Skill indicator showing keyboard shortcuts and skill names
 */
function SkillIndicator({ skills, controls, isIdle = true }) {
    const { SKILL_1, SKILL_2, SKILL_3, BASIC_ATTACK } = controls;

    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {skills.map((skill, index) => {
                const keys = [SKILL_1, SKILL_2, SKILL_3];
                return (
                    <span
                        key={index}
                        style={{
                            background: '#333',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            opacity: !isIdle ? 0.5 : 1,
                            textTransform: 'uppercase',
                        }}
                    >
                        {keys[index]}: {skill.name}
                    </span>
                );
            })}
            <span
                style={{
                    background: '#333',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    opacity: !isIdle ? 0.5 : 1,
                    textTransform: 'uppercase',
                }}
            >
                {BASIC_ATTACK}: 普通攻击
            </span>
        </div>
    );
}

export default SkillIndicator;
