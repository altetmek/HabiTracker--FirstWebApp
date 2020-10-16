const setCookies = (response, extraDays) => {
  // ------------------------making keyValues for cookies-----------------
  const email = 'email' + '=' + response.data.user.email
  const id = 'id' + '=' + response.data.user.id
  const username = 'username' + '=' + response.data.user.username
  const loggedIn = 'loggedIn' + '=' + response.data.user.loggedIn
  // ---------------------------expiry for the cookies--------------------
  const timeNow = new Date()
  timeNow.setTime(timeNow.getTime() + (extraDays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + timeNow.toUTCString()

  // -----------------------------------creating cookies------------------
  // Cookie String
  const cookie1 = email + ';path=/;' + expires
  const cookie2 = id + ';path=/;' + expires
  const cookie3 = username + ';path=/;' + expires
  const cookie4 = loggedIn + ';path=/;' + expires

  // Create cookie
  document.cookie = cookie1
  document.cookie = cookie2
  document.cookie = cookie3
  document.cookie = cookie4
}

// getting values from the cookies
const getCookieValue = (cookieKey) => {
  const cookiesList = document.cookie.split(';').map((cookie) => {
    return cookie.trim()
  })

  for (let i = 0; i < cookiesList.length; i++) {
    const cookie = cookiesList[i].split('=')
    const key = cookie[0]
    const value = cookie[1]
    if (key === cookieKey) {
      return value
    }
  }
  return undefined
}

const getCookieObj = () => {
  if (getCookieValue('email') === undefined || getCookieValue('id') === undefined || getCookieValue('username') === undefined || getCookieValue('loggedIn') === undefined) {
    return null
  } else {
    return '{ "data" : { "user" : {"email" : "' + getCookieValue('email') + '" ,' +
        '"id" : "' + getCookieValue('id') + '",' +
        '"username" : "' + getCookieValue('username') + '",' +
        '"loggedIn" : ' + getCookieValue('loggedIn') + '}}}'
  }
}

module.exports = {
  setCookies,
  getCookieObj,
  getCookieValue
}
