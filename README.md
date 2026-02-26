# 时空决 (ShikongJue)

A React-based web game featuring cross-temporal battles between legendary Chinese historical figures. Engage in epic combat between warriors from different eras, or witness poetic duels between renowned literary masters.

![Theme Selection Screen](src/assets/theme_selection.png)

## Game Features

### Dual Battle Modes

- **Warrior Mode (武斗)**: Classic action combat between legendary warriors
  - Guan Yu (三国武圣) vs Qin Qiong (唐代门神)
  - Action-based combat with skills, movement, and special attacks

- **Poet Mode (文争)**: Poetry-based battles between literary masters
  - **Standard Mode**: Li Bai (诗仙) vs Su Shi (词圣) with verse-based skills
  - **Flying Flower Mode (飞花令)**: Turn-based card game featuring classical Chinese poetry

### Visual Effects
- Dynamic CSS3 character animations (idle, attack, hit, jump, dodge)
- Glass morphism UI with `.glass-panel` styling
- Ink splash effects for poet mode skills
- Floating damage numbers and combat feedback

## Game State Flow

The game uses a centralized state machine with these stages:
```
theme_selection → mode_selection → keyword_selection → char_selection → arena → result
```

## Controls

### Warrior Mode (Keyboard-based)

**Player 1 (Left)**
| Key | Action |
|:---|:---|
| Q / E | Move backward / forward |
| W / R | Jump / Dodge |
| A / S / D | Skills (青龙斩 / 威震华夏 / 单刀赴会) |
| F | Basic attack |

**Player 2 (Right)**
| Key | Action |
|:---|:---|
| U / O | Move backward / forward |
| I / P | Jump / Dodge |
| H / J / K | Skills (撒手锏 / 马踏黄河 / 双锏无双) |
| L | Basic attack |

### Poet Mode - Standard (Keyboard-based)

Same controls as Warrior Mode - skills trigger poetry-based attacks.

**Player 1 (Left) - Li Bai**
| Key | Action |
|:---|:---|
| Q / E | Move backward / forward |
| W / R | Jump / Dodge |
| A / S / D | Skills (举杯邀月 / 将进酒 / 梦游天姥) |
| F | Basic attack |

**Player 2 (Right) - Su Shi**
| Key | Action |
|:---|:---|
| U / O | Move backward / forward |
| I / P | Jump / Dodge |
| H / J / K | Skills (大江东去 / 水调歌头 / 赤壁怀古) |
| L | Basic attack |

### Poet Mode - Flying Flower (飞花令, Turn-based)

Click poetry cards to select verses containing the required keyword. Available keywords: **月, 花, 酒, 春, 风, 山, 水**. The AI opponent will automatically respond with matching verses from the poetry database.

## Tech Stack

- **Framework**: React 19.2 with Hooks
- **Build Tool**: Vite 7.x
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Styling**: Vanilla CSS with keyframe animations, HSL colors
- **No external UI libraries** - Pure React + CSS

## Project Structure

```
src/
├── assets/                    # Game images and assets
│   ├── arena_bg.png
│   ├── battle_preview.png
│   ├── theme_selection.png
│   └── themes/                # Theme-specific character images
│       ├── poet/              # Poet character portraits
│       └── warrior/           # Warrior character portraits & attack poses
├── App.jsx                    # Main state machine & routing
├── main.jsx                   # React entry point
├── components/
│   ├── arena/                 # Battle arena components
│   │   ├── BattleCharacter.jsx
│   │   ├── BattleLogs.jsx
│   │   ├── FlyingFlowerArena.jsx
│   │   └── PoetryStage.jsx
│   ├── screens/               # Game flow screens
│   │   ├── BattleResult.jsx
│   │   ├── KeywordSelection.jsx
│   │   └── ModeSelection.jsx
│   ├── ui/                    # UI components
│   │   ├── FloatingDamage.jsx
│   │   ├── HealthBar.jsx
│   │   └── SkillIndicator.jsx
│   ├── CharacterSelector.jsx
│   └── ThemeSelector.jsx
├── constants/
│   └── gameStates.js          # Game states, animation states, control mappings
├── core/
│   ├── BattleEngine.js        # Core game logic
│   └── BattleEngine.test.js
├── data/
│   ├── index.js               # Theme exports
│   ├── poetTheme.js           # Poet characters & skills
│   ├── poetryDatabase.js      # Flying Flower poem library
│   └── warriorTheme.js        # Warrior characters & skills
├── hooks/
│   ├── useAnimations.js       # Animation state management
│   ├── useBattleState.js      # Battle state hooks
│   └── useKeyboardControls.js # Keyboard input handling
├── services/
│   ├── battleService.js       # Battle orchestration
│   └── speechService.js       # TTS integration
└── utils/
    ├── animationUtils.js
    ├── damageUtils.js
    └── poetryUtils.js
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests (Vitest)
npm test

# Run E2E tests (Playwright)
npm run test:e2e

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Battle Engine

Located in [`src/core/BattleEngine.js`](src/core/BattleEngine.js):
- `executeAction()`: Handles warrior mode combat actions
- `executeFFAction()`: Handles Flying Flower mode poetry battles
- Damage formula: `baseDamage × multiplier × variance(0.9-1.1) - defender.defense`
- Poetry validation via `validateLine()` for keyword checking

## Adding Content

### New Theme
1. Create theme data in `src/data/[theme]Theme.js`
2. Add to `ALL_THEMES` in `src/data/index.js`
3. Add images to `src/assets/themes/[theme]/`

### New Character
Add to theme's `characters` object with:
```javascript
{
    name, title, hp, maxHp, atk, def, spd,
    isPoet: boolean,
    skills: [{ name, damage, verse?, effect?, prob? }],
    portrait: string,
    combatImg: string,
    attackImages?: { 0, 1, 2, basic }  // Warrior attack poses
}
```

### New Poetry Keyword
Add to `COMMON_KEYWORDS` and `poetryDB` in `src/data/poetryDatabase.js`

## License

MIT
