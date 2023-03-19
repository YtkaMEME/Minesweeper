import {CreatePlayground, Doflag, DoPressed, restartGame, DoOnmouseout, Win, Lose, BombInGame, startTheGame, number} from './logic.js';

const playground = CreatePlayground(16,40);
const ground = document.querySelector('.ground');
const smile = document.querySelector('.btn');

let interval;
let bol = false;
let numb = 0;

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

            if (!bol){
                MenuBomb(BombInGame(playground));
                startTheGame(playground, title);
                bol = true;
                interval = setInterval(() => {
                    numb++;
                    if (numb === 1000){
                        numb = 1;
                    }
                    let str = String(numb).split('')
                    if (numb < 10){
                        str.unshift('0');
                        str.unshift('0');
                    }else if (numb < 100){
                        str.unshift('0');
                    }
                    const d = document.querySelector('.d');
                    const e = document.querySelector('.e');
                    const f = document.querySelector('.f'); 
                    d.setAttribute('class', ('d ' + 'number' + number(Number(str[0]))));
                    e.setAttribute('class', ('e ' + 'number' + number(Number(str[1]))));
                    f.setAttribute('class', ('f ' + 'number' + number(Number(str[2]))));
                } ,1000);
            }
            
            DoPressed(playground, title);
            GameEnd();
        })
        title.square.addEventListener ('contextmenu', fun => {
            fun.preventDefault();
            if (!bol){
                MenuBomb(BombInGame(playground));
                bol = true;
                interval = setInterval(() => {
                    numb++;
                    if (numb === 1000){
                        numb = 1;
                    }
                    let str = String(numb).split('')
                    if (numb < 10){
                        str.unshift('0');
                        str.unshift('0');
                    }else if (numb < 100){
                        str.unshift('0');
                    }
                    const d = document.querySelector('.d');
                    const e = document.querySelector('.e');
                    const f = document.querySelector('.f'); 
                    d.setAttribute('class', ('d ' + 'number' + number(Number(str[0]))));
                    e.setAttribute('class', ('e ' + 'number' + number(Number(str[1]))));
                    f.setAttribute('class', ('f ' + 'number' + number(Number(str[2]))));
                } ,1000);
            }
            Doflag(title);
            MenuBomb(BombInGame(playground));
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
        clearInterval(interval);
        smile.setAttribute('class', 'btn smileWin');
        playground.forEach(row => {
            row.forEach(title => {
              if (title.getClass() === 'flag' || title.getClass() === 'question') Doflag(title, win)
              if (title.bomb) DoPressed(playground, title, win)
            })
          })
    }

    if(lose){
        clearInterval(interval);
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

function MenuBomb(numb){
    
    const a = document.querySelector('.a');
    const b = document.querySelector('.b');
    const c = document.querySelector('.c'); 
    a.setAttribute('class', ('a ' + numb[0]));
    b.setAttribute('class', ('b ' + numb[1]));
    c.setAttribute('class', ('c ' + numb[2]));
}



