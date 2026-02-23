import { useState, useEffect, useRef } from 'react';
import './App.css';
import './index.css';
import { BattleEngine } from './core/BattleEngine';
import { warriorTheme } from './data/warriorTheme';
import { poetTheme } from './data/poetTheme';
import ThemeSelector from './components/ThemeSelector';
import CharacterSelector from './components/CharacterSelector';

const ALL_THEMES = [warriorTheme, poetTheme];

function App() {
  const [gameState, setGameState] = useState('theme_selection'); // theme_selection, char_selection, arena, result
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [playerChar, setPlayerChar] = useState(null);
  const [enemyChar, setEnemyChar] = useState(null);
  const [battleLogs, setBattleLogs] = useState([]);
  const [battleInstance, setBattleInstance] = useState(null);
  const [winner, setWinner] = useState(null);

  // Animation states
  const [p1State, setP1State] = useState('idle');
  const [p2State, setP2State] = useState('idle');

  // Floating texts
  const [p1DamageTexts, setP1DamageTexts] = useState([]);
  const [p2DamageTexts, setP2DamageTexts] = useState([]);

  // Poetry effects
  const [activeVerse, setActiveVerse] = useState(null);
  const [inkSplashes, setInkSplashes] = useState([]);

  const logEndRef = useRef(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [battleLogs]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'arena' || winner) return;

      const key = e.key.toLowerCase();

      // Player 1 (Left) Controls
      if (['a', 's', 'd', 'f', 'q', 'w', 'e', 'r'].includes(key)) {
        if (p1State !== 'idle' || p2State !== 'idle') return;

        if (['q', 'w', 'e', 'r'].includes(key)) {
          let state = 'idle';
          if (key === 'q') state = 'move_back';
          if (key === 'w') state = 'jump';
          if (key === 'e') state = 'move_forward';
          if (key === 'r') state = 'dodge';
          setP1State(state);
          setTimeout(() => setP1State('idle'), 600);
          return;
        }

        let actionParams = null;
        if (key === 'a') actionParams = ['skill', 0];
        if (key === 's') actionParams = ['skill', 1];
        if (key === 'd') actionParams = ['skill', 2];
        if (key === 'f') actionParams = ['attack', -1];

        executeCombatSequence(playerChar.name, actionParams, 1);
      }

      // Player 2 (Right) Controls
      if (['h', 'j', 'k', 'l', 'u', 'i', 'o', 'p'].includes(key)) {
        if (p1State !== 'idle' || p2State !== 'idle') return;

        if (['u', 'i', 'o', 'p'].includes(key)) {
          let state = 'idle';
          if (key === 'u') state = 'move_back';
          if (key === 'i') state = 'jump';
          if (key === 'o') state = 'move_forward';
          if (key === 'p') state = 'dodge';
          setP2State(state);
          setTimeout(() => setP2State('idle'), 600);
          return;
        }

        let actionParams = null;
        if (key === 'h') actionParams = ['skill', 0];
        if (key === 'j') actionParams = ['skill', 1];
        if (key === 'k') actionParams = ['skill', 2];
        if (key === 'l') actionParams = ['attack', -1];

        executeCombatSequence(enemyChar.name, actionParams, 2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, winner, playerChar, enemyChar, p1State, p2State]);

  const handleHandleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setGameState('char_selection');
  };

  const handleStartBattle = (charKey) => {
    const characters = selectedTheme.characters;
    const player = characters[charKey];

    // Pick the other character in the theme
    const enemyKey = Object.keys(characters).find(k => k !== charKey);
    const enemy = characters[enemyKey];

    setPlayerChar({ ...player });
    setEnemyChar({ ...enemy });
    setBattleInstance(new BattleEngine(player, enemy));
    setBattleLogs(["战斗开始！"]);
    setGameState('arena');
    setWinner(null);
    setP1State('idle');
    setP2State('idle');
    setP1DamageTexts([]);
    setP2DamageTexts([]);
  };

  const executeCombatSequence = (attackerName, actionParams, playerNum) => {
    if (!battleInstance) return;

    const actionType = actionParams[0];
    const skillIndex = actionParams[1];

    let stateString = 'lunging';
    if (actionType === 'skill') {
      stateString = `attack_${skillIndex}`;
    } else {
      stateString = 'attack_basic';
    }

    if (playerNum === 1) setP1State(stateString);
    else setP2State(stateString);

    setTimeout(() => {
      const result = battleInstance.executeAction(attackerName, ...actionParams);

      setPlayerChar({ ...battleInstance.charA });
      setEnemyChar({ ...battleInstance.charB });
      setBattleLogs([...result.logs]);

      if (result.verse) {
        setActiveVerse(result.verse);
        const inkId = Date.now();
        setInkSplashes(prev => [...prev, { id: inkId }]);
        setTimeout(() => setActiveVerse(null), 2000);
        setTimeout(() => setInkSplashes(prev => prev.filter(i => i.id !== inkId)), 800);
      }

      const dmgId = Date.now();
      if (playerNum === 1) {
        setP2State('hit');
        setP2DamageTexts(prev => [...prev, { id: dmgId, value: `-${result.damageDealt}` }]);
      } else {
        setP1State('hit');
        setP1DamageTexts(prev => [...prev, { id: dmgId, value: `-${result.damageDealt}` }]);
      }

      setTimeout(() => {
        setP1State('idle');
        setP2State('idle');

        if (result.status === 'finished') {
          setWinner(result.winner);
          setTimeout(() => setGameState('result'), 1500);
        }
      }, 500);

      setTimeout(() => {
        if (playerNum === 1) setP2DamageTexts(prev => prev.filter(t => t.id !== dmgId));
        else setP1DamageTexts(prev => prev.filter(t => t.id !== dmgId));
      }, 1000);

    }, 200);
  };

  return (
    <div className="app-container" style={{ backgroundImage: gameState === 'arena' ? `url(${selectedTheme?.background})` : 'none' }}>
      {gameState === 'theme_selection' && (
        <ThemeSelector themes={ALL_THEMES} onSelect={handleHandleThemeSelect} />
      )}

      {gameState === 'char_selection' && (
        <CharacterSelector theme={selectedTheme} onSelect={handleStartBattle} onBack={() => setGameState('theme_selection')} />
      )}

      {gameState === 'arena' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div className="arena-container">
            {/* Player 1 Area */}
            <div className={`battle-char realistic-char`} style={{ position: 'relative' }}>
              {activeVerse && <div className="poetry-overlay"><div className="poetry-verse">{activeVerse}</div></div>}
              {inkSplashes.map(ink => <div key={ink.id} className="ink-splash" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>)}
              {p1DamageTexts.map(dt => (
                <div key={dt.id} className="floating-damage" style={{ color: playerChar.isPoet ? '#888' : '#ff3333' }}>{dt.value}</div>
              ))}
              <div style={{ transform: 'scaleX(1)', display: 'inline-block' }}>
                {(() => {
                  let imgSrc = playerChar.combatImg;
                  let animClass = 'anim-idle';
                  if (p1State.startsWith('attack_')) {
                    if (playerChar.isPoet) {
                      animClass = 'anim-write';
                    } else {
                      const idx = p1State.split('_')[1];
                      imgSrc = playerChar.attackImages[idx === 'basic' ? 'basic' : idx] || playerChar.combatImg;
                      animClass = idx === '0' ? 'anim-swing' : idx === '1' ? 'anim-thrust' : idx === '2' ? 'anim-rapid' : 'anim-basic';
                    }
                  } else if (p1State === 'hit') animClass = 'anim-hit';
                  else if (p1State === 'jump') animClass = 'anim-jump';
                  else if (p1State === 'move_forward') animClass = 'anim-forward';
                  else if (p1State === 'move_back') animClass = 'anim-backward';
                  else if (p1State === 'dodge') animClass = 'anim-dodge';

                  return <img className={animClass} src={imgSrc} style={{ width: playerChar.isPoet ? '400px' : '450px' }} alt="player" />;
                })()}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '1rem' }}>
                <h3>{playerChar.name}</h3>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>1P: QWER移动 / ASDF攻击</span>
              </div>
              <div className="hp-bar-container">
                <div className="hp-bar-fill" style={{ width: `${(playerChar.hp / playerChar.maxHp) * 100}%` }}></div>
              </div>
              <p style={{ margin: '0.5rem 0' }}>HP: {playerChar.hp} / {playerChar.maxHp}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span style={{ background: '#333', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', opacity: p1State !== 'idle' ? 0.5 : 1 }}>A: {playerChar.skills[0].name}</span>
                <span style={{ background: '#333', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', opacity: p1State !== 'idle' ? 0.5 : 1 }}>S: {playerChar.skills[1].name}</span>
                <span style={{ background: '#333', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', opacity: p1State !== 'idle' ? 0.5 : 1 }}>D: {playerChar.skills[2].name}</span>
                <span style={{ background: '#333', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', opacity: p1State !== 'idle' ? 0.5 : 1 }}>F: 普通攻击</span>
              </div>
            </div>

            {/* Player 2 Area */}
            <div className={`battle-char realistic-char`} style={{ position: 'relative' }}>
              {p2DamageTexts.map(dt => (
                <div key={dt.id} className="floating-damage" style={{ color: enemyChar.isPoet ? '#888' : '#ff3333' }}>{dt.value}</div>
              ))}
              <div style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>
                {(() => {
                  let imgSrc = enemyChar.combatImg;
                  let animClass = 'anim-idle';
                  if (p2State.startsWith('attack_')) {
                    if (enemyChar.isPoet) {
                      animClass = 'anim-write';
                    } else {
                      const idx = p2State.split('_')[1];
                      imgSrc = enemyChar.attackImages[idx === 'basic' ? 'basic' : idx] || enemyChar.combatImg;
                      animClass = idx === '0' ? 'anim-swing' : idx === '1' ? 'anim-thrust' : idx === '2' ? 'anim-rapid' : 'anim-basic';
                    }
                  } else if (p2State === 'hit') animClass = 'anim-hit';
                  else if (p2State === 'jump') animClass = 'anim-jump';
                  else if (p2State === 'move_forward') animClass = 'anim-forward';
                  else if (p2State === 'move_back') animClass = 'anim-backward';
                  else if (p2State === 'dodge') animClass = 'anim-dodge';

                  return <img className={animClass} src={imgSrc} style={{ width: enemyChar.isPoet ? '400px' : '450px' }} alt="enemy" />;
                })()}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '1rem' }}>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>2P: UIOP移动 / HJKL攻击</span>
                <h3>{enemyChar.name}</h3>
              </div>
              <div className="hp-bar-container">
                <div className="hp-bar-fill" style={{ width: `${(enemyChar.hp / enemyChar.maxHp) * 100}%` }}></div>
              </div>
              <p style={{ margin: '0.5rem 0' }}>HP: {enemyChar.hp} / {enemyChar.maxHp}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span style={{ background: '#333', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', opacity: p2State !== 'idle' ? 0.5 : 1 }}>H: {enemyChar.skills[0].name}</span>
                <span style={{ background: '#333', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', opacity: p2State !== 'idle' ? 0.5 : 1 }}>J: {enemyChar.skills[1].name}</span>
                <span style={{ background: '#333', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', opacity: p2State !== 'idle' ? 0.5 : 1 }}>K: {enemyChar.skills[2].name}</span>
                <span style={{ background: '#333', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', opacity: p2State !== 'idle' ? 0.5 : 1 }}>L: 普通攻击</span>
              </div>
            </div>
          </div>

          <div className="battle-logs glass-panel" style={{ marginTop: '2rem', width: '80%', height: '200px' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>对阵记录</h3>
            <div style={{ height: '120px', overflowY: 'auto' }}>
              {battleLogs.map((log, i) => (
                <div key={i} className="log-entry">{log}</div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      )}

      {gameState === 'result' && (
        <div className="glass-panel text-center">
          <h2 style={{ fontSize: '3rem' }}>{winner.name} 获得了最终胜利！</h2>
          <p style={{ fontSize: '1.5rem', color: 'var(--primary-gold)', margin: '2rem 0' }}>
            {selectedTheme.id === 'poet' ? '江山代有才人出，各领风骚数百年。' : '英雄气短，儿女情长。这一战，足以名垂青史！'}
          </p>
          <button className="btn-premium" onClick={() => setGameState('theme_selection')}>返回主界面</button>
        </div>
      )}
    </div>
  );
}

export default App;
