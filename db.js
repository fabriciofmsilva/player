let openIdbRequest = window.indexedDB.open('booksdb', 1);

let dbInstance
openIdbRequest.onsuccess = (event) => {
    dbInstance = event.target.result
    console.log('booksdb is opened successfully')
}

openIdbRequest.onerror = (event) => {
    console.log('There was an error in opening booksdb database')
}

openIdbRequest.onupgradeneeded = (event) => {
    let db = event.target.result
    let objectstore = db.createObjectStore('books', { keyPath: 'id' })
}

let openIdbRequest = window.indexedDB.open('booksdb', 2) // New Version - 2

/* Success and error event handlers remain the same.
The onupgradeneeded method gets called when the version of the database changes. */
openIdbRequest.onupgradeneeded = (event) => {
    let db = event.target.result
    if (!db.objectStoreNames.contains('books')) {
        let objectstore = db.createObjectStore('books', { keyPath: 'id' })
    }

    let oldVersion = event.oldVersion
    let newVersion = event.newVersion

    /* The users tables should be added for version 2. If the existing version is 1, it will be upgraded to 2, and the users object store will be created. */
    if (oldVersion === 1) {
        db.createObjectStore('users', { keyPath: 'id' })
    }
}

let transaction = dbInstance.transaction('books')
let objectstore = transaction.objectstore('books')

let bookRecord = {
    id: '1',
    name: 'The Alchemist',
    author: 'Paulo Coelho'
}
let addBookRequest = objectstore.add(bookRecord)

addBookRequest.onsuccess = (event) => {
    console.log('Book record added successfully')
}

addBookRequest.onerror = (event) => {
    console.log('There was an error in adding book record')
}

let modifyBookRequest = objectstore.put(bookRecord) // put method takes in an object as the parameter
modifyBookRequest.onsuccess = (event) => {
    console.log('Book record updated successfully')
}

let transaction = dbInstance.transaction('books')
let objectstore = transaction.objectstore('books')

/* get method takes in the id of the record */
let getBookRequest = objectstore.get(1)

getBookRequest.onsuccess = (event) => {
    /* event.target.result contains the matched record */
    console.log('Book record', event.target.result)
}

getBookRequest.onerror = (event) => {
    console.log('Error while retrieving the book record.')
}
