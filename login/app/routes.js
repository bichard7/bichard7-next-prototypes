//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

// Add your routes here

router.post("/sign-in", function (request, response) {
  const { email, password } = request.body;
  const emailValid = email.indexOf("@") > -1;
  const correctEmail = "test@mail.com";
  const correctPassword = "password";
  const correctDetails = email === correctEmail && password == correctPassword;

  if (correctDetails) {
    return response.redirect("/security-code");
  }
  return response.render("/sign-in", {
    emailInvalid: !emailValid,
    incorrectLoginDetails: true,
  });
});

router.post("/security-code", function (request, response) {
  const correctSecurityCode = "1234";
  const { securityCode } = request.body;
  if (securityCode === correctSecurityCode) {
    return response.redirect("/welcome");
  }
  return response.render("/security-code", { incorrectSecurityCode: true });
});

router.post("/feedback", function (request, response) {
  const satisfactionRating = request.body.satisfactionRating;
  const improvementSuggestion = request.body.improvementSuggestion;
  isRadioEmpty = !satisfactionRating;
  isSuggestionEmpty = improvementSuggestion === "";

  if (isRadioEmpty || isSuggestionEmpty) {
    return response.render("/feedback", { isRadioEmpty, isSuggestionEmpty });
  }
  return response.redirect("/welcome");
});
