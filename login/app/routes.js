//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.post('/sign-in', function (request, response) {
    const {email, password} = request.body;
    const emailValid = email.indexOf("@") > -1;
    if (email && emailValid && password) {
        return response.redirect("/security-code")
    }
    return response.render("/sign-in", {emailInvalid: !emailValid});
})

router.post('/security-code', function (request, response) {
    const {securityCode} = request.body;
    if (securityCode) {
        return response.redirect("/sign-in")
    }
    response.redirect("/security-code")
})