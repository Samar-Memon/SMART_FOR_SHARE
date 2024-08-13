import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from './firebase.js';

const db = getFirestore();
let sentCollection = collection(db, 'sent')

let textarea = document.getElementById('text');
let copyBtn = document.querySelector('.copy');


const  getText = async() => {
    const querySnapshot = await getDocs(collection(db, 'sent'));
  querySnapshot.forEach((doc) => {
    if(sessionStorage.getItem('Recieve_KEY') === doc.data().res_id){
        textarea.value = doc.data().content
    }else{
        Swal.fire('Key Not Match')
    }
    
    
  });
  }
  getText()

  copyBtn.addEventListener('click', () => {
    let textToCopy = textarea.value.trim();
    if (textToCopy.length > 0) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyBtn.innerHTML = 'Copied';
            copyBtn.classList.add('grey');
            setTimeout(() => {
                copyBtn.innerHTML = 'Copy';
                copyBtn.classList.remove('grey');
            }, 1500);
        }).catch(err => {
            console.error("Failed to copy text to clipboard: ", err);
        });
    } else {
        alert("Textarea is empty!");
    }
});