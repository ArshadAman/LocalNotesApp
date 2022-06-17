//User Realted Code
let userArr = [];
let btn = document.getElementById('login').addEventListener('click', function(e){
    let username = document.getElementById('username').value;
    let user = localStorage.getItem('USERS');

    if(user == null){
        userArr = [];
    }
    else{
        userArr = JSON.parse(user);
    }
    if(!userArr.includes(username)){
        let create = confirm("User not exists, Do you want to create new user: ");
        if(create){
            userArr.push(username);
            localStorage.setItem("USERS", JSON.stringify(userArr));
        }
    }
    else{
        sessionStorage.setItem('current-user', username);
        location.href = 'notes.html';
    }
})