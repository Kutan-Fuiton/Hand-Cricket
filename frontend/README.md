# Hand Cricket Game

A modern, responsive hand cricket game built with React, TypeScript, and Tailwind CSS.

## Features

- **Multiple Game Modes**: 1v1, Player vs Computer, Team vs Team, and Custom modes
- **Responsive Design**: Looks great on all devices (mobile, tablet, desktop)
- **Dark Mode**: Automatic dark/light theme based on system preference with toggle option
- **Animated UI**: Smooth animations using Framer Motion
- **Realistic Computer Opponent**: Computer makes strategic moves based on game state

## Game Modes

- **1v1 Mode**: Classic hand cricket between two players taking turns
- **VS Computer**: Play against the computer with varying difficulty levels
- **Team VS Team**: Multiple players per team with batting and bowling turns
- **Custom Match**: Set your own rules, overs, and team composition

## How to Play

1. Each player shows a hand gesture representing a number from 1 to 6
2. If the gestures match, the batter is out
3. If they don't match, the batter scores the number they showed
4. After the batter is out or overs are completed, teams switch roles
5. The team with more runs wins the match!

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Router
- Framer Motion
- Headless UI
- Heroicons

## Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hand-cricket.git

# Navigate to the project directory
cd hand-cricket

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
npm run build
```

## License

MIT
