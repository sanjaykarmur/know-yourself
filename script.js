let index=0
let selected=null

const score={
I:0,E:0,
S:0,N:0,
T:0,F:0,
J:0,P:0
}

const qEl=document.getElementById("question")
const optEl=document.getElementById("options")
const next=document.getElementById("next")
const bar=document.getElementById("bar")

function load(){

const q=questions[index]

qEl.textContent=q.q
optEl.innerHTML=""
selected=null

q.options.forEach(o=>{

const div=document.createElement("div")
div.className="option"
div.textContent=o.t

div.onclick=()=>{
document.querySelectorAll(".option")
.forEach(x=>x.classList.remove("selected"))

div.classList.add("selected")
selected=o.type
}

optEl.appendChild(div)

})

bar.style.width=(index/questions.length*100)+"%"

}

next.onclick=()=>{

if(!selected)return

score[selected]++
index++

if(index<questions.length){
load()
}
else{
finish()
}

}

function finish(){

document.getElementById("quiz").classList.add("hidden")
document.getElementById("result").classList.remove("hidden")

const type=
(score.I>score.E?"I":"E")+
(score.S>score.N?"S":"N")+
(score.T>score.F?"T":"F")+
(score.J>score.P?"J":"P")

const desc={
INTJ:"Strategic thinker who enjoys solving complex problems.",
ENTP:"Curious innovator who loves exploring new ideas.",
INFJ:"Insightful and empathetic guide for others.",
ENFP:"Energetic creative who inspires people.",
ISTJ:"Reliable organizer who values responsibility.",
ISFP:"Quiet creator who appreciates beauty and art.",
ESTP:"Bold action taker who thrives on excitement.",
ESFJ:"Supportive personality who enjoys helping others."
}

document.getElementById("type").textContent=type
document.getElementById("desc").textContent=
desc[type] || "Balanced personality with traits from many types."

}

load()
