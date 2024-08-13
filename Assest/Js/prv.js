import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    db
} from './firebase.js';

let sent_box = document.querySelector('.sent_box')
let recieve_box = document.querySelector('.recieve_box')

let sentBtn = document.getElementById('sentBtn')
let recieveBtn = document.getElementById('recieveBtn')

let buttonsArea = document.querySelector('.buttons')

sentBtn.addEventListener('click', () => {
    sent_box.style.display = 'flex'
    buttonsArea.style.display = 'none'
})
recieveBtn.addEventListener('click', (e) => {
    recieve_box.style.display = 'flex'
    buttonsArea.style.display = 'none'
})

sent_box.querySelector('i').addEventListener('click', () => {
    sent_box.style.display = 'none'
    buttonsArea.style.display = 'flex'
})
recieve_box.querySelector('i').addEventListener('click', () => {
    recieve_box.style.display = 'none'
    buttonsArea.style.display = 'flex'
})


let sentKey = document.getElementById('sentKey')
let recieveKey = document.getElementById('recieveKey')

sentKey.addEventListener('click', () => {
    let sent_key_value = sent_box.querySelector('input').value.trim()
    if(sent_key_value.length > 4){
        sessionStorage.setItem('Sent_KEY', sent_key_value)
        if(sent_key_value){
            location.replace('./sent.html')
        }
    }else{
        Swal.fire("Sent Key's length (Minimum 5 characters)")
    }
})

recieveKey.addEventListener('click', async() => {
    let recieve_key_value = recieve_box.querySelector('input').value.trim()
    console.log(recieve_key_value);
        const querySnapshot = await getDocs(collection(db, 'sent'));
      querySnapshot.forEach((doc) => {
        if(recieve_key_value == doc.data().res_id){
            location.replace('./recieve.html')
            sessionStorage.setItem('Recieve_KEY', doc.data().res_id)
        }else{
        Swal.fire('Key Not Match') 
        }
      });

})