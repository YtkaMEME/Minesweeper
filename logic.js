
let flag = false;
let bol = true;
export function CreatePlayground(width, bombsInAGame){
    const bombPosition = getBombPosition(width, bombsInAGame);
    const playground = [];
    for (let x = 0; x < width; x++){
        const row = [];
        for(let y = 0; y < width; y++){

            const square = document.createElement('div');
            square.setAttribute('class', 'hidden')
            const title ={
                bomb: bombPosition.some(positionMatch.bind(null, {x, y})),
                square,
                x,
                y,
                getClass() {
                    const uclass = this.square.getAttribute('class');
                    return uclass;
                },
                setClass(value) {
                    this.square.setAttribute('class', value);
                },
            }

            row.push(title);
        }
        playground.push(row);
    }
    return playground;
}

function getBombPosition(width, bombsInAGame){
    const position = [];
    while (position.length < bombsInAGame){
        const pos = {
            x: randNum (width),
            y: randNum (width)
        }

        if (!position.some(p => positionMatch (p, pos))){
            position.push(pos);
        }

    }
    return position;
}

function positionMatch(a, b){
    return a.x === b.x && a.y == b.y
}

function randNum (width){
    return Math.floor (Math.random()*width)
}

export function Doflag(title, flg = false){
    if (
        title.getClass() !== 'hidden' &&
        title.getClass() !== 'flag' &&
        title.getClass() !== 'question'
      ) {
        return
      }
      if (title.getClass() === 'flag') {
        if (!flg){
            title.setClass('question');
        }else{
            if(title.bomb){
                title.setClass('ClearBomb');
            }
        }
      }else if (title.getClass() === 'question') {
        if (!flg){
            title.setClass('hidden');
        }else{
            if(title.bomb){
                title.setClass("mine");
            }
        }
      } else {
        if (!flag){
            title.setClass('flag');
        }
      }
}

export function  DoPressed(playground, title, flg = false){
    if (
        title.getClass() !== 'hidden'
      ) {
        return;
    }
    if (title.bomb){
        if (!flg){
            title.setClass('redBomb');
        }else{
            title.setClass('mine');
        }        
        return;
    }else{
        title.setClass('pressed'); 
        const adjacentTiles = nearby(playground, title);
        const bombs = adjacentTiles.filter(t => t.bomb);
        if (bombs.length === 0) {
          adjacentTiles.forEach(DoPressed.bind(null, playground))
        } else {
            title.setClass('number ' + number(bombs.length));  
        }
    }        
}

function nearby(playground, { x, y }) {
  const tiles = []

  for (let x0 = -1; x0 <= 1; x0++) {
    for (let y0 = -1; y0 <= 1; y0++) {
      const tile = playground[x + x0]?.[y + y0];
      if (tile) tiles.push(tile)
    }
  }
  return tiles;
}

export function number(number){
    switch (number){
        case 0:
            return 'null';
        case 1:
            return 'one';
        case 2:
            return 'two';
        case 3:
            return 'three';
        case 4:
            return 'four';
        case 5:
            return 'five';
        case 6:
            return 'six';
        case 7:
            return 'seven';
        case 8:
            return 'eight';
        case 9:
            return 'nine';
    }
}

export function restartGame(element){
    if (element.getAttribute('class') !== 'btn pressedSmile')
    {
        element.setAttribute('class', 'btn pressedSmile');
    }else{
        element.setAttribute('class', 'btn smile');
    }
    location.reload();
}

export function DoOnmouseout(element){
    if (
        element.getAttribute('class') == 'btn smileWin'||
        element.getAttribute('class') == 'btn smileLose'
    )
    {
        return;
    }
    if (element.getAttribute('class') !== 'btn smileWow')
    {
        element.setAttribute('class', 'btn smileWow');
    }else{
        element.setAttribute('class', 'btn smile');
    }
}


export function Win(playground){
    let numb = 0;
    playground.forEach(row => {
        return row.forEach(title => {
            if (title.getClass() === 'hidden' ||
            title.getClass() === 'flag' || title.getClass() === 'question'){
                numb++;
            }
            })
        })
    if(numb === 30){
        return true;
    }
    else{
        return false;
    }
}

export function Lose(playground){
    return playground.some(row => {
        return row.some(tile => {
          return tile.getClass() === 'redBomb';
        })
    })
}

export function BombInGame(playground){
    const NoHidden = playground.reduce((count, row) =>{
        return count + row.filter(title =>title.getClass() == 'flag').length + row.filter(title => title.getClass() == 'question').length
    }, 0)
    if (30 - NoHidden < 1){
        flag = true;
    }else{
        flag = false;
    }
    let number = (30 - NoHidden);
    return Tik(number);
}

function Tik(numb){
    let Bomb = ['numbernull'];
    Bomb.push('number' + number(Math.floor(numb/10)));
    Bomb.push( 'number' + number(numb%10));
    return Bomb;
}



export function startTheGame(playground, title){
    if (title.bomb){
        title.bomb = false;
        playground.forEach(row =>{
            row.forEach(title =>{
                if (title.bomb === false && title.getClass()==='hidden' && bol){
                    title.bomb = true;
                    bol = false;
                }
            })
        })
    }
    return ;
}
