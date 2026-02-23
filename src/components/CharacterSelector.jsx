import React from 'react';

const CharacterSelector = ({ theme, onSelect, onBack }) => {
    return (
        <div className="glass-panel text-center">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{theme.name}</h2>
            <p style={{ color: 'var(--primary-gold)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                {theme.description}
            </p>
            <div className="selection-grid" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                {Object.entries(theme.characters).map(([key, char]) => (
                    <div key={key} className="char-card glass-panel" onClick={() => onSelect(key)}>
                        <img src={char.portrait} alt={char.name} style={{ height: '350px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div className="char-info">
                            <h3>{char.title} · {char.name}</h3>
                            <div className="char-stats">
                                <span>生命: {char.hp}</span>
                                <span>攻击: {char.atk}</span>
                                <span>速度: {char.spd}</span>
                                <span>{char.isPoet ? '博学' : '防御'}: {char.isPoet ? char.atk : char.def}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '2.5rem' }}>
                <button className="btn-premium" onClick={onBack}>返回主题选择</button>
            </div>
        </div>
    );
};

export default CharacterSelector;
