export function getCookie(request, name) {
    let result = null
    let cookieString = request.headers.get('Cookie')
    if (cookieString) {
      let cookies = cookieString.split(';')
      cookies.forEach(cookie => {
        let cookieName = cookie.split('=')[0].trim()
        if (cookieName === name) {
          let cookieVal = cookie.split('=')[1]
          result = cookieVal
        }
      })
    }
    return result
  }