import { useState, useEffect, useRef } from 'react';
import './App.css';
import './index.css';
import { characters, BattleEngine } from './BattleEngine';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, arena, result
  const [playerChar, setPlayerChar] = useState(null);
  const [enemyChar, setEnemyChar] = useState(null);
  const [battleLogs, setBattleLogs] = useState([]);
  const [battleInstance, setBattleInstance] = useState(null);
  const [winner, setWinner] = useState(null);

  // Animation states: 'idle', 'lunging', 'hit'
  const [p1State, setP1State] = useState('idle');
  const [p2State, setP2State] = useState('idle');

  // Floating texts
  const [p1DamageTexts, setP1DamageTexts] = useState([]);
  const [p2DamageTexts, setP2DamageTexts] = useState([]);

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

      // Player 1 (Left) Controls: A, S, D (skills 0,1,2), F (attack)
      if (['a', 's', 'd', 'f'].includes(key)) {
        if (p1State !== 'idle' || p2State !== 'idle') return; // Cooldown/Block during animation

        let actionParams = null;
        if (key === 'a') actionParams = ['skill', 0];
        if (key === 's') actionParams = ['skill', 1];
        if (key === 'd') actionParams = ['skill', 2];
        if (key === 'f') actionParams = ['attack', -1];

        executeCombatSequence(playerChar.name, actionParams, 1);
      }

      // Player 2 (Right) Controls: H, J, K (skills 0,1,2), L (attack)
      if (['h', 'j', 'k', 'l'].includes(key)) {
        if (p1State !== 'idle' || p2State !== 'idle') return; // Cooldown/Block during animation

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

  const startGame = (charKey) => {
    const player = characters[charKey];
    const enemy = charKey === 'guanYu' ? characters.qinQiong : characters.guanYu;

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

    // 1. Attacker lunges forward
    if (playerNum === 1) setP1State('lunging');
    else setP2State('lunging');

    // 2. Delay for damage calculation and hit effect to match the lunge timing (roughly middle of animation)
    setTimeout(() => {
      const result = battleInstance.executeAction(attackerName, ...actionParams);

      // Update Health
      setPlayerChar({ ...battleInstance.charA });
      setEnemyChar({ ...battleInstance.charB });
      setBattleLogs([...result.logs]);

      // Trigger defender hit animation and damage text
      const dmgId = Date.now();
      if (playerNum === 1) {
        setP2State('hit');
        setP2DamageTexts(prev => [...prev, { id: dmgId, value: `-${result.damageDealt}` }]);
      } else {
        setP1State('hit');
        setP1DamageTexts(prev => [...prev, { id: dmgId, value: `-${result.damageDealt}` }]);
      }

      // Clear states after animation completes
      setTimeout(() => {
        setP1State('idle');
        setP2State('idle');

        if (result.status === 'finished') {
          setWinner(result.winner);
          setTimeout(() => setGameState('result'), 1500);
        }
      }, 500); // 500ms to recover to idle

      // Clean up floating text after 1s
      setTimeout(() => {
        if (playerNum === 1) {
          setP2DamageTexts(prev => prev.filter(t => t.id !== dmgId));
        } else {
          setP1DamageTexts(prev => prev.filter(t => t.id !== dmgId));
        }
      }, 1000);

    }, 200); // 200ms delay to simulate travel time
  };

  return (
    <div className="app-container">
      {gameState === 'menu' && (
        <div className="glass-panel text-center">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>关公战秦琼</h1>
          <p style={{ color: 'var(--primary-gold)', fontSize: '1.2rem', marginBottom: '3rem' }}>
            穿越时空的巅峰决战：武圣 vs 门神
          </p>
          <div className="selection-grid">
            {Object.entries(characters).map(([key, char]) => (
              <div key={key} className="char-card glass-panel" onClick={() => startGame(key)}>
                <img src={key === 'guanYu' ? '/guan_yu.png' : '/qin_qiong.png'} alt={char.name} />
                <div className="char-info">
                  <h3>{char.title} · {char.name}</h3>
                  <div className="char-stats">
                    <span>生命: {char.hp}</span>
                    <span>攻击: {char.atk}</span>
                    <span>防御: {char.def}</span>
                    <span>速度: {char.spd}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '2rem', color: 'var(--text-dim)' }}>点击卡片选择你的英雄</p>
        </div>
      )}

      {gameState === 'arena' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div className="arena-container">
            {/* Player 1 Area */}
            <div className={`battle-char realistic-char`} style={{ position: 'relative' }}>
              {p1DamageTexts.map(dt => (
                <div key={dt.id} className="floating-damage">{dt.value}</div>
              ))}
              <div style={{ transform: 'scaleX(1)', display: 'inline-block' }}>
                <img className={`${p1State === 'lunging' ? 'anim-swing' : p1State === 'hit' ? 'anim-hit' : 'anim-idle'}`} src={playerChar.name === '关羽' ? '/guan_yu_combat.png' : '/qin_qiong_combat.png'} style={{ width: '450px' }} alt="player" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '1rem' }}>
                <h3>{playerChar.name}</h3>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>1P 操作: A S D F</span>
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
                <div key={dt.id} className="floating-damage">{dt.value}</div>
              ))}
              <div style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>
                <img className={`${p2State === 'lunging' ? 'anim-swing' : p2State === 'hit' ? 'anim-hit' : 'anim-idle'}`} src={enemyChar.name === '关羽' ? '/guan_yu_combat.png' : '/qin_qiong_combat.png'} style={{ width: '450px' }} alt="enemy" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '1rem' }}>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>2P 操作: H J K L</span>
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

          {/* Battle Logs Bottom */}
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
          <p style={{ fontSize: '1.5rem', color: 'var(--primary-gold)', margin: '2rem 0' }}>英雄气短，儿女情长。这一战，足以名垂青史！</p>
          <button className="btn-premium" onClick={() => setGameState('menu')}>重回巅峰</button>
        </div>
      )}
    </div>
  );
}

export default App;
