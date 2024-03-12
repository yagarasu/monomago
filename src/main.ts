import './style.css'
import Game from './lib/Game';
import { menuSceneFactory } from './samples/MenuScene/MenuScene';
import { infoSceneFactory } from './samples/InfoScene/InfoScene';

const el = document.getElementById('app');
if (!el) throw new Error('Element ID not found');

const game = new Game(el, {
  'menu': { sceneFactory: menuSceneFactory, mode: 'SINGLETON' },
  'info': { sceneFactory: infoSceneFactory, mode: 'INSTANCE' },
})

game.run('info')
