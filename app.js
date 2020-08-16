var list= document.getElementById("list");
 

//getdata from firebase:
firebase.database().ref('todos').on('child_added',function(data){
    // create li
    var li = document.createElement('ol')
    li.setAttribute("class"," shadow-lg  border border-dark  bg-light mt-1 pt-1 mb-1 pb-1")
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText) 

    // create delete button
    var delBtn = document.createElement("button")
    var delText= document.createTextNode("Delete")
    delBtn.setAttribute("class","gul btn btn-secondary btn-sm")
    delBtn.setAttribute('id',data.val().key)
    delBtn.setAttribute("onclick","deleteItem(this)")
    delBtn.appendChild(delText)

    //create edit button
    var editBtn = document.createElement("button")
    var editText= document.createTextNode("Edit")
    editBtn.setAttribute("class","gul btn btn-secondary btn-sm")
    editBtn.appendChild(editText)
    editBtn.setAttribute('id',data.val().key)
    editBtn.setAttribute("onclick","editItem(this)")
    


    li.appendChild(delBtn)
    li.appendChild(editBtn)


    list.appendChild(li)
    console.log(data.val())
})

// sent data to firebase:
function addTodo(){
    var todo_item=document.getElementById("todo-item");
   
    //firebase:
    var database = firebase.database().ref('todos');
    var key = database.push().key;
    //object:
    var todo = {
        value: todo_item.value,
        key: key
    }

    database.child(key).set(todo)

    todo_item.value=""
}

function deleteItem(e){
    firebase.database().ref('todos').child(e.id).remove()

    e.parentNode.remove()

}
function editItem(e){
    
    var editValue = prompt("Enter edit value",e.parentNode.firstChild.nodeValue)
    var editTodo = {
        value: editValue,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = editValue;

}

function deleteAll(){
    firebase.database().ref('todos').remove()
    list.innerHTML = ""
}
