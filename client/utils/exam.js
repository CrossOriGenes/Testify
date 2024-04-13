//selecting all required elements
const sidePanel = document.querySelector('aside');
const progressGraph = document.querySelector(".progress-graph");
const progressPercentText = document.querySelector(".progress-graph span");
const info_box = document.getElementById("launcher");
const exit_btn = document.getElementById("ghost-btn");
const begin_btn = document.getElementById("begin-btn");
const exam_box = document.getElementById("panel");
const result_box = document.getElementById("result");
const option_list = document.querySelector(".options");
const ques_map_list = document.querySelectorAll('.ques-maps li');
const time_line = document.querySelector(".time_line");
const timeText = document.querySelector(".timer strong");
const timeCount = document.querySelector(".timer span");

window.onload = () => {
    info_box.classList.add("activeInfo"); //show info box
}

// if exitexam button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
    window.location.href = "./hero.html";
}

// if continueexam button clicked
begin_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
    exam_box.classList.add("activeExam"); //show exam box
    sidePanel.classList.add("activeSidePanel");  //show side Panel
    showQuestions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let progressPercent = 0;

const next_btn = document.getElementById("nxt-btn");
const nextBtn_text = next_btn.querySelector('strong');
const bottom_ques_counter = document.querySelector(".ques-outline-box h4");
const restart_exam = result_box.querySelector(".buttons .restart");
const quit_exam = result_box.querySelector(".buttons .quit");

// if restartexam button clicked
restart_exam.onclick = () => {
    exam_box.classList.add("activeExam"); //show exam box
    sidePanel.classList.add("activeSidePanel");  //show side Panel
    result_box.classList.remove("activeResult"); //hide result box
    ques_map_list.forEach(dots => dots.classList.remove("active")); //reformats the question map
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    viewProgress(progressPercent);
    showQuestions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    next_btn.classList.remove("show"); //hide the next button
}

// if quitexam button clicked
quit_exam.onclick = () => {
    window.location.reload(); //reload the current window
}

// if Next Que button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuestions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        next_btn.classList.remove("show"); //hide the next button
        if (que_count === questions.length - 1) {
            nextBtn_text.textContent = "See Result";
        }
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        nextBtn_text.textContent = "Next";
        showResult(); //calling showResult function
    }
    viewProgress(progressPercent);
}

// getting questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".questions-box h3");

    //creating a new span and div tag for question and option and passing the value using array index

    let que_tag = `<em>Q${questions[index].numb}.</em> ${questions[index].question}`;
    let option_tag = `
                    <li class="option"><span>${questions[index].options[0]}</span></li>
                    <li class="option"><span>${questions[index].options[1]}</span></li>
                    <li class="option"><span>${questions[index].options[2]}</span></li>
                    <li class="option"><span>${questions[index].options[3]}</span></li>
    `;
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = `<i class="fa-regular fa-circle-check"></i>`;
let crossIconTag = `<i class="fa-regular fa-circle-xmark"></i>`;

//if user clicked on option
function optionSelected(answer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items

    if (userAns == correcAns) { //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
        option_list.children[i].removeAttribute("onclick"); // remove all onclick attributes to disable furthur clicks
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
    info_box.classList.remove("activeInfo"); //hide info box
    exam_box.classList.remove("activeExam"); //hide exam box
    sidePanel.classList.remove("activeSidePanel");  //show side Panel
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score-text");
    if (userScore > 3) { // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number        
        let scoreTag = `<p>and congrats! 🎉, You got <span> ${userScore} </span> out of <span> ${questions.length} </span></p>`;
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if (userScore > 1) { // if user scored more than 1
        let scoreTag = `<p>and nice 😎, You got <span> ${userScore} </span> out of <span> ${questions.length} </span></p>`;
        scoreText.innerHTML = scoreTag;
    }
    else { // if user scored less than 1
        let scoreTag = `<p>and sorry 😐, You got <span> ${userScore} </span> out of <span> ${questions.length} </span></p>`;
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if (time < 9) { //if timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time < 0) { //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
                option_list.children[i].removeAttribute("onclick"); // remove all onclick attributes to disable furthur clicks
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 21);
    function timer() {
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if (time > 783) { //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index) {
    //creating a new span tag and passing the question number and total question    
    let totalQueCounTag = `<span>${index} / ${questions.length}</span> Questions`;
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
    ques_map_list[index - 1].classList.add("active"); //set the current question being answered in the question dots to active
}

function viewProgress(progPercent) {
    //checking the progress percent value to 100% or not
    if (progPercent < 100) { //if less than 100 increment it by 10 percent until last question
        progressPercent += 10;
        progressPercentText.textContent = `${progressPercent}%`; //show the updated progress percentage text
        progressGraph.style.background = `conic-gradient(
            #a7004d ${progressPercent * 3.6}deg ,
            #f4b3ec ${progressPercent * 3.6}deg
        )`; //show the progress ring background increment
    } else {
        //reset the entire progress bar when completed 
        progressPercent = 0;
        progressGraph.style.background = ``; 
        progressPercentText.textContent = `${progressPercent}%`;
    }

}