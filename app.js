const inputEl = document.getElementById("task");
const taskbtn =  document.getElementById("addbtn");
const displayTask = document.getElementById("display-task");
const addingTaskEl = document.getElementById("addingtask");
const imgEl = document.getElementById("imgEl")
const totalTask = document.getElementById("total-task")
function addingTask(){
    const inputValue = inputEl.value;
    const createTask = document.createElement("li");
    createTask.classList.add("task-items");
    addingTaskEl.append(createTask);
    createTask.innerHTML = inputValue;
    newUI()
}
function newUI(){
    if(addingTaskEl.children.length > 0){
       imgEl.hidden = true;
       totalTask.innerText = `No of Total Task : ${addingTaskEl.children.length}`;
    }else{
        imgEl.hidden = false;
    }
}


taskbtn.addEventListener("click",addingTask);