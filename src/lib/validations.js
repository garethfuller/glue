function required(field=null) {
  const _field = field ? `${field} ` : ''
  return v => !!v || `${_field}is required`
}

export {
 required
}
