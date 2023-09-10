const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i+=90){
    collisionsMap.push(collisions.slice(i, 90 + i))
}

const teleportMap = []
for (let i = 0; i < teleportZones.length; i+=90){
    teleportMap.push(teleportZones.slice(i, 90 + i))
}

const boundaries = []
const offset = {
    x: -538,
    y: -600
}

const teleportHouse1 = []
const teleportHouse2 = []
const teleportHouse3 = []
const teleportHouse4 = []
const teleportHouse5 = []

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

teleportMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1){
            teleportHouse1.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        } else if (symbol === 2){
            teleportHouse2.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        } else if (symbol === 3){
            teleportHouse3.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        } else if (symbol === 4){
            teleportHouse4.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        } else if (symbol === 5){
            teleportHouse5.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

const image = new Image()
image.src = './img/Mapa Website Marta Ribeiro.png'

const foregoundImage = new Image()
foregoundImage.src = './img/Mapa Website Marta Ribeiro Foreground.png'

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png'

const instructionsImage = new Image();
instructionsImage.src = './img/0.png'

const spaceBarImage = new Image();
spaceBarImage.src = './img/spacebar.png'

const house1Image = new Image()
house1Image.src = './img/1.png'

const house2Image = new Image()
house2Image.src = './img/2.png'

const house3Image = new Image()
house3Image.src = './img/3.png'

const house4Image = new Image()
house4Image.src = './img/4.png'

const house5Image = new Image()
house5Image.src = './img/5.png'

const player = new Sprite({
    position: {
        x:canvas.width/2 - 192/4/2,
        y:canvas.height/2 - 68/2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})

const background = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image: foregoundImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    arrowUp: { pressed: false },
    arrowLeft: { pressed: false },
    arrowDown: { pressed: false },
    arrowRight: { pressed: false },
    space: {
        pressed: false
    }
}

const movables = [background, ...boundaries,
    ...teleportHouse1, ...teleportHouse2, ...teleportHouse3, ...teleportHouse4, ...teleportHouse5, 
    foreground]

function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width - 10 >= rectangle2.position.x &&
        rectangle1.position.x + 10 <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + 2 <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height - 2 >= rectangle2.position.y
    )
}

let clicked = false
let instructed = false

const fps = 100;

function animate(){
    setTimeout(() => {
        window.requestAnimationFrame(animate)
    }, 1000 / fps);
    c.drawImage(instructionsImage,0,0,1024,576)
    if(clicked){
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    teleportHouse1.forEach(boundary => {
        boundary.draw()
    })
    teleportHouse2.forEach(boundary => {
        boundary.draw()
    })
    teleportHouse3.forEach(boundary => {
        boundary.draw()
    })
    teleportHouse4.forEach(boundary => {
        boundary.draw()
    })
    teleportHouse5.forEach(boundary => {
        boundary.draw()
    })
    player.draw()
    foreground.draw()
    for(let i = 0; i < teleportHouse1.length; i++){
        const boundary = teleportHouse1[i]
        if(
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })

        ){
            c.drawImage(spaceBarImage,0,0,1024,576)
            break
        }
    }
    for(let i = 0; i < teleportHouse2.length; i++){
        const boundary = teleportHouse2[i]
        if(
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })

        ){
            c.drawImage(spaceBarImage,0,0,1024,576)
            break
        }
    }
    for(let i = 0; i < teleportHouse3.length; i++){
        const boundary = teleportHouse3[i]
        if(
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })

        ){
            c.drawImage(spaceBarImage,0,0,1024,576)
            break
        }
    }
    for(let i = 0; i < teleportHouse4.length; i++){
        const boundary = teleportHouse4[i]
        if(
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })

        ){
            c.drawImage(spaceBarImage,0,0,1024,576)
            break
        }
    }
    for(let i = 0; i < teleportHouse5.length; i++){
        const boundary = teleportHouse5[i]
        if(
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })

        ){
            c.drawImage(spaceBarImage,0,0,1024,576)
            break
        }
    }
    if(keys.space.pressed){
        for(let i = 0; i < teleportHouse1.length; i++){
            const boundary = teleportHouse1[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })

            ){
                c.drawImage(house1Image,0,0,1024,576)
                break
            }
        }
        for(let i = 0; i < teleportHouse2.length; i++){
            const boundary = teleportHouse2[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ){
                c.drawImage(house2Image,0,0,1024,576)
                break
            }
        }
        for(let i = 0; i < teleportHouse3.length; i++){
            const boundary = teleportHouse3[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ){
                c.drawImage(house3Image,0,0,1024,576)
                break
            }
        }
        for(let i = 0; i < teleportHouse4.length; i++){
            const boundary = teleportHouse4[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ){
                c.drawImage(house4Image,0,0,1024,576)
                break
            }
        }
        for(let i = 0; i < teleportHouse5.length; i++){
            const boundary = teleportHouse5[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ){
                c.drawImage(house5Image,0,0,1024,576)
                break
            }
        }
    }
    let moving = true
    player.moving = false
    if(keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ){
                moving = false
                break
            }
        }
        if(moving)
            movables.forEach(movable => {
                movable.position.y += 3
            })
    } else if(keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                })
            ){
                moving = false
                break
            }
        }
        if(moving)
            movables.forEach(movable => {
                movable.position.x += 3
            })
    } else if(keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })
            ){
                moving = false
                break
            }
        }
        if(moving)
            movables.forEach(movable => {
                movable.position.y -= 3
            })
    } else if(keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                })
            ){
                moving = false
                break
            }
        }
        if(moving)
            movables.forEach(movable => {
                movable.position.x -= 3
            })
    }
}
}

animate()

let lastKey = ''

window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'w':
            case 'ArrowUp':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            case 'ArrowLeft':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            case 'ArrowDown':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            case 'ArrowRight':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case ' ':
            keys.space.pressed = true
            lastKey = ' '
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':
            case 'ArrowUp':
            keys.w.pressed = false
            break
        case 'a':
            case 'ArrowLeft':
            keys.a.pressed = false
            break
        case 's':
            case 'ArrowDown':
            keys.s.pressed = false
            break
        case 'd':
            case 'ArrowRight':
            keys.d.pressed = false
            break
        case ' ':
            keys.space.pressed = false
            break
    }
})

window.addEventListener('keyup', (e) => {
    clicked = true
})