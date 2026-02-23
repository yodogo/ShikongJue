import React from 'react';

/**
 * Flying Flower mode top bar with keyword display and turn indicator
 */
function FlyingFlowerArena({
    selectedKeyword,
    isPlayerTurn,
}) {
    return (
        <div className="ff-top-bar">
            <div className="ff-keyword-circle">
                <span>令</span>
                <h1>{selectedKeyword}</h1>
            </div>
            <p className={isPlayerTurn ? 'pulse-gold' : ''}>
                {isPlayerTurn ? "请接诗" : "对方正在吟诵..."}
            </p>
        </div>
    );
}

export default FlyingFlowerArena;
