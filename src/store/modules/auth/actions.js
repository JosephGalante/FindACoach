let timer

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    })
  },

  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    })
  },

  async auth(context, payload) {
    const mode = payload.mode

    let url = ``
    if (mode === 'login') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_GOOGLE_API_KEY}`
    } else if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_GOOGLE_API_KEY}`
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate')
      throw error
    }

    // send a verification email to the provided email using Firebase when signing up
    if (mode === 'signup') {
      const sendEmailVerificationUrl = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.VUE_APP_GOOGLE_API_KEY}`
      const sendEmailVerificationResponse = await fetch(
        sendEmailVerificationUrl,
        {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: responseData.idToken,
          }),
        }
      )

      const sendEmailVerificationResponseData =
        await sendEmailVerificationResponse.json()

      if (!sendEmailVerificationResponse.ok) {
        const error = new Error(
          sendEmailVerificationResponseData.message ||
            'Failed to send verification email'
        )
        throw error
      }
    }

    // require a user to have verified their email before they can login/sign-up
    const getAccountInfoUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.VUE_APP_GOOGLE_API_KEY}`
    const getAccountInfoResponse = await fetch(getAccountInfoUrl, {
      method: 'POST',
      body: JSON.stringify({
        idToken: responseData.idToken,
      }),
    })

    const getAccountInfoResponseData = await getAccountInfoResponse.json()

    if (!getAccountInfoResponse.ok) {
      const error = new Error(
        getAccountInfoResponseData.message || 'Failed to get account info'
      )
      throw error
    }

    if (!getAccountInfoResponseData.users[0].emailVerified) {
      const error = new Error('Please verify your email before logging in')
      throw error
    }

    // unary operator '+' converts string to number
    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    })
  },

  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()

    if (expiresIn < 0) {
      return
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      })
    }
  },

  logout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)

    context.commit('setUser', {
      token: null,
      userId: null,
    })
  },

  autoLogout(context) {
    context.dispatch('logout')
    context.commit('setAutoLogout')
  },
}
