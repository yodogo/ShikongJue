# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**GuanVsQin** (关公战秦琼) is a React-based web game featuring a dual-mode battle system:
- **Warrior Mode**: Classic combat between Guan Yu and Qin Qiong (武斗)
- **Poet Mode**: Poetry-based battles between Li Bai and Su Shi (文争)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (Vite)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run unit tests (Vitest)
npm test
# Or run in watch mode
npx vitest

# Run end-to-end tests (Playwright)
npm run test:e2e

# Lint code
npm run lint
```

## Architecture

### Game State Machine

The application uses a centralized state machine in `App.jsx`:
- `theme_selection` → Choose between warrior/poet themes
- `mode_selection` → For poet mode: choose standard vs Flying Flower (飞花令) mode
- `keyword_selection` → For Flying Flower mode: select poetry keyword
- `char_selection` → Select your character (enemy auto-selected)
- `arena` → Active battle state
- `result` → Victory/defeat screen

### Core Battle Engine

`src/core/BattleEngine.js` is the central game logic module:
- **Dual execution methods**: `executeAction()` for standard combat, `executeFFAction()` for Flying Flower poetry mode
- **Damage calculation**: Base damage × multiplier × variance (0.9-1.1), reduced by defender's defense
- **Poet vs Warrior**: Different log messages and victory conditions based on `isPoet` flag
- **Poetry validation**: `validateLine()` checks Flying Flower mode verses contain the keyword and haven't been used

### Theme-Based Data Structure

Theme data in `src/data/` follows this structure:
```javascript
{
    id: 'warrior' | 'poet',
    name: string,
    description: string,
    background: string (image path),
    cover: string (image path),
    characters: {
        [key]: {
            name, title, hp, maxHp, atk, def, spd,
            isPoet: boolean,
            skills: [{ name, damage, verse?, effect?, prob? }],
            portrait: string,
            combatImg: string,
            attackImages?: { 0, 1, 2, basic }  // For warrior attack poses
        }
    }
}
```

**Warrior characters** have `attackImages` for skill-specific combat poses. **Poet characters** have `verse` in skills and use `isPoet: true`.

### Control Mapping

**Player 1 (Left)**: Q/E (move), W/R (jump/dodge), A/S/D (skills), F (basic attack)
**Player 2 (Right)**: U/O (move), I/P (jump/dodge), H/J/K (skills), L (basic attack)

Flying Flower mode is card-based, turn-based instead of keyboard controls.

### Animation System

Character animations are CSS classes controlled by state:
- `idle`, `attack_0/1/2`, `attack_basic`, `hit`, `jump`, `move_forward`, `move_back`, `dodge`
- Poets use `anim-write` instead of attack animations
- See `src/index.css` for keyframe definitions

### Poetry Database

`src/data/poetryDatabase.js` contains classical Chinese poems organized by keywords (月, 花, 酒, 春). Used for Flying Flower mode AI opponent responses.

## Visual Effects

- **Glass morphism**: `.glass-panel` class uses `backdrop-filter: blur()`
- **Ink splashes**: `.ink-splash` for poet mode skill effects
- **Floating damage**: `.floating-damage` shows damage numbers
- **Poetry verse overlay**: `.poetry-verse` displays active poems

## Adding New Content

### New Theme
1. Create theme data file in `src/data/`
2. Add to `ALL_THEMES` array in `App.jsx`
3. Add character images to `public/themes/[theme]/`

### New Character
Add to theme's `characters` object with required properties. Warriors should include `attackImages` for skill poses.

### New Poetry Keyword
Add to `COMMON_KEYWORDS` and `poetryDB` in `src/data/poetryDatabase.js`.
