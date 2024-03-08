import './style.css'
import Game from './lib/Game';
import MenuScene from './samples/MenuScene/MenuScene';
import InfoScene from './samples/InfoScene/InfoScene';

const el = document.getElementById('app');
if (!el) throw new Error('Element ID not found');

const game = new Game(el, {
  'menu': { sceneFactory: () => new MenuScene(), mode: 'SINGLETON' },
  'info': { sceneFactory: () => new InfoScene(), mode: 'INSTANCE' },
})
window.g = game
game.run('info')
