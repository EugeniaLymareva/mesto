export default class UserInfo {
  constructor({ userNameSelector, userOccupationSelector}) {
    this._userName = document.querySelector(userNameSelector)
    this._userOccupation = document.querySelector(userOccupationSelector)
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      job: this._userOccupation.textContent,
    }

    return this._userInfo
  }

  setUserInfo(inputValues) { 
    this._userName.textContent = inputValues['name']
    this._userOccupation.textContent = inputValues['job']
  }
}
