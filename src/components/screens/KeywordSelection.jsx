import React from 'react';

/**
 * Keyword selection screen for Flying Flower mode
 */
function KeywordSelection({ keywords, onSelect, onBack }) {
    return (
        <div className="glass-panel text-center">
            <h1 className="premium-title">选择令词</h1>
            <div className="selection-grid" style={{ gap: '1rem' }}>
                {keywords.map(kw => (
                    <div
                        key={kw}
                        className="char-card glass-panel"
                        style={{ width: '150px', padding: '2rem' }}
                        onClick={() => onSelect(kw)}
                    >
                        <h2 style={{ fontSize: '3rem' }}>{kw}</h2>
                    </div>
                ))}
            </div>
            {onBack && (
                <button className="btn-premium" style={{ marginTop: '2rem' }} onClick={onBack}>
                    返回
                </button>
            )}
        </div>
    );
}

export default KeywordSelection;
