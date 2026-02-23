import React from 'react';
import { GAME_STATES } from '../../constants/gameStates';

/**
 * Mode selection screen for poet theme
 */
function ModeSelection({ onModeSelect, onBack }) {
    return (
        <div className="glass-panel text-center">
            <h1 className="premium-title">选择玩法</h1>
            <div className="selection-grid">
                <div className="char-card glass-panel" onClick={() => onModeSelect('standard')}>
                    <h2>经典对决</h2>
                    <p>传统回合制战斗，释放诗词技能</p>
                </div>
                <div className="char-card glass-panel" onClick={() => onModeSelect('ff_mode')}>
                    <h2 style={{ color: 'var(--primary-gold)' }}>飞花令模式</h2>
                    <p>雅致的诗词接龙，考验你的文学储备</p>
                </div>
            </div>
            <button className="btn-premium" style={{ marginTop: '2rem' }} onClick={onBack}>
                返回
            </button>
        </div>
    );
}

export default ModeSelection;
