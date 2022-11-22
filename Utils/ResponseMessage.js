const errorMessage = (status, message, data) => {
  return {
    status,
    message,
    data
  }
}

const successMessage = (status, message, data) => {
  return {
    status,
    message,
    data
  }
}

module.exports = { successMessage, errorMessage }