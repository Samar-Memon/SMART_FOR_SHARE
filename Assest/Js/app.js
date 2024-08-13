import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from './firebase.js';

const db = getFirestore();
const textCollection = collection(db, "text");

let textarea = document.getElementById('text');
let saveBtn = document.querySelector('.save');
let copyBtn = document.querySelector('.copy');
let clearBtn = document.querySelector('.clear');

let currentDocId = null;

const setDataFunc = async () => {
    let text4Set = textarea.value.trim();
    if (text4Set.length > 0) {
        saveBtn.innerHTML = 'Saving...';
        try {
            const docRef = await addDoc(textCollection, { text: text4Set });
            currentDocId = docRef.id;
            saveBtn.innerHTML = 'Save';
            saveBtn.style.color = '#ccc';
            saveBtn.style.borderColor = '#ccc';
            getTextFunc();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        Swal.fire("TextArea's Value is Empty?");
    }
}

const getTextFunc = async () => {
    const querySnapshot = await getDocs(textCollection);
    let latestDoc = null;

    querySnapshot.forEach((doc) => {
        latestDoc = doc;
    });

    if (latestDoc) {
        textarea.value = latestDoc.data().text;
        currentDocId = latestDoc.id;
        saveBtn.style.display = 'none';
        clearBtn.style.display = 'block';
        copyBtn.style.display = 'block';
        clearBtn.style.color = '#364bcd';
        clearBtn.style.borderColor = '#364bcd';
    } else {
        textarea.value = '';
        currentDocId = null;
        saveBtn.style.display = 'block';
        clearBtn.style.display = 'none';
        copyBtn.style.display = 'none';
    }
}

saveBtn.addEventListener('click', () => {
    if (navigator.onLine) {
        setDataFunc();
    } else {
        Swal.fire('Network Problem!');
    }
});

clearBtn.addEventListener('click', async () => {
    if (navigator.onLine) {
        if (currentDocId) {
            let docRef = doc(db, 'text', currentDocId);
            try {
                await deleteDoc(docRef);
                console.log("Document deleted:", currentDocId);
                clearBtn.innerHTML = 'Clearing';
                clearBtn.classList.add('grey');
                setTimeout(() => {
                    clearBtn.innerHTML = 'Clear';
                    clearBtn.classList.remove('grey');
                    getTextFunc();
                }, 1200);
            } catch (error) {
                console.error("Error removing document: ", error);
            }
        } else {
            console.error("No document ID found for deletion.");
        }
    } else {
        Swal.fire('Network Problem!');
    }
});

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
window.onload = () => {
    getTextFunc();
}