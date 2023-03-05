import {CreatePlayground, Doflag, DoPressed, restartGame, DoOnmouseout} from './logic.js';

const playground = CreatePlayground(16,30);
const ground = document.querySelector('.ground');
const smile = document.querySelector('.btn');

smile.addEventListener('click', () =>{
    restartGame(smile);
})

playground.forEach(row =>{
    row.forEach(title =>{
        title.square.addEventListener ('mousedown', () =>{
            DoOnmouseout(smile);
        })
        title.square.addEventListener ('mouseup', () =>{
            DoOnmouseout(smile);
        })
        ground.append(title.square);
        title.square.addEventListener ('click', () => {
            DoPressed(playground, title);
        })
        title.square.addEventListener ('contextmenu', fun => {
            fun.preventDefault();
            Doflag(title);
        });
    })
})
