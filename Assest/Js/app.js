import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    db,
    deleteDoc,
    doc
} from './firebase.js'

let textarea = document.getElementById('text')
let textCollection = collection(db, "text");



let saveBtn = document.querySelector('.save')
let copyBtn = document.querySelector('.copy')
let clearBtn = document.querySelector('.clear')


const setDataFunc = async() => {
    let text4Set = textarea.value.trim();
    if(text4Set.length > 0){

    saveBtn.innerHTML = 'Saving...'
    try {
        const docRef = await addDoc(textCollection, {
          text: text4Set
        });
    saveBtn.innerHTML = 'Save'
    saveBtn.style.color = '#ccc'
    saveBtn.style.borderColor = '#ccc'
    clearBtn.setAttribute('id', docRef.id)

    getTextFunc()
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }else{
        Swal.fire("TextArea's Value is Empty?");
    }
}

textarea.addEventListener('input', () => {
    saveBtn.style.color = '#364bcd'
    saveBtn.style.borderColor = '#364bcd'
})

saveBtn.addEventListener('click', () => {
    setDataFunc()
})
const getTextFunc = async() => {
    const querySnapshot = await getDocs(textCollection);
    querySnapshot.forEach((doc) => {
        textarea.value = doc.data().text
        saveBtn.style.display = 'none'
        clearBtn.style.display = 'block'
        copyBtn.style.display = 'block'
        clearBtn.style.color = '#364bcd'
        clearBtn.style.borderColor = '#364bcd'
    });
}
getTextFunc()
clearBtn.addEventListener('click', async(e) => {

    // Correct document reference
    let id = e.target.id;
    let docRef = doc(db, 'text', id);

    try {
        await deleteDoc(docRef);
        e.target.innerHTML = 'Clearing'
        e.target.classList.add('grey')
        setTimeout(() =>{
            e.target.innerHTML = 'Clear'
            e.target.classList.remove('grey')
        location.reload()
        }, 1200)
    } catch (error) {
        console.error("Error removing document: ", error);
    }

});



getTextFunc()

window.onload = ()=> {
    getTextFunc()
}

copyBtn.addEventListener('click', () => {
    let textToCopy = textarea.value.trim(); // Textarea ka text trim kar ke le lo
    if (textToCopy.length > 0) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyBtn.innerHTML = 'Copied'
            copyBtn.classList.add('grey')
            setTimeout(() => {
            copyBtn.innerHTML = 'Copy'
            copyBtn.classList.remove('grey')
            }, 1500)
        }).catch(err => {
            console.error("Failed to copy text to clipboard: ", err);
        });
    } else {
        alert("Textarea is empty!");
    }
});


document.querySelector('.files_div').addEventListener('click', () => {
    Swal.fire('COMING SOON! (Files Area)')
})