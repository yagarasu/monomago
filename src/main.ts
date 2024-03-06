import './style.css'
import MyGame from './samples/MyGame';

const el = document.getElementById('app');
if (!el) throw new Error('Element ID not found');

const game = new MyGame(el)
game.run()
