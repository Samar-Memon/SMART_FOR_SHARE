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
let saveBtn = document.querySelector('.save');
let clearBtn = document.querySelector('.clear');

saveBtn.addEventListener('click', async() => {
if(sessionStorage.getItem('Sent_KEY')){

  let valueOFtextarea = textarea.value.trim();

  if(valueOFtextarea.length > 0){
      saveBtn.innerHTML = 'Saving...'
      try {
          const docRef = await addDoc(sentCollection, {
            res_id: sessionStorage.getItem('Sent_KEY'),
            content: valueOFtextarea
          });
          saveBtn.style.display = 'none'
          clearBtn.style.display = 'block'
          saveBtn.innerHTML = 'Save'
          clearBtn.setAttribute('id', docRef.id)
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
  }else{
      Swal.fire("TextArea's Value is Empty?")
  }

}else{
  Swal.fire("Please Set the Key")
}
})

const  getText = async() => {
  const querySnapshot = await getDocs(sentCollection);
querySnapshot.forEach((doc) => {
  textarea.value = doc.data().content
  saveBtn.style.display = 'none'
  clearBtn.style.display = 'block'
  clearBtn.setAttribute('id', doc.id)
});
}
getText()


clearBtn.addEventListener('click', async(e) => {
  e.target.innerHTML = 'Clearing...'
  let docRef = doc(db, 'sent', e.target.id);
  try{
    await deleteDoc(docRef);
  e.target.innerHTML = 'Clear'
    console.log('hogaya');
    location.reload()
  }catch(err){
    console.log(err);
    
  }
})

