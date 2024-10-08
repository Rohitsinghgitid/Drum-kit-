//to do 1 selectall the elemnts and add event listener
//add animation whena button is clicked
//play music
var audio__volume = 0.6;
var image_url;
const api_call=()=>{
    const URL="https://api.unsplash.com/photos/random?query=drum"
    fetch( URL,{
        headers:{
            'Authorization': 'Client-ID fwAlBcsMTvQh7M05la5SDTgQJa2NJAQS9ixevwphdyc'
        }
    }).then(res=>res.json())
    .then(res=>{
        image_url = res.urls.small
        change_background(image_url)
})
    .catch(error=>console.log(error))
}
api_call()
const change_background=(image_src)=>{
    let container_style=document.getElementsByClassName('container')[0].style


    
    let bg_color=getComputedStyle(document.documentElement).getPropertyValue("--background_low")
    container_style.background=`linear gradient(300deg,${bg_color},${bg_color}),url(${image_src})`
    container_style.background='cover'
    container_style.background='center'


}


const animate =(key)=>{
    const currentKey=document.querySelector(`.${key}`)
    currentKey.classList.add('pressed')
    setTimeout(()=>{
        currentKey.classList.remove('pressed')
    },250)
}

const playMusic=(path)=>{
    const audio= new Audio(path)
    audio.volume=audio__volume;
    audio.play();
}
document.addEventListener("keypress",(event)=>{
    const triggeredkey=event.key;
    makeSound(triggeredkey)
    animate(triggeredkey)
})

//theme 1
const theme_1_background="#232328";
const theme_1_background_low="rgba(9,25,33,0.8)";
const theme_1_text="#fefefe";

//theme 2
const theme_2_background="#f7c340";
const theme_2_background_low="rgba(247,195,64,0.85)";
const theme_2_text="#2d2d2d";
const change_theme=(theme)=>{
    let root=document.documentElement
    if(theme==="theme_1"){
        root.style.setProperty('--background',theme_1_background)
        root.style.setProperty('--background_low',theme_1_background_low)

        root.style.setProperty('--text',theme_1_text)
    }
    else{
        root.style.setProperty('--background_low',theme_2_background_low)
        root.style.setProperty('--background',theme_2_background)
        root.style.setProperty('--text',theme_2_text)
    }
    
}

var current_theme="theme_1"
const theme_changer=document.getElementById("util__button-theme")
theme_changer.addEventListener("click",(e)=>{
    if(current_theme=="theme_1"){
        change_theme("theme_2")
        current_theme="theme_2"

    }
    else{
        change_theme("theme_1")
        current_theme="theme_1"  
    }
})


var auto_music_id;
var auto_music_on=false;
const start_auto_music=()=>{
    const letters=["w","a","s","d","j","k","l"]
    auto_music_id=setInterval(()=>{
    const current_Key=letters[Math.floor(Math.random()*letters.length)]
    makeSound(current_Key)
    animate(current_Key)
    },200)  
}
const auto_music_button=document.getElementById("util__button-auto")
auto_music_button.addEventListener("click",()=>{
    if(auto_music_on){
        clearInterval(auto_music_id)
        auto_music_on=false
        auto_music_button.innerText="start auto music"}
    else{
        start_auto_music()
        auto_music_on=true
        auto_music_button.innerText="stop auto music"
    }
})

const slider = document.getElementById("volume__slider")
slider.oninput = (event) => {
    audio__volume = event.target.value / 100
}
const makeSound=(key)=>{
    switch(key){
        case"w":
        playMusic("sounds/sound1.wav");
        break;
        case"a":
        playMusic("sounds/sound2.wav");
            break;
            case"s":
        playMusic("sounds/sound3.wav");
            break;
            case"d":
        playMusic("sounds/sound4.wav");
            break;
            case"j":
        playMusic("sounds/sound5.wav");
            break;
            case"k":
        playMusic("sounds/sound6.wav");
            break;
            case"l":
        playMusic("sounds/sound7.wav");
            break;
        default:
            console.log("hey wrong button");
            

            

    }



}
const handleDrumClick=(event)=>{
    var innerHTML=event.target.innerHTML;
    console.log(innerHTML);
    animate(innerHTML)
    makeSound(innerHTML)
}

var drums=document.querySelectorAll(".drum")
for(let i =0;i<drums.length;i++){
    drums[i].addEventListener("click",handleDrumClick)
}
const bg_changer=document.getElementById("util__button-background")
bg_changer.addEventListener("click",()=>{
    api_call()
})