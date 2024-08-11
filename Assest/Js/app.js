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
    if(navigator.onLine){
    setDataFunc()
    }else{
        Swal.fire('Network Problem!')
    }
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
   if(navigator.onLine){
    let id = e.target.id;  // The document ID should be here
    if (id) {
        // Create the correct document reference
        let docRef = doc(db, 'text', id);

        console.log("Attempting to delete document with ID:", id);

        try {
            await deleteDoc(docRef);  // Delete the document
            console.log("Document deleted:", id);
            e.target.innerHTML = 'Clearing';
            e.target.classList.add('grey');
            setTimeout(() => {
                e.target.innerHTML = 'Clear';
                e.target.classList.remove('grey');
                location.reload();
                clearBtn.style.display = 'none'
                copyBtn.style.display = 'none'
                saveBtn.style.display = 'block'
            }, 1200);
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    } else {
        console.error("No document ID found for deletion.");
    }
   }else{
    Swal.fire('Network Problem!') 
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