import { updateStudent } from './get-students.js';
import { loadStudents } from './update-delete-students.js';

const modal = document.getElementById('update-modal');
const modalForm = document.getElementById('modal-update-form');
let currentStudentId = null;

export function openUpdateModal(student) {
  modal.style.display = 'block';
  currentStudentId = student.id;

  modalForm.name.value = student.name;
  modalForm.age.value = student.age;
  modalForm.course.value = student.course;
  modalForm.skills.value = student.skills.join(', ');
  modalForm.email.value = student.email;
  modalForm.isEnrolled.checked = student.isEnrolled;
}

export function setupModal() {
  document.querySelector('.modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  modalForm.addEventListener('submit', async e => {
    e.preventDefault();
    const updatedStudent = {
      name: modalForm.name.value,
      age: parseInt(modalForm.age.value),
      course: modalForm.course.value,
      skills: modalForm.skills.value.split(',').map(s => s.trim()),
      email: modalForm.email.value,
      isEnrolled: modalForm.isEnrolled.checked
    };

    await updateStudent(currentStudentId, updatedStudent);
    modal.style.display = 'none';
    loadStudents();
  });
}


