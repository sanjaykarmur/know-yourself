let index = 0

let score = {
I:0,
E:0,
S:0,
N:0,
T:0,
F:0,
J:0,
P:0
}

const questionEl = document.getElementById("question")
const answersEl = document.getElementById("answers")
const nextBtn = document.getElementById("nextBtn")
const progressBar = document.getElementById("progressBar")

let selected = null

function loadQuestion(){

const q = questions[index]

questionEl.textContent = q.q
answersEl.innerHTML = ""

const aBtn = document.createElement("button")
aBtn.textContent = "Option A"
aBtn.onclick = ()=> select(q.a)

const bBtn = document.createElement("button")
bBtn.textContent = "Option B"
bBtn.onclick = ()=> select(q.b)

answersEl.appendChild(aBtn)
answersEl.appendChild(bBtn)

progressBar.style.width = (index/questions.length*100)+"%"

}

function select(type){
selected = type
}

nextBtn.onclick = ()=>{

if(!selected) return

score[selected]++

index++
selected=null

if(index<questions.length){
loadQuestion()
}else{
showResult()
}

}

function showResult(){

document.getElementById("quiz").style.display="none"
document.getElementById("result").classList.remove("hidden")

let type =
(score.I>score.E?"I":"E")+
(score.S>score.N?"S":"N")+
(score.T>score.F?"T":"F")+
(score.J>score.P?"J":"P")

document.getElementById("type").textContent = type

const descriptions={
INTJ:"Strategic mastermind who loves solving complex problems.",
ENTP:"Creative innovator who enjoys debating ideas.",
INFJ:"Insightful guide focused on helping others.",
ENFP:"Energetic explorer full of ideas.",
ISTJ:"Responsible organizer who values reliability.",
ISFP:"Quiet artist who enjoys creativity.",
ESTP:"Bold risk taker who thrives on action.",
ESFJ:"Warm helper who loves supporting people."
}

document.getElementById("description").textContent =
descriptions[type] || "Unique personality with balanced traits."

}

loadQuestion()