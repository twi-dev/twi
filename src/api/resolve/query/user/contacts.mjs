import Contacts from "model/Contacts"

const getContacts = user => (
  user.contacts ?? Contacts.findOne({where: {userId: user.id}})
)

export default getContacts
