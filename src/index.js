const api = "http://localhost:3000/students";
const getBtn = document.querySelector("#get-students-btn");
const tableBody = document.querySelector("#students-table tbody");
const form = document.querySelector("#add-student-form");
const modal = document.querySelector("#update-modal");
const modalForm = document.querySelector("#update-student-form");

let currentUpdateId = null;

getBtn.addEventListener("click", getStudents);
form.addEventListener("submit", addStudent);
modalForm.addEventListener("submit", submitUpdateStudent);

async function getStudents() {
  try {
    const response = await fetch(api);
    const students = await response.json();
    renderStudents(students);
  } catch (error) {
    console.log(error);
  }
}

function renderStudents(students) {
  tableBody.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(", ")}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "Записаний" : "Не записаний"}</td>
      <td>
        <button class="update-btn" data-id="${student.id}">Оновити</button>
        <button class="delete-btn" data-id="${student.id}">Видалити</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  document.querySelectorAll(".update-btn").forEach((button) => {
    button.addEventListener("click", () => openUpdateModal(button.dataset.id));
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => deleteStudent(button.dataset.id));
  });
}

async function addStudent(e) {
  e.preventDefault();

  const newStudent = {
    name: document.querySelector("#name").value,
    age: parseInt(document.querySelector("#age").value),
    course: document.querySelector("#course").value,
    skills: document
      .querySelector("#skills")
      .value.split(",")
      .map((skill) => skill.trim()),
    email: document.querySelector("#email").value,
    isEnrolled: document.querySelector("#isEnrolled").checked,
  };

  try {
    await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });
    getStudents();
    e.target.reset();
  } catch (error) {
    console.log(error);
  }
}

function openUpdateModal(id) {
  currentUpdateId = id;

  fetch(`${api}/${id}`)
    .then((response) => response.json())
    .then((student) => {
      modal.style.display = "block";
      modalForm.elements["update-name"].value = student.name;
      modalForm.elements["update-age"].value = student.age;
      modalForm.elements["update-course"].value = student.course;
      modalForm.elements["update-skills"].value = student.skills.join(", ");
      modalForm.elements["update-email"].value = student.email;
      modalForm.elements["update-isEnrolled"].checked = student.isEnrolled;
    });
}

async function submitUpdateStudent(e) {
  e.preventDefault();

  const updatedStudent = {
    name: modalForm.elements["update-name"].value,
    age: parseInt(modalForm.elements["update-age"].value),
    course: modalForm.elements["update-course"].value,
    skills: modalForm.elements["update-skills"].value
      .split(",")
      .map((skill) => skill.trim()),
    email: modalForm.elements["update-email"].value,
    isEnrolled: modalForm.elements["update-isEnrolled"].checked,
  };

  try {
    await fetch(`${api}/${currentUpdateId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    });
    modal.style.display = "none";
    getStudents();
  } catch (error) {
    console.log(error);
  }
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

async function deleteStudent(id) {
  if (!window.confirm("Ви впевнені, що хочете видалити цього студента?"))
    return;

  try {
    await fetch(`${api}/${id}`, { method: "DELETE" });
    getStudents();
  } catch (error) {
    console.log(error);
  }
}
