
let url = "https://opentdb.com/api.php?amount=1";
// let falseAnswer = 0;
// let trueAnswer = 0;
let allAns;
let userChoice;
let oldChoice;
//console.log(selectAnswer);

document.addEventListener('DOMContentLoaded', function () {
    addQuestion();
    eventListeners();

});



function addQuestion() {
    fetch(url)
        .then((response) => response.json())
        .then(data => allQuestion(data.results))
        .catch(function(err) {
            addQuestion();
          
          });
}

function allQuestion(questions) {
    if(localStorage.getItem('trueAnswer') == null) localStorage.setItem('trueAnswer', 0);
    if(localStorage.getItem('falseAnswer') == null) localStorage.setItem('falseAnswer', 0);

    let enTete = document.getElementById('cout');
    //console.log(enTete);
    questions.forEach(question => {
        allAns = question.correct_answer;
        let reposePossible = question.incorrect_answers;
        let debut = '';
        let  fin ='';
        if(reposePossible[2] == undefined){
            debut = '<!--';
            fin = '-->'
            //console.log('sa marche');
        }
        reposePossible.splice(Math.floor(Math.random() * 3), 0, allAns);
        
            enTete.innerHTML = `
            <div class="col s6 m6 pt-1">
                <p class="mx-4" >Categrory : <span id="dificulé">${question.category}</span></p>
            </div>
            <div class="col s6 m6 flex py-1">
                <p id="reuisi" class=" bg-success mx-1 text-white p-1">${localStorage.getItem('trueAnswer')}</p>
                <p id="echec" class="bg-danger mx-1 text-white p-1">${localStorage.getItem('falseAnswer')}</p>
            </div>
            <div class="row text-center">
                <h3 id="question" class="py-2">${question.question}</h3>
            </div>
        `;
  
        const divQuestion = document.getElementById('allResponse');
        divQuestion.innerHTML = `
            <div class="row text-center">
                <div class="col-6  py-2">
                    <p class="btn-jaune" >${reposePossible[0]}</p>
                </div>
                <div class="col-6  py-2">
                    <p  class="btn-jaune " >${reposePossible[1]}</p>
                </div>
            </div>
            
            ${debut}<div class="row text-center">
                <div class="col-6  py-2">
                    <p class="btn-jaune" >${reposePossible[2]}</p>
                </div>
                <div class="col-6 py-2">
                    <p class="btn-jaune" >${reposePossible[3]}</p>
                </div>
            </div> ${fin}
            
        `;
        
    });



    document.querySelectorAll('.btn-jaune').forEach(btn => {
        btn.addEventListener('click', ()=> {
            if(oldChoice != undefined){
                if(oldChoice.textContent != btn.textContent){
                    oldChoice.style.background = '#ffc107';
                    oldChoice = btn;
                } 
            } else {
                oldChoice = btn;
            }
            btn.style.background ='#198754';
            userChoice = btn.textContent;
        });
    });
    //console.log(allAns);
};




function eventListeners(){
    
    document.getElementById('check').addEventListener('click', ()=> {
        if(userChoice != undefined){
            if(allAns == userChoice){
                let trueAnswer = parseInt(localStorage.getItem('trueAnswer')) + 1;
                localStorage.setItem('trueAnswer', trueAnswer);
            } else {
                let falseAnswer = parseInt(localStorage.getItem('falseAnswer')) + 1;
                localStorage.setItem('falseAnswer', falseAnswer);
            }
            addQuestion();
        }
    });
    
    document.getElementById('suprimer').addEventListener('click', ()=>{
        localStorage.clear();
       location.reload()
    });

}
