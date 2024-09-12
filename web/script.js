/**
 * @type {HTMLFormElement}
 */
const customerForm = document.getElementById('customerForm')

/**
 * @type {HTMLUListElement}
 */
const errorsList = document.getElementById('errors')

/**
 * @type {HTMLParagraphElement}
 */
const successMessage = document.getElementById('success')

/**
 * @type {HTMLUListElement}
 */
const customersList = document.getElementById('customersList')

/**
 * @type {HTMLDivElement}
 */
const customersSection = document.getElementById('customersSection')

/**
 * @typedef Customer
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} address
 * @property {string} zipCode
 * @property {string} city
 * @property {string} phone
 * @property {'man' | 'woman'} gender
 * @property {string} login
 * @property {string} email
 * @property {string} password
 * @property {string} passwordConfirmation
 */

/**
 * @type {Customer[]}
 */
const customers = JSON.parse(localStorage.getItem('customers') ?? '[]')

/**
 *
 * @param {Customer[]} customers
 */
const renderCustomers = (customers) => {
  if (customers.length > 0) {
    customersSection.style.display = 'block'
  } else {
    customersSection.style.display = 'none'
  }

  customersList.innerHTML = ''
  for (const customer of customers) {
    const li = document.createElement('li')
    li.innerHTML = `
      <li>
        <table class="table">
          <thead>
            <th>Prénom</th>
            <th>Nom</th>
          </thead>
          <tbody>
            <tr>
              <td>${customer.firstname}</td>
              <td>${customer.lastname}</td>
            </tr>
          </tbody>
        </table>
      </li>
    `
    customersList.appendChild(li)
  }
}

renderCustomers(customers)

customerForm.addEventListener('submit', (event) => {
  event.preventDefault()
  errorsList.innerHTML = ''

  const formData = new FormData(customerForm)
  const formDataObject = Object.fromEntries(formData)
  const isSamePassword = formDataObject.password === formDataObject.passwordConfirmation
  if (!isSamePassword) {
    const li = document.createElement('li')
    li.className = "error"
    li.innerHTML = `
      <strong>Erreur:</strong>
      <span>Les mots de passe ne sont pas identiques.</span>
    `
    errorsList.appendChild(li)
  }

  const isValid = errorsList.children.length <= 0
  if (isValid) {
    errorsList.style.display = 'none'
    successMessage.style.display = 'block'
    customerForm.reset()
    customers.push(formDataObject)
    localStorage.setItem('customers', JSON.stringify(customers))
    renderCustomers(customers)
  } else {
    errorsList.style.display = 'block'
    successMessage.style.display = 'none'
  }
})
