const auth = (req, res, next) => {
	if (!req.session.user) {
		return res.redirect("/")
	}
	next();	
}

// const checkIsAcc = (req, res, next) => {
// 	if (!req.session.user) {
// 		return redirect("/")
// 	}
// 	next()
// }

module.exports = auth;