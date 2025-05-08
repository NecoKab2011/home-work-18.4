import { updateStudentHandler, deleteStudentHandler } from './update-delete-students';

export function renderStudents(students) {
    const tableBody = document.querySelector('#students-table tbody');
    tableBody.innerHTML = '';
  
    students.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>
        <td>${student.skills.join(', ')}</td>
        <td>${student.email}</td>
        <td>${student.isEnrolled ? 'Записаний' : 'Не записаний'}</td>
        <td>
          <button class="update-btn" data-id="${student.id}">Оновити</button>
          <button class="delete-btn" data-id="${student.id}">Видалити</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  
    updateStudentHandler(students);
    deleteStudentHandler();
  }
  