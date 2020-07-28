const mainArea = document.querySelector(".main-area")
const score = document.querySelector(".score")
const healthBar = document.querySelector(".filled-health-bar")
const sshealthBar = document.querySelector(".filled-sshealth-bar")
const body = document.getElementsByTagName("body")[0]
const hero = document.querySelector(".hero")

let keysPressed = {}
let ssHealth = 200
let Health = 200
let scoreVar = 0
let numOfIntervals

let music = new Audio("./sound/bg.mp3")

game = () =>{

music.autoplay = true
music.play()
music.volume = 0.15


keyHandling = event =>{
    
    // console.log("down",event.key);
    keysPressed[event.key] = true
    
    if(parseInt(getComputedStyle(hero).getPropertyValue("top")) < 0)
    {
        hero.style.removeProperty("top")
        hero.style.bottom = "0px"
    }
    else if(parseInt(getComputedStyle(hero).getPropertyValue("top")) > 580)
    {
        hero.style.top = "0px"
    }
    else if(parseInt(getComputedStyle(hero).getPropertyValue("left")) > 1230)
    {
        hero.style.left = "70px"
    }
    else if(parseInt(getComputedStyle(hero).getPropertyValue("left")) < 90)
    {
        hero.style.left = "1230px"
    }

    if(keysPressed["w"] && keysPressed["a"])
    {
        hero.style.top = parseInt(getComputedStyle(hero).getPropertyValue("top")) - 10 + 'px'
        hero.style.left = parseInt(getComputedStyle(hero).getPropertyValue("left")) - 20 + 'px'
    }
    else if(keysPressed["w"] && keysPressed["d"])
    {
        hero.style.top = parseInt(getComputedStyle(hero).getPropertyValue("top")) - 10 + 'px'
        hero.style.left = parseInt(getComputedStyle(hero).getPropertyValue("left")) + 20 + 'px'
    }
    else if(keysPressed["a"] && keysPressed["s"])
    {
        hero.style.top = parseInt(getComputedStyle(hero).getPropertyValue("top")) + 10 + 'px'
        hero.style.left = parseInt(getComputedStyle(hero).getPropertyValue("left")) - 20 + 'px'
    }
    else if(keysPressed["d"] && keysPressed["s"])
    {
        hero.style.top = parseInt(getComputedStyle(hero).getPropertyValue("top")) + 10 + 'px'
        hero.style.left = parseInt(getComputedStyle(hero).getPropertyValue("left")) + 20 + 'px'
    }
    
    else
    {
        switch(event.key)
        {
            case "w":
                keysPressed[event.key] = true
                hero.style.top = parseInt(getComputedStyle(hero).getPropertyValue("top")) - 10 + 'px'
                break
            case "a":
                keysPressed[event.key] = true
                hero.style.left = parseInt(getComputedStyle(hero).getPropertyValue("left")) - 20 + 'px'
                break
            case "s":
                keysPressed[event.key] = true
                hero.style.top = parseInt(getComputedStyle(hero).getPropertyValue("top")) + 10 + 'px'
                break
            case "d":
                keysPressed[event.key] = true
                hero.style.left = parseInt(getComputedStyle(hero).getPropertyValue("left")) + 20 + 'px'
                break
            case " ":
                bulletThing()
                break
        }
    }

}
window.addEventListener("keydown",keyHandling)

window.addEventListener("keyup",(event)=>{
    //console.log("up",event.key);  
    keysPressed[event.key] = false
})

    bulletThing = () =>{
    
        let bulletSound = new Audio("./sound/bullet.mp3")
        bulletSound.play()
        setInterval(()=>{
            bulletSound.pause()
        },500)
    
        let bullet = document.createElement("img")
        bullet.setAttribute("src","./img/fire-307891_1280.png")
        bullet.setAttribute("class","bullet")
        bullet.style.left = parseInt(getComputedStyle(hero).getPropertyValue("left")) + 25 + 'px'
        bullet.style.top = parseInt(getComputedStyle(hero).getPropertyValue("top")) - 50 + 'px'
        const bulletAnimId = setInterval(()=>{
            
            let element = document.elementFromPoint(parseInt(bullet.getBoundingClientRect().x)+45,parseInt(bullet.getBoundingClientRect().y))
            // console.log(element && element.className.localeCompare("enemy1"))
            if(element && (element.classList.contains("enemy1") || element.classList.contains("enemy2"))) 
            {
                scoreVar++;
                if(scoreVar>99)
                {
                    score.style.fontSize = "2em"
                }
                score.textContent = scoreVar
    
                const blast = new Audio("./sound/granade.mp3")
                blast.play()
                setInterval(()=>{blast.pause()},1000)
    
                element.remove()
                bullet.remove()
                let explosion = document.createElement("img")
                explosion.setAttribute("src","./img/explosion.gif")
                explosion.setAttribute("class","explosion")
                explosion.style.left = parseInt(element.style.left) - 20 + 'px'
                explosion.style.top = parseInt(element.style.top) + 25 + 'px'
                setInterval(()=>{
                    explosion.remove()
                },700)
            
                // console.log(getComputedStyle(explosion).getPropertyValue("left"))
                // console.log(element.style.left)
                mainArea.appendChild(explosion)
            }
    
            bullet.style.top = parseInt(getComputedStyle(bullet).getPropertyValue("top")) - 10 +'px'
            if(parseInt(getComputedStyle(bullet).getPropertyValue("top"))<10)
            {
                bullet.remove()
                bullet = undefined
                clearInterval(bulletAnimId)
            }
    
            numOfIntervals++
        },15)
    
        mainArea.appendChild(bullet)
    }
    
    launchEnemyID = setInterval(()=>{
        const min = 120
        const max = 1230
        const pos = Math.floor(Math.random() * (max - min) ) + min;
        let enemy = document.createElement("img")
        const enemyDecision = Math.floor(Math.random()*10)
        
        if(enemyDecision > 0 && enemyDecision < 2)
        {
            enemy.setAttribute("src","./img/enemy2.png")
            enemy.setAttribute("class","enemy2")
        }
        else
        {
            enemy.setAttribute("src","./img/enemy1.png")
            enemy.setAttribute("class","enemy1")
        }
        
        enemy.setAttribute("id","enemy1"+pos)
        enemy.style.left = pos+ 'px'
        mainArea.appendChild(enemy)
        //console.log(enemy);
        
        launchEnemy(enemy)
        numOfIntervals++
    },Math.floor(Math.random()*2000)+2000)
    
    launchEnemy = enemy =>{
        enemyAnimID = setInterval(()=>{
            if(enemy)
            {
                if(parseInt(getComputedStyle(enemy).getPropertyValue("top"))>500)
                {
                    enemy.remove()
                    ssHealth -= 20
                    sshealthBar.style.top = 200 - ssHealth + 'px'
                    //console.log(ssHealth);
                    if(ssHealth<=0)
                    {
                        //console.log("hi");
                        // for (var i = 1; i < numOfIntervals; i++)
                        clearInterval(launchEnemyID);
                        // clearInterval(enemyAnimID)
                        const gameOverText = document.createElement("h1")
                        
                        gameOverText.setAttribute("class","game-over-text")
                        gameOverText.innerHTML = "GAME OVER"
                        body.appendChild(gameOverText)
                        window.removeEventListener("keydown",keyHandling)
                        window.removeEventListener("keypress",keyHandling)
                    }
                    if(ssHealth<140) sshealthBar.style.backgroundColor = "yellow"
                    if(ssHealth<60) sshealthBar.style.backgroundColor = "red"
                    
                }
                else
                {
                    enemy.style.top = parseInt(getComputedStyle(enemy).getPropertyValue("top")) + 5 + 'px'
    
                    const element = document.elementFromPoint(parseInt(enemy.getBoundingClientRect().x),parseInt(enemy.getBoundingClientRect().y) + 100)
                    
                    // const delete1 = document.createElement("img")
                    // delete1.setAttribute("src","./img/boss.png")
                    // delete1.style.height = "50px"
                    // delete1.style.width = "50px"
                    // delete1.style.position = "absolute"
                    // delete1.style.left = parseInt(parseInt(enemy.getBoundingClientRect().x)) + 'px'
                    // delete1.style.top = parseInt(parseInt(enemy.getBoundingClientRect().y)) + 100  + 'px'
                    // mainArea.appendChild(delete1)
                    // console.log(delete1.style.left)
                    // console.log(delete1.style.top)
                    
                    if(element && element.classList.contains("hero"))
                    {
                        Health -= 20
                        healthBar.style.top = 200 - Health + "px"
    
                        const blast = new Audio("./sound/granade.mp3")
                        blast.play()
                        setInterval(()=>{blast.pause()},1000)
    
    
                        let explosion = document.createElement("img")
                        explosion.setAttribute("src","./img/explosion.gif")
                        explosion.setAttribute("class","explosion")
                        explosion.style.left = parseInt(enemy.style.left) - 20 + 'px'
                        explosion.style.top = parseInt(enemy.style.top) + 25 + 'px'
                        mainArea.appendChild(explosion)
                        enemy.remove();
                        setInterval(()=>{
                            explosion.remove()
                        },700)
                        
                        if(Health<=0)
                        {
                            //console.log("hi");
                            // for (var i = 1; i < numOfIntervals; i++)
                            clearInterval(launchEnemyID);
                            // clearInterval(enemyAnimID)
                            const gameOverText = document.createElement("h1")
                            
                            gameOverText.setAttribute("class","game-over-text")
                            gameOverText.innerHTML = "GAME OVER"
                            body.appendChild(gameOverText)
                            window.removeEventListener("keydown",keyHandling)
                            window.removeEventListener("keypress",keyHandling)
                        }
                        if(Health<140) healthBar.style.backgroundColor = "yellow"
                        if(Health<60) healthBar.style.backgroundColor = "red"
                        
                    }
                }
            }
            numOfIntervals++
            // console.log(lastIntervalID);
            // console.log(enemyAnimID);
        },enemy.classList.contains("enemy1")?100:30)
    }
    

}
let startButton;
document.onreadystatechange = function() { 
    if (document.readyState !== "complete") { 
        document.querySelector("body").style.visibility = "hidden"; 
        document.querySelector("#loader").style.visibility = "visible"; 
        
        startButton = document.createElement("button")
        startButton.setAttribute("class","start-btn")
        startButton.textContent = 'Start Game'
        mainArea.appendChild(startButton)
        startButton.addEventListener("click",()=>{
            game()
            startButton.remove()
        })
    } else { 
        document.querySelector("#loader").style.display = "none"; 
        document.querySelector("body").style.visibility = "visible"; 
        document.querySelector("body").style.maxHeight = "100vh"; 
        document.querySelector("body").style.height = "100vh"; 

        
    } 
};