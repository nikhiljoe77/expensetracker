exports.getsignupPage = (request, response, next) => {
    response.sendFile('usersignup.html', { root: 'views' });
}
exports.getloginPage = (request, response, next) => {
    response.sendFile('userlogin.html', { root: 'views' });
}
exports.getexpensetracker = (request, response, next) => {
    response.sendFile('expensetracker.html', { root: 'views' });
}
exports.getforgotpassword = (request, response, next) => {
    response.sendFile('forgotpassword.html', { root: 'views' });
}