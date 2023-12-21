document.getElementById('form').addEventListener('submit', event => {
  const name = document.getElementById('name').value
  const lastName = document.getElementById('lastName').value
  const age = document.getElementById('age').value
  const email = document.getElementById('email').value
  const active = document.getElementById('active').checked

  console.log(name, lastName, age, email, active)
})
