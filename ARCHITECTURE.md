# GuanVsQin - Project Architecture

## Overview

This is a React-based web game featuring dual-mode battles (Warrior and Poet modes). The project has been refactored for better modularity and maintainability.

## Directory Structure

```
src/
├── constants/           # Game constants and configuration
│   └── gameStates.js   # Game states, animation states, control mappings
├── hooks/              # Custom React hooks
│   ├── useBattleState.js       # Battle state management
│   ├── useAnimations.js        # Animation state management
│   └── useKeyboardControls.js  # Keyboard input handling
├── utils/              # Utility functions
│   ├── damageUtils.js   # Damage calculation helpers
│   ├── animationUtils.js # Animation mapping helpers
│   └── poetryUtils.js   # Poetry display helpers
├── services/           # Business logic services
│   ├── speechService.js # Speech synthesis for poetry
│   └── battleService.js # Battle execution logic
├── data/               # Game data
│   ├── index.js        # Central export for all themes
│   ├── warriorTheme.js # Warrior theme data
│   ├── poetTheme.js    # Poet theme data
│   └── poetryDatabase.js # Poetry library for FF mode
├── core/               # Core game logic
│   ├── BattleEngine.js # Battle calculation engine
│   └── BattleEngine.test.js # Unit tests
├── components/         # React components
│   ├── ThemeSelector.jsx
│   ├── CharacterSelector.jsx
│   ├── screens/        # Screen components
│   │   ├── ModeSelection.jsx
│   │   ├── KeywordSelection.jsx
│   │   └── BattleResult.jsx
│   ├── arena/          # Battle arena components
│   │   ├── BattleCharacter.jsx
│   │   ├── PoetryStage.jsx
│   │   ├── FlyingFlowerArena.jsx
│   │   └── BattleLogs.jsx
│   └── ui/             # Reusable UI components
│       ├── HealthBar.jsx
│       ├── FloatingDamage.jsx
│       └── SkillIndicator.jsx
├── styles/             # Modular CSS
│   ├── variables.css   # CSS variables
│   ├── base.css        # Base styles
│   ├── components.css  # Component styles
│   ├── animations.css  # Animation keyframes
│   └── arena.css       # Arena-specific styles
├── App.jsx             # Main application component
└── main.jsx            # React entry point
```

## Key Modules

### Constants (`src/constants/`)
- **gameStates.js**: Defines all game states, animation states, and control mappings

### Hooks (`src/hooks/`)
- **useBattleState**: Manages game state machine and battle state
- **useAnimations**: Manages character animations and visual effects
- **useKeyboardControls**: Handles keyboard input for battles

### Services (`src/services/`)
- **speechService**: Singleton service for text-to-speech with character voice profiles
- **battleService**: Executes combat actions and Flying Flower mode rounds

### Components (`src/components/`)
- **screens/**: Full-screen components for different game states
- **arena/**: Battle arena display components
- **ui/**: Reusable UI elements (health bars, damage indicators, etc.)

## Data Flow

1. **State Management**: `useBattleState` hook manages the game state machine
2. **User Input**: `useKeyboardControls` captures keyboard events
3. **Action Execution**: `battleService` processes actions and updates state
4. **Visual Feedback**: `useAnimations` manages animations and effects
5. **UI Updates**: React components re-render based on state changes

## Key Design Patterns

- **Singleton Services**: Speech and battle services are singletons
- **Custom Hooks**: State and logic encapsulation in reusable hooks
- **Component Composition**: Complex UI built from simple components
- **Separation of Concerns**: Clear separation between data, logic, and presentation
