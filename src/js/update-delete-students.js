import { getStudents, addStudent, updateStudent, deleteStudent } from './get-students.js';
import { renderStudents } from './create-students.js';
import { openUpdateModal } from './update-modal.js';

export function setupEventListeners() {
  document.querySelector('#get-students-btn').addEventListener('click', loadStudents);
  document.querySelector('#add-student-form').addEventListener('submit', addStudentHandler);
}

export async function loadStudents() {
  const students = await getStudents();
  renderStudents(students);
}

async function addStudentHandler(e) {
  e.preventDefault();
  const newStudent = {
    name: e.target.name.value,
    age: parseInt(e.target.age.value),
    course: e.target.course.value,
    skills: e.target.skills.value.split(',').map(s => s.trim()),
    email: e.target.email.value,
    isEnrolled: e.target.isEnrolled.checked
  };
  await addStudent(newStudent);
  e.target.reset();
  loadStudents();
}

export function updateStudentHandler(students) {
  document.querySelectorAll('.update-btn').forEach(button => {
    button.addEventListener('click', () => {
      const student = students.find(s => s.id == button.dataset.id);
      openUpdateModal(student);
    });
  });
}

export function deleteStudentHandler() {
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      if (window.confirm('Ви впевнені, що хочете видалити цього студента?')) {
        await deleteStudent(id);
        loadStudents();
      }
    });
  });
}