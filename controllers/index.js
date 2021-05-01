module.exports = {
  getIndex: (req, res) => {
    res.render('./pages/index.ejs')
  },

  getRegister: (req, res) => {
    res.render('./pages/register.ejs')
  },

  getLogin: (req, res) => {
    res.render('./pages/login.ejs')
  }
}