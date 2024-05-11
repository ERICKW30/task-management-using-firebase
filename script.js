firebase.initializeApp({
  apiKey: "AIzaSyB3CJCQrJfGoJAsGoXeim6Spwm_3zkKPd8",

  authDomain: "plp-web-development-c7ae7.firebaseapp.com",

  projectId: "plp-web-development-c7ae7",

  storageBucket: "plp-web-development-c7ae7.appspot.com",

  messagingSenderId: "461966549824",

  appId: "1:461966549824:web:746866e2b1bb62da23d0a5"

});

const db = firebase.firestore();

function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
          task: task,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        taskInput.value = "";
        console.log("Task added.");
    }
};

// Function to render tasks

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${doc.data().task}</span>
      <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  }

//Listener on the database

db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === "added") {
            renderTasks(change.doc);
      }
    });
  });

function deleteTask(id){
    db.collection("tasks").doc(id).delete();
}

