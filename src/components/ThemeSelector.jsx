import React from 'react';

const ThemeSelector = ({ themes, onSelect }) => {
    return (
        <div className="glass-panel text-center">
            <h1 style={{ fontSize: '4rem', marginBottom: '2rem', background: 'linear-gradient(to right, var(--primary-gold), #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900' }}>时空对决</h1>
            <p style={{ color: 'var(--primary-gold)', fontSize: '1.2rem', marginBottom: '3rem', letterSpacing: '4px' }}>
                TIMELESS SHOWDOWN
            </p>
            <div className="selection-grid" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
                {themes.map((theme) => (
                    <div key={theme.id} className="char-card glass-panel" onClick={() => onSelect(theme)} style={{ width: '400px', cursor: 'pointer', transition: 'transform 0.3s ease' }}>
                        <div className="theme-cover-container" style={{ height: '240px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                            <img src={theme.cover} alt={theme.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="theme-img" />
                        </div>
                        <div className="char-info">
                            <h2 style={{ color: 'var(--primary-gold)', marginBottom: '0.5rem' }}>{theme.name}</h2>
                            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{theme.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <p style={{ marginTop: '3rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>点击卡片选择你的战场</p>
        </div>
    );
};

export default ThemeSelector;
