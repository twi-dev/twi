function getFieldSelectionsList(node) {
  const name = node.fieldName

  const field = node.fieldNodes.find(curr => curr.name.value === name)

  return field.selectionSet.selections.map(curr => curr.name.value)
}

export default getFieldSelectionsList
