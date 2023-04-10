'use strict'

function openModal() {
    document.getElementById('modal')
        .classList.add('active')
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(fields => fields.value = "")
}

function closeModal() {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

document.getElementById('addProduct')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

// CRUD
// CREATE

// const getLocalStorage = () => JSON.parse(localStorage.getItem('dbLista')) ?? []
const readProduct = () => JSON.parse(localStorage.getItem('dbLista')) ?? []
const setLocalStorage = (dbLista) => localStorage.setItem("dbLista", JSON.stringify(dbLista))

const addProduct = (product) => {
    const dbLista = readProduct()
    dbLista.push(product)
    setLocalStorage(dbLista)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

// READ

const createRow = (product, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `<td>${product.nome}</td>
    <td>
    <button type="button" class="button green">editar</button>
    <button type="button" class="button red">excluir</button>
    </td>`
    document.querySelector('#tableProducts>tbody').appendChild(newRow)
}


const clearTable = () => {
    const row = document.querySelectorAll('#tableProducts>tbody tr')
    row.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const products = readProduct()
    clearTable()
    products.forEach(createRow)
}

updateTable()

const saveClient = () => {
    if(isValidFields()) {
        const product = {
            nome: document.getElementById('nome').value,
        }
        addProduct(product)
        updateTable()
        closeModal()
    }
}

document.getElementById('salvar')
    .addEventListener('click', saveClient)
