import React from 'react';
import FloatingDamage from '../ui/FloatingDamage';
import { getAnimationClass, getCharacterImage, getCharacterImageWidth } from '../../utils/animationUtils';

/**
 * Battle character display with animations and effects
 */
function BattleCharacter({
    character,
    animationState,
    damageTexts,
    isActiveSpeaker = false,
    inkSplashes = [],
    controls = null,
    isPlayer1 = true,
    battleMode = 'standard',
}) {
    const animClass = getAnimationClass(animationState, character.isPoet);
    const imgSrc = getCharacterImage(character, animationState);
    const imgWidth = getCharacterImageWidth(character.isPoet, battleMode);

    return (
        <div
            className={`battle-char ${battleMode === 'ff_mode' ? 'ff-char-area' : 'realistic-char'} ${isActiveSpeaker ? 'char-reciting' : ''}`}
            style={{ position: 'relative' }}
        >
            {/* Ink splash effects */}
            {inkSplashes.map(ink => (
                <div
                    key={ink.id}
                    className="ink-splash"
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                />
            ))}

            {/* Floating damage texts */}
            <FloatingDamage
                damageTexts={damageTexts}
                color={character.isPoet ? '#888' : '#ff3333'}
            />

            {/* Character image with animations */}
            <div className="aura-glow" />
            <div
                style={{
                    transform: character.needsFlip
                        ? (isPlayer1 ? 'scaleX(-1)' : 'scaleX(1)')
                        : (isPlayer1 ? 'scaleX(1)' : 'scaleX(-1)'),
                    display: 'inline-block',
                }}
            >
                <img
                    className={animClass}
                    src={imgSrc}
                    style={{ width: imgWidth }}
                    alt={character.name}
                />
            </div>

            {/* Character info */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '1rem',
                }}
            >
                <h3>{character.name}</h3>
                {battleMode === 'standard' && controls && (
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                        {controls.label}
                    </span>
                )}
            </div>
        </div>
    );
}

export default BattleCharacter;
