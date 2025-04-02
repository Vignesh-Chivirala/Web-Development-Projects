console.log("Welcome To Listen")
let songIndex=0;
let audioElement= new Audio("songs/1.mp3");
let play=document.getElementById('play');
let next=document.getElementById('next');
let back=document.getElementById('back');
let progressbar=document.getElementById('length');
let songItem=Array.from(document.getElementsByClassName('songItem'));
let bottomsong=document.getElementById('bottom-name');


let songs = [
    {songName: "Premalo", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Badulu Thochani", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Guruvaram", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Oh Priya Priya", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Sweety", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Mari Antaga", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
]

songItem.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})

const makeplays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeplays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        bottomsong.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    })
})




audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressbar.value=progress;
})

progressbar.addEventListener('change',()=>{
    audioElement.currentTime=progressbar.value*audioElement.duration/100;
})

play.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    }else{
        audioElement.pause();
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    }
})

back.addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }else{
        songIndex-=1;
    }

    audioElement.src=`songs/${songIndex+1}.mp3`;
    bottomsong.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
})

next.addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }else{
        songIndex+=1;
    }
    
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    bottomsong.innerText=songs[songIndex].songName;
    audioElement.play();
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
})