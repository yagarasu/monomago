import './style.css'
import Game from './lib/Game'

const el = document.getElementById('app');
if (!el) throw new Error('Element ID not found');

const game = new Game(el)
game.run()
