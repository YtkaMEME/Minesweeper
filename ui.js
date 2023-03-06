import {CreatePlayground, Doflag, DoPressed, restartGame, DoOnmouseout, Win, Lose, BombInGame} from './logic.js';

const playground = CreatePlayground(16,30);
const ground = document.querySelector('.ground');
const smile = document.querySelector('.btn');
let Bomb;

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
            GameEnd();
        })
        title.square.addEventListener ('contextmenu', fun => {
            fun.preventDefault();
            Doflag(title);
            Bomb = BombInGame(playground);
            GameEnd();
        });
    })
})


function GameEnd(){
    const win = Win(playground);
    const lose = Lose(playground);

    if (win || lose){
        ground.addEventListener('click', StopProp,{capture: true} );
        ground.addEventListener('contextmenu', StopProp,{capture: true} );
    }

    if(win){
        smile.setAttribute('class', 'btn smileWin');
        playground.forEach(row => {
            row.forEach(title => {
              if (title.getClass() === 'flag' || title.getClass() === 'question') Doflag(title, win)
              if (title.bomb) DoPressed(playground, title, win)
            })
          })
    }

    if(lose){
        smile.setAttribute('class', 'btn smileLose');
        playground.forEach(row => {
            row.forEach(title => {
              if (title.getClass() === 'flag' || title.getClass() === 'question') Doflag(title, lose)
              if (title.bomb) DoPressed(playground, title, lose)
            })
          })
    }
}

function StopProp(t){
    t.stopPropagation();
}