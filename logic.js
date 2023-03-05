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

export function Doflag(title){
    if (
        title.getClass() !== 'hidden' &&
        title.getClass() !== 'flag' &&
        title.getClass() !== 'question'
      ) {
        return
      }
      if (title.getClass() === 'flag') {
        title.setClass('question');
      }else if (title.getClass() === 'question') {
        title.setClass('hidden');
      } else {
        title.setClass('flag');
      }
}

export function  DoPressed(playground, title){
    if (
        title.getClass() !== 'hidden'
      ) {
        return;
    }
    if (title.bomb){
        title.setClass('redBomb');
        return;
    }else{
        title.setClass('pressed'); 
        const adjacentTiles = nearby(playground, title);
        const bombs = adjacentTiles.filter(t => t.bomb);
        if (bombs.length === 0) {
          adjacentTiles.forEach(DoPressed.bind(null, playground))
        } else {
            title.setClass(number(bombs.length));  
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

function number(number){
    switch (number){
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
    if (element.getAttribute('class') !== 'btn smileWow')
    {
        element.setAttribute('class', 'btn smileWow');
    }else{
        element.setAttribute('class', 'btn smile');
    }
}