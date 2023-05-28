export default class UserInfo {
  constructor({ userNameSelector, userOccupationSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector)
    this._userOccupation = document.querySelector(userOccupationSelector)
    this._userAvatar = document.querySelector(userAvatarSelector)
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      about: this._userOccupation.textContent,
    }

    return this._userInfo
  }

  setUserInfo(userData) { 
    this._userName.textContent = userData.name
    this._userOccupation.textContent = userData.about
  }

  setUserAvatar(userData) {
    this._userAvatar.src = userData.avatar
  }
}
