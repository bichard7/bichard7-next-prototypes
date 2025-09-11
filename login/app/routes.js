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
    request.session.data.isLoggedIn = true;
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
  return response.redirect("/feedback-confirmation");
});

router.post("/feedback-confirmation", function (request, response) {
  const isLoggedIn = request.session.data.isLoggedIn;
  if (isLoggedIn) {
    return response.redirect("/welcome");
  }
  return response.redirect("/sign-in");
});

router.post("/feedback-confirmation", function (request, response) {
  const isLoggedIn = request.session.data.isLoggedIn;
  if (isLoggedIn) {
    return response.redirect("/welcome");
  }
  return response.redirect("/sign-in");
});

router.post("/reset-password", function (request, response) {
  const email = request.body.resetPasswordEmail;
  const emailValid = email.indexOf("@") > -1;
  if (emailValid) {
    return response.redirect("/reset-password-enter-security-code");
  }
  return response.render("reset-password", {
    resetPasswordEmailInvalid: true,
  });
});

router.post(
  "/reset-password-enter-security-code",
  function (request, response) {
    const resetPasswordSecurityCode = request.body.resetPasswordSecurityCode;
    const correctResetPaswordSecurityCode = "5678";

    if (resetPasswordSecurityCode === correctResetPaswordSecurityCode) {
      return response.redirect("/reset-password-new-password");
    }
    return response.render("reset-password-enter-security-code", {
      resetPasswordIncorrectSecurityCode: resetPasswordSecurityCode != "",
    });
  }
);

router.post("/reset-password-new-password", function (request, response) {
  const newPassword = request.body.newPassword;
  const confirmPAssword = request.body.confirmPassword;
  const isMatch = newPassword === confirmPAssword;
  const isNotEmpty = newPassword != "";

  if (isNotEmpty && isMatch) {
    return response.redirect("/reset-password-confirmation");
  }
  return response.render("reset-password-new-password");
});

router.post("/reset-password-confirmation", function (request, response) {
  return response.redirect("/sign-in");
});
