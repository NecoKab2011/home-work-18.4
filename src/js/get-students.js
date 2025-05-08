export const apiUrl = 'http://localhost:3000/students';

export async function getStudents() {
  const res = await fetch(apiUrl);
  return res.json();
}

export async function addStudent(student) {
  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });
}

export async function updateStudent(id, updatedData) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });
}

export async function deleteStudent(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
}
