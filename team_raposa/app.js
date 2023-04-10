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

// READ - DELETE

const createRow = (product, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `<td>${product.nome}</td>
    <td>
    <button type="button" class="button green" id="edit-${index}">editar</button>
    <button type="button" class="button red" id="delete-${index}">excluir</button>
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
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            addProduct(product)
            updateTable()
            closeModal()
        } else {
            updateProduct(index, product)
            updateTable()
            closeModal()
        }
    }
}

document.getElementById('salvar')
    .addEventListener('click', saveClient)

// UPDATE - DELETE

const updateProduct = (index, product) => {
    const dbProduct = readProduct()
    dbProduct[index] = product
    setLocalStorage(dbProduct)
}

const deleteProduct = (index) => {
    const product = readProduct()
    product.splice(index, 1)
    setLocalStorage(product)
}

const fillFields = (product) => {
    document.getElementById('nome').value = product.nome
    document.getElementById('nome').dataset.index = product.index
}

const editProduct = (index) => {
    const product = readProduct()[index]
    product.index = index
    fillFields(product)
    openModal()
}

const editDelete = (event) => {
    if(event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if(action == "edit") {
            editProduct(index)
        } else {
            const product = readProduct()[index]
            const response = confirm(`Dejesa realmente excluir o produto ${product.nome}?`)
            
            if (response) {
                deleteProduct(index)
            }
        }
    }
    updateTable()
}

document.querySelector('#tableProducts>tbody')
    .addEventListener('click', editDelete)

