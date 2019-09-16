const getContacts = user => user.contacts ?? user.getContacts()

export default getContacts
