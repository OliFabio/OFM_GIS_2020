window.onload = function() {
    //variables
    var form = document.getElementById("form-website");
    var input = document.getElementById("input-todo-website");
    var btn = document.getElementById("btn-add");
    var list = document.getElementById("list-todo-website");    
    var btnClr = document.getElementById("btn-clear-website");    
    var id = 1;
    // listItem = {item: "todo item", checked: flase}
    var liItem = "";
    var todoList = [];
    //button event listener
    btn.addEventListener("click", addTodoItem);
    //list event listener
    list.addEventListener("click", boxChecked);
    //event listener for clear list
    btnClr.addEventListener("click", clearList);
    if(localStorage.length <= 0) {
        btnClr.style.display = "none";
    }
    //checking localstorage has data
    if(localStorage.length > 0) {
        displayList();
    }
    //add todo item to list
    function addTodoItem() {
        if(input.value === "") {
            alert("Du musst eine Aufgabe hinzufügen!");
        }
        else {
            if(list.style.borderTop === "") {
                list.style.borderTop = "2px solid white";
                btnClr.style.display = "inline";
            }
            var text = input.value;    
            var item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;                
            list.insertAdjacentHTML("beforeend", item);    
            liItem = {item: text, checked: false};
            todoList.push(liItem);        
            id++;
            addToLocalStorage()
            form.reset();
        }
    }
    //adding string through style to list itme
    function boxChecked(event) {
        const element = event.target;
        if(element.type === "checkbox") {
            element.parentNode.style.textDecoration = "line-through";
            todoList = JSON.parse(localStorage.getItem("todoList"));
            todoList[element.id.split("-")[1]-1].checked = element.checked.toString();
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
    }
    //adding data to local storage
    function addToLocalStorage() {
        if(typeof(Storage) !== "undefined") {
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
        else {
            alert("Deine Daten können nicht gespeichert werden");
        }
    }
    function displayList() {
        list.style.borderTop = "2px solid white";
        todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList.forEach(function(element) {
            console.log(element.item)
            var text = element.item;
            var item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;
            list.insertAdjacentHTML("beforeend", item);
            
            if(element.checked) {
                var li = document.getElementById("li-"+id);
                li.style.textDecoration = "line-through";
                li.childNodes[1].checked = element.checked;
            }
            id++;
        });
    }
    //event listener Liste - clear - 
    function clearList() {
        todoList = [];
        localStorage.clear();
        list.innerHTML = "";
        btnClr.style.display = "none";
        list.style.borderTop = "";
    }
}