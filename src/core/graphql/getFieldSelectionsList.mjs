function getFieldSelectionsList(node) {
  if (!node || node.fieldName || !node.fieldNodes) {
    return []
  }

  const name = node.fieldName

  const field = node.fieldNodes.find(curr => curr.name.value === name)

  return field.selectionSet.selections
    .filter(curr => curr.selectionSet == null)
    .map(curr => curr.name.value)
}

export default getFieldSelectionsList
