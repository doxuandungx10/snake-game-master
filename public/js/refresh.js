function refresh() {
    let gameover = document.getElementById('canvas-background');
    gameover.style.transition = "0.5s"
    gameover.style.display = "flex";
    let reFresh = `
    <div id="refresh">
        <img id="image" src="img/refresh.png" alt="">
    <div>
    <div style="margin-top: -50px">
        <span style="font-size: 40px;">Your score: ${score}</span>
    </div>
    </div>
    <div id="button" >
        <button id="refreshBtn">
            <img src="img/refresh-button.png" alt="">
        </button>
    </div>    
    </div>    
`
    gameover.innerHTML += reFresh;
    // let homeBtn = document.getElementById('homeBtn')
    // homeBtn.addEventListener('click',function(){ location.reload()})
    let refreshBtn = document.getElementById('refreshBtn')
    refreshBtn.addEventListener('click', function () { location.reload() })
}