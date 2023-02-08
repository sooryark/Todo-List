//get html elements
const inputValue = document.getElementById("task");
const ulElelement = document.getElementById("addingtask");
const addbtn = document.getElementById("addbtn");
const displayEl = document.getElementById("display-task");
const imgContainer = document.getElementById("imgEl");
const totalTask =  document.getElementById("total-task");

 stroringArr = [];
 inputValue.focus();

//add function
function addtask(){
   const userInput = inputValue.value;//getting user input
   
   if(userInput == ""){
    return alert("please Enter your Task");// alert users to enter a tasks
   }
   if(userInput.trim() == ""){//remove empty space
    return;
   }

   //console.log(userInput);
   inputValue.value = "";//empty the input ui
      taskId = Math.random().toString();//getting random id


   const taskObj = {};             //obj for storing value,state,id
   taskObj.value = userInput;
   taskObj.isCompleted = false;
   taskObj.id = taskId;
   console.log(taskId)
   stroringArr.push(taskObj); //pushing taskObj to StoringArr
   
   setTask();
   createTask(userInput,false,taskId);
   newUI();  
}

//createting li element
function createTask(userInput,isCompleted,taskId){
  
    const liElement = document.createElement("li");

    liElement.setAttribute("id",taskId);

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


//working on compltebtn
function completed(){
    this.parentElement.classList.toggle("active");
    const taskId = this.parentElement.getAttribute("id");
    console.log (taskId)
    for(let i=0;i<stroringArr.length;i++){
        const taskObj = stroringArr[i];
        //console.log(taskObj)
        if(taskObj.id == taskId){
           taskObj.isCompleted = !taskObj.isCompleted;
            console.log(!taskObj.isState)
        }
    }
    setTask();
}

//working on delete btn
function remove(){
    const delText = this.parentElement.getAttribute("id");
    for(let i=0;i<stroringArr.length;i++){
        if(stroringArr[i].id == delText){
           stroringArr.splice(i,1);
        }
    }
    setTask();
    this.parentElement.remove();
    newUI()
      
}


//set tasks in localstorage
function setTask(){
    const storeEl = localStorage.setItem("tasks",JSON.stringify(stroringArr));
}


//get tasks from local storage
function getTask(){
   const gettingValue = JSON.parse(localStorage.getItem("tasks"));
   if(!gettingValue){
    return;
   }
   //console.log(gettingValue);
   for(index in gettingValue){
       createTask(gettingValue[index].value,gettingValue[index].isCompleted,gettingValue[index].id);
       stroringArr.push(gettingValue[index]);
   }
 
}
getTask();

//displaying total task Items
function newUI(){
        totalTask.innerHTML= `No of Total-task : <span>${ulElelement.children.length}</span>`;
    //console.log(displayEl.children);
}
newUI()

//add task using enter key 
function handlekey(event){
    if(event.key == "Enter"){
        addtask();
    }
}

//events
addbtn.addEventListener("click",addtask);
inputValue.addEventListener("keypress",handlekey);