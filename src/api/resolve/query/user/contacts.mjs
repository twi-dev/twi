import {Model} from "sequelize"

import isFunction from "lodash/isFunction"

import Contacts from "model/Contacts"

function getContacts(user) {
  if (!user.contacts || user.contacts instanceof Model) {
    return user.contacts
  }

  if (isFunction(user.getContacts)) {
    return user.getContacts()
  }

  return Contacts.findOne({where: {userId: user.id}})
}

export default getContacts
