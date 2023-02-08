//get html elements
const inputValue = document.getElementById("task");
const ulElelement = document.getElementById("addingtask");
const addbtn = document.getElementById("addbtn");
const displayEl = document.getElementById("display-task");
const imgContainer = document.getElementById("imgEl");
const totalTask =  document.getElementById("total-task");
 stroringArr = [];

//add function
function addtask(){
   const userInput = inputValue.value;//getting user input
    
   if(userInput == ""){
    return alert("please Enter your Task");// alert users to enter a tasks
   }
   if(userInput.trim() == ""){
    return;
   }

   //console.log(userInput);
   inputValue.value = "";//empty the input ui
      

   const taskObj = {};
   taskObj.value = userInput;
   taskObj.isCompleted = false;
   stroringArr.push(taskObj);



   
   setTask();
   createTask(userInput,false);
   newUI();

   
}


function createTask(userInput,isCompleted){
    //createting li element
    const liElement = document.createElement("li");
     if(isCompleted){
        liElement.setAttribute("class","task-items active");
     }else{
        liElement.setAttribute("class","task-items");
     }
   
    liElement.innerText = userInput;
       

    //creating completedbtn
    const completedBtn = document.createElement("button");
    completedBtn.setAttribute("class","completed");
    completedBtn.innerHTML = `<i class="fa-sharp fa-solid fa-circle-check"></i>`;
   completedBtn.addEventListener("click",completed);
        

    //creating deletebtn
    const deletedBtn = document.createElement("button");
    deletedBtn.setAttribute("class","remove");
    deletedBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deletedBtn.addEventListener("click",remove);

    //append the elements
    liElement.append(completedBtn);
    liElement.append(deletedBtn);
    ulElelement.append(liElement);

}
function completed(){
    this.parentElement.classList.toggle("active");
    const taskText = this.parentElement.innerText;
          console.log(taskText)
    for(let i=0;i<stroringArr.length;i++){
        const taskObj = stroringArr[i];
        console.log(taskObj)
        if(taskObj.value == taskText){
           taskObj.isCompleted = !taskObj.isCompleted;
            console.log(!taskObj.isState)
        }
    }
    setTask();
}

function remove(){
    const delText = this.parentElement.innerText;
    for(let i=0;i<stroringArr.length;i++){
        if(stroringArr[i].value == delText){
           stroringArr.splice(i,1);
        }
    }
    setTask();
    this.parentElement.remove();
    newUI()
      
}




function setTask(){
    const storeEl = localStorage.setItem("tasks",JSON.stringify(stroringArr));
}
function getTask(){
   const gettingValue = JSON.parse(localStorage.getItem("tasks"));
   if(!gettingValue){
    return;
   }
   //console.log(gettingValue);
   for(index in gettingValue){
       createTask(gettingValue[index].value,gettingValue[index].isCompleted);
       stroringArr.push(gettingValue[index]);
   }

}
getTask();

function newUI(){
        totalTask.innerHTML= `No of Total-task ${ulElelement.children.length}`;
    //console.log(displayEl.children);
}

newUI();




function handlekey(event){
    if(event.key == "Enter"){
        addtask();
    }
}

//events
addbtn.addEventListener("click",addtask);
inputValue.addEventListener("keypress",handlekey);