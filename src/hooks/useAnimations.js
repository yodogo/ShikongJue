import { useState, useCallback } from 'react';
import { ANIMATION_STATES } from '../constants/gameStates';

/**
 * Custom hook for managing character animation states
 */
export function useAnimations() {
    const [p1State, setP1State] = useState(ANIMATION_STATES.IDLE);
    const [p2State, setP2State] = useState(ANIMATION_STATES.IDLE);
    const [p1DamageTexts, setP1DamageTexts] = useState([]);
    const [p2DamageTexts, setP2DamageTexts] = useState([]);
    const [inkSplashes, setInkSplashes] = useState([]);
    const [activeVerse, setActiveVerse] = useState(null);
    const [activeVerseOwner, setActiveVerseOwner] = useState(null);

    // Set player animation state temporarily
    const setTemporaryAnimation = useCallback((playerNum, state, duration = 600) => {
        if (playerNum === 1) {
            setP1State(state);
            setTimeout(() => setP1State(ANIMATION_STATES.IDLE), duration);
        } else {
            setP2State(state);
            setTimeout(() => setP2State(ANIMATION_STATES.IDLE), duration);
        }
    }, []);

    // Add damage text that fades out after a delay
    const addDamageText = useCallback((playerNum, value, duration = 1000) => {
        const id = Date.now();
        if (playerNum === 1) {
            setP1DamageTexts(prev => [...prev, { id, value }]);
            setTimeout(() => {
                setP1DamageTexts(prev => prev.filter(t => t.id !== id));
            }, duration);
        } else {
            setP2DamageTexts(prev => [...prev, { id, value }]);
            setTimeout(() => {
                setP2DamageTexts(prev => prev.filter(t => t.id !== id));
            }, duration);
        }
    }, []);

    // Add ink splash effect that removes itself after delay
    const addInkSplash = useCallback((duration = 800) => {
        const id = Date.now();
        setInkSplashes(prev => [...prev, { id }]);
        setTimeout(() => {
            setInkSplashes(prev => prev.filter(i => i.id !== id));
        }, duration);
        return id;
    }, []);

    // Show active verse for a duration
    const showVerse = useCallback((text, source, owner, duration = 35000) => {
        setActiveVerse({ text, source });
        setActiveVerseOwner(owner);
        setTimeout(() => {
            setActiveVerse(null);
            setActiveVerseOwner(null);
        }, duration);
    }, []);

    // Reset all animation states
    const resetAnimations = useCallback(() => {
        setP1State(ANIMATION_STATES.IDLE);
        setP2State(ANIMATION_STATES.IDLE);
        setP1DamageTexts([]);
        setP2DamageTexts([]);
        setInkSplashes([]);
        setActiveVerse(null);
        setActiveVerseOwner(null);
    }, []);

    // Reset to idle state
    const resetToIdle = useCallback(() => {
        setP1State(ANIMATION_STATES.IDLE);
        setP2State(ANIMATION_STATES.IDLE);
    }, []);

    return {
        // State
        p1State,
        p2State,
        p1DamageTexts,
        p2DamageTexts,
        inkSplashes,
        activeVerse,
        activeVerseOwner,

        // Setters
        setP1State,
        setP2State,
        setP1DamageTexts,
        setP2DamageTexts,

        // Actions
        setTemporaryAnimation,
        addDamageText,
        addInkSplash,
        showVerse,
        resetAnimations,
        resetToIdle,
    };
}
