import React from 'react';

/**
 * Battle result screen
 */
function BattleResult({ winner, onRestart }) {
    return (
        <div className="glass-panel text-center">
            <h2 style={{ fontSize: '3rem' }}>{winner.name} 获得了最终胜利！</h2>
            <button className="btn-premium" onClick={onRestart}>
                返回主界面
            </button>
        </div>
    );
}

export default BattleResult;
