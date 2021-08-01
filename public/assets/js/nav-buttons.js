// NAV BUTTONS
$(document).ready(function() {
  if (userData.firstname) {
    // Logoutbutton
    $(".btn-danger").show();
    // Registration button
    $(".btn-btn-primary").hide();
    // SignIn BUTTONS
    $(".btn-success").hide();
  } else {
    // Logoutbutton
    $(".btn-danger").hide();
    // Registration button
    $(".btn-btn-primary").show();
    // SignIn BUTTONS
    $(".btn-success").show();
  }
})