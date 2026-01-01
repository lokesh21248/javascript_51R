const textPara =
"Typing fast and accurately is an important skill for programmers students and professionals. Practice daily to improve speed focus and confidence while typing.";

const textDiv = document.getElementById("text");
const input = document.getElementById("inp");
const timer = document.querySelector(".timer");
const startBtn = document.getElementById("start");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("acc");
const bar = document.getElementById("bar");

let time = 120;
let interval;
let charIndex = 0;
let correct = 0;
let totalTyped = 0;

function loadText(){
    textDiv.innerHTML = "";
    textPara.split("").forEach((ch,i)=>{
        let span = document.createElement("span");
        span.innerText = ch;
        if(i === 0) span.classList.add("active");
        textDiv.appendChild(span);
    });
}

function startTimer(){
    interval = setInterval(()=>{
        time--;
        let min = Math.floor(time/60);
        let sec = time % 60;
        timer.innerText = `${min}:${sec<10?"0"+sec:sec}`;
        bar.style.width = ((120-time)/120)*100 + "%";

        if(time === 0){
            clearInterval(interval);
            input.disabled = true;
        }
    },1000);
}

input.addEventListener("keydown",(e)=>{
    const chars = textDiv.querySelectorAll("span");
    if(time <= 0) return;

    if(e.key === "Backspace"){
        if(charIndex > 0){
            charIndex--;
            chars[charIndex].classList.remove("correct","wrong");
            chars.forEach(s=>s.classList.remove("active"));
            chars[charIndex].classList.add("active");
            totalTyped--;
        }
        e.preventDefault();
        return;
    }

    if(e.key.length !== 1) return;

    const typedChar = e.key;
    const currentChar = textPara[charIndex];
    totalTyped++;

    if(typedChar === currentChar){
        chars[charIndex].classList.add("correct");
        correct++;
    }else{
        chars[charIndex].classList.add("wrong");
    }

    chars[charIndex].classList.remove("active");
    charIndex++;
    if(chars[charIndex]) chars[charIndex].classList.add("active");

    let minutes = (120-time)/60;
    let wpm = Math.round((correct/5)/minutes);
    wpmEl.innerText = wpm || 0;

    let accuracy = Math.round((correct/totalTyped)*100);
    accEl.innerText = accuracy + "%";
});

startBtn.addEventListener("click",()=>{
    loadText();
    input.value="";
    input.disabled=false;
    input.focus();
    time=120;
    charIndex=0;
    correct=0;
    totalTyped=0;
    wpmEl.innerText=0;
    accEl.innerText="0%";
    bar.style.width="0%";
    clearInterval(interval);
    startTimer();
});
