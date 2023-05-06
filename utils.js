function formatDate(date) {
  // send date then new date
  const d = new Date(date)
  // get year
  const year = d.getFullYear()
  // js month range 0-11所以+1，padStart補足2位數不足用0填充
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

module.exports = { formatDate }