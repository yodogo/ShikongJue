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
  const [animating, setAnimating] = useState(false);
  const logEndRef = useRef(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [battleLogs]);

  const startGame = (charKey) => {
    const player = characters[charKey];
    const enemy = charKey === 'guanYu' ? characters.qinQiong : characters.guanYu;

    setPlayerChar({ ...player });
    setEnemyChar({ ...enemy });
    setBattleInstance(new BattleEngine(player, enemy));
    setBattleLogs(["战斗开始！"]);
    setGameState('arena');
    setWinner(null);
  };

  const performTurn = () => {
    if (gameState !== 'arena' || winner || animating) return;

    setAnimating(true);
    const result = battleInstance.nextTurn();

    // Update HP states for UI
    setPlayerChar({ ...battleInstance.charA });
    setEnemyChar({ ...battleInstance.charB });
    setBattleLogs([...result.logs]);

    if (result.status === 'finished') {
      setWinner(result.winner);
      setTimeout(() => setGameState('result'), 1500);
    }

    setTimeout(() => setAnimating(false), 500);
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
        <div className="arena-container">
          <div className={`battle-char ${animating ? 'animate-shake' : ''}`}>
            <img src={playerChar.name === '关羽' ? '/guan_yu.png' : '/qin_qiong.png'} style={{ width: '300px', borderRadius: '12px', border: '2px solid var(--primary-gold)' }} alt="player" />
            <h3>{playerChar.name}</h3>
            <div className="hp-bar-container">
              <div className="hp-bar-fill" style={{ width: `${(playerChar.hp / playerChar.maxHp) * 100}%` }}></div>
            </div>
            <p>HP: {playerChar.hp} / {playerChar.maxHp}</p>
          </div>

          <div className="battle-logs glass-panel">
            <h3>对阵记录</h3>
            <div style={{ height: '300px', overflowY: 'auto' }}>
              {battleLogs.map((log, i) => (
                <div key={i} className="log-entry">{log}</div>
              ))}
              <div ref={logEndRef} />
            </div>
            <button className="btn-premium" style={{ width: '100%', marginTop: '1rem' }} onClick={performTurn} disabled={animating || winner}>
              {animating ? '战斗中...' : '开始回合'}
            </button>
          </div>

          <div className={`battle-char ${animating ? 'animate-shake' : ''}`}>
            <img src={enemyChar.name === '关羽' ? '/guan_yu.png' : '/qin_qiong.png'} style={{ width: '300px', borderRadius: '12px', border: '2px solid var(--accent-crimson)' }} alt="enemy" />
            <h3>{enemyChar.name}</h3>
            <div className="hp-bar-container">
              <div className="hp-bar-fill" style={{ width: `${(enemyChar.hp / enemyChar.maxHp) * 100}%` }}></div>
            </div>
            <p>HP: {enemyChar.hp} / {enemyChar.maxHp}</p>
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
