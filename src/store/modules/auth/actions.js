export default {
  login() {},
  async signup(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWTTJZKhZoRWWjLGc-rvzWw2TBjO5ReBY`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    )

    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to sign up')
      throw error
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    })
  },
}
