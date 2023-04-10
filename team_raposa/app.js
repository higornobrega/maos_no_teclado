'use strict'

function openModal() {
    document.getElementById('modal')
        .classList.add('active')
}

function closeModal() {
    document.getElementById('modal').classList.remove('active')
}

document.getElementById('addProduct')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

// CRUD
// CREATE

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbLista')) ?? []
const setLocalStorage = (dbLista) => localStorage.setItem("dbLista", JSON.stringify(dbLista))

const addProduct = (product) => {
    const dbLista = getLocalStorage()
    dbLista.push(product)
    setLocalStorage(dbLista)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

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