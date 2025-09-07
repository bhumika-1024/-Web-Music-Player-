var arr = [
        {songName: "Blue", url:"blue.mp3", img: "song2.jpg"},
        {songName: "Birds", url:"birds.mp3", img: "song1.jpg"},
        {songName: "Espresso", url:"espresso.mp3", img: "song3.png"},
        {songName: "No Lie", url:"nolie.mp3", img: "song4.jpg"},
        {songName: "Watermelon Sugar", url:"watermelonsugar.mp3", img: "watermelon.jpeg"},
        {songName: "Until I Found You", url:"foundyou.mp3", img: "song6.jpg"}
    ]
var allSongs = document.querySelector("#all-songs")
var audio = new Audio();
var selectedSong = 0;
var poster = document.querySelector("#left")
var play = document.querySelector("#play")
var forward = document.querySelector("#forward")
var backward = document.querySelector("#backward")
var flag = 0;

function mainFunction(){
        var clutter = ""
arr.forEach(function(elem, index) {
        clutter = clutter + `<div class="song-card" id=${index}>
        <div class="part1">
        <img src=${elem.img} alt=${elem.songName}>
        <h2>${elem.songName}</h2>
        </div>
        <h6 id="duration-${index}">--:--</h6>
</div>`
});
allSongs.innerHTML= clutter;
audio.src = arr[selectedSong].url;
poster.style.backgroundImage = `url(${arr[selectedSong].img})`
audio.addEventListener("loadedmetadata", function() {
        let mins = Math.floor(audio.duration / 60);
        let secs = Math.floor(audio.duration % 60);
        if (secs < 10) secs = "0" + secs;
        document.getElementById(`duration-${selectedSong}`).innerText = `${mins}:${secs}`;
    });
}

mainFunction();

allSongs.addEventListener("click", function(e){
    let card = e.target.closest(".song-card");
    if (!card) return; 
    selectedSong = parseInt(card.id);
    play.innerHTML = `<i class="ri-pause-fill"></i>`;
    flag = 1;
    mainFunction();
    audio.play();
});


play.addEventListener("click", function(){
    if(flag == 0){
        mainFunction();       
        audio.play();
        play.innerHTML = `<i class="ri-pause-fill"></i>`;
        flag = 1;
    } else {
        audio.pause();
        play.innerHTML = `<i class="ri-play-fill"></i>`;
        flag = 0;
    }
});



forward.addEventListener("click", function(){
    selectedSong = (selectedSong + 1) % arr.length;
    mainFunction();
    audio.play();
});

backward.addEventListener("click", function(){
    selectedSong = (selectedSong - 1 + arr.length) % arr.length;
    mainFunction();
    audio.play();
});

var seek = document.querySelector("#seek");
var currentTimeEl = document.querySelector("#current-time");
var totalTimeEl = document.querySelector("#total-time");

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return `${mins}:${secs}`;
}

audio.addEventListener("timeupdate", function(){
    if(audio.duration){
        seek.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);
    }
});

seek.addEventListener("input", function(){
    if(audio.duration){
        audio.currentTime = (seek.value / 100) * audio.duration;
    }
});

audio.addEventListener("ended", function() {
    selectedSong = (selectedSong + 1) % arr.length; 
    mainFunction();  
    audio.play();    
});
