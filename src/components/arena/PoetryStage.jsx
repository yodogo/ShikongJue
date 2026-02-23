import React from 'react';
import { parseVerseForVerticalDisplay } from '../../utils/poetryUtils';

/**
 * Poetry verse display area for FF mode
 */
function PoetryStage({ activeVerse, activeVerseOwner, battleMode = 'standard' }) {
    if (battleMode !== 'ff_mode' || !activeVerse) {
        return <div className="poetry-stage" />;
    }

    const lines = parseVerseForVerticalDisplay(activeVerse.text);

    return (
        <div className="poetry-stage">
            <div className={`ff-verse-center ${activeVerseOwner === 1 ? 'verse-player-side' : 'verse-enemy-side'}`}>
                <div className="ff-verse-vertical">
                    {lines.map((line, i) => (
                        <div key={i} className="ff-verse-column">{line}</div>
                    ))}
                    {activeVerse.source && (
                        <div className="ff-verse-source-vertical">{activeVerse.source}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PoetryStage;
