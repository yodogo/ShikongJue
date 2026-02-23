import React from 'react';

const ThemeSelector = ({ themes, onSelect }) => {
    return (
        <div className="glass-panel text-center">
            <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>关公战秦琼</h1>
            <p style={{ color: 'var(--primary-gold)', fontSize: '1.2rem', marginBottom: '3rem' }}>
                请先选择游戏进入的主题：
            </p>
            <div className="selection-grid" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                {themes.map((theme) => (
                    <div key={theme.id} className="char-card glass-panel" onClick={() => onSelect(theme)}>
                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '2rem' }}>{theme.name}</h2>
                        </div>
                        <div className="char-info">
                            <p style={{ color: 'var(--text-dim)' }}>{theme.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <p style={{ marginTop: '2rem', color: 'var(--text-dim)' }}>穿越时空的决战，由你开启</p>
        </div>
    );
};

export default ThemeSelector;
