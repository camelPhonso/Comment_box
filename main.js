//global variables
const mailingList = {};
let forum = document.getElementById('forum');
let comment = document.getElementById('comment_entry');
let log_button = document.getElementById('log_button');
let comment_button = document.getElementById('enter');
let detail_fields = document.getElementsByClassName('user_details');
let userName;

//call for login() at the start
log_button.addEventListener('click', login);
comment.disabled = true;
comment_button.disabled = true;

//live counter on display & warning of maximum triggered by keydown event in #comment_entry
function liveCount(obj) {
    document.getElementById('counter').innerHTML = `${obj.value.length}/140`;

    if (obj.value.length >= 140){
        comment.style.color = 'red';
    }
};

//create a user and login
function login(){
    if(document.getElementById('name_entry').value === ''){
        //stop users from commenting without a userName
        document.getElementById('name_entry').style.border = '2px solid red';
    }else{
        //reset borders
        document.getElementById('name_entry').style.border = 'none';
        //establish userName for future use
        userName = document.getElementById('name_entry').value;
        //restyle fields and disable editing of userName
        log_button.innerText = 'Log Out';
        comment.disabled = false;
        comment.style.backgroundColor = 'var(--highlights)';
        comment.placeholder = 'Enter your comment';
        comment_button.disabled = false;

        for (i of detail_fields){
            i.disabled = true;
            i.style.backgroundColor = 'grey';
        };
    
        //replace eventListener to trigger logout()
        log_button.removeEventListener('click',login);
        log_button.addEventListener('click',logout);

        //add eventlistener to allow for a comment to be submitted by pressing 'Enter'
        comment.addEventListener('keydown', (e) => {if(e.keyCode === 13){fetch()}});
    };
};

function logout(){
    //clear all inputs
    let inputs = document.querySelectorAll('.input');
    inputs.forEach(input => input.value = '');
    log_button.innerText = 'Log In';
    comment.disabled = true;

    //reset comment_button and comment box
    comment_button.disabled = true;
    comment.style.backgroundColor = 'grey';

    //replace eventListener to trigger login()
    log_button.removeEventListener('click',logout);
    log_button.addEventListener('click',login);

    //enable userName editing
    for (i of detail_fields){
        i.disabled = true;
        i.style.backgroundColor = 'var(--highlights';
    };
}


//fetch entered data and append to forum when submitted
function fetch(){
    let np = document.createElement('p');
    np.classList.add('user_name');
    let nc = document.createTextNode(`${userName}:`);
    let cp = document.createElement('p');
    cp.classList.add('user_comment');
    let cc = document.createTextNode(document.getElementById('comment_entry').value);
    forum.appendChild(np);
    np.appendChild(nc);
    forum.appendChild(cp);
    cp.appendChild(cc);
    
    //create a mailing list
    // let address = document.getElementById('email_entry').value;
    // if(address != ''){
    //     mailingList[userName] = {
    //         'email address': address;
    //     };
    // };
    
    
    //clear comment_entry with each submit
   comment.value = '';
};