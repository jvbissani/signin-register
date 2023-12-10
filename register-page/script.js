class User {
    constructor(username, email, password, re_password) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.re_password = re_password;
    }
  }
  
  var register_box = document.getElementById("register-box");
  var box_texture = document.getElementById("box-texture");
  var button = document.getElementById("button");
  
  var user_text = document.getElementById("user-text");
  var mail_text = document.getElementById("mail-text");
  var pass_text = document.getElementById("pass-text");
  var repass_text = document.getElementById("repass-text");
  
  user_text.hidden = true;
  mail_text.hidden = true;
  pass_text.hidden = true;
  repass_text.hidden = true;
  
  // Defina os valores iniciais dos campos de entrada como vazios
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("re-password").value = "";
  
  function showError(element, message, errorTextElement) {
    element.style.borderColor = "#AB1717";
    element.style.borderWidth = "2px";
    errorTextElement.textContent = message;
    errorTextElement.hidden = false;
    register_box.style.height = "600px";
    box_texture.style.height = "640px";
  }
  
  function hideError(element, errorTextElement) {
    element.style.borderColor = "#1AAB17";
    element.style.borderWidth = "1px";
    errorTextElement.textContent = "";
    errorTextElement.hidden = true;
  }
  
  function checkUsername() {
    var usernameElement = document.getElementById("username");
    var username = usernameElement.value;
    var userTextElement = document.getElementById("user-text");
  
    if (username.length < 5) {
      showError(usernameElement, "Username must be at least 5 characters long.", userTextElement);
    } else {
      hideError(usernameElement, userTextElement);
    }
  }
  
  function checkEmail() {
    var emailElement = document.getElementById("email");
    var emailInput = emailElement.value;
    var validEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    var mailTextElement = document.getElementById("mail-text");
  
    if (emailInput.length < 5 || !validEmailRegex.test(emailInput)) {
      showError(emailElement, "Wrong or Invalid e-mail address.", mailTextElement);
    } else {
      var parts = emailInput.split('@');
      if (parts.length === 2 && parts[0].length >= 5) {
        hideError(emailElement, mailTextElement);
      } else {
        showError(emailElement, "Wrong or Invalid e-mail address.", mailTextElement);
      }
    }
  }
  
  function checkPasswordStrength(password) {
    var hasNumber = /\d/.test(password);
    var hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
    var hasUpperCase = /[A-Z]/.test(password);
  
    return password.length >= 6 && hasNumber && hasSpecialChar && hasUpperCase;
  }
  
  function checkPassword() {
    var passwordElement = document.getElementById("password");
    var password = passwordElement.value;
    var passTextElement = document.getElementById("pass-text");
  
    if (!checkPasswordStrength(password)) {
      showError(passwordElement, "Must have at least 6 characters, caps, numbers and @#%.", passTextElement);
    } else {
      hideError(passwordElement, passTextElement);
    }
  }
  
  function checkRePassword() {
    var passwordElement = document.getElementById("password");
    var repasswordElement = document.getElementById("re-password");
    var pass = passwordElement.value;
    var repass = repasswordElement.value;
    var repassTextElement = document.getElementById("repass-text");
  
    if (repass !== pass || repass.length < 6 || !checkPasswordStrength(repass)) {
      showError(repasswordElement, "Passwords do not match.", repassTextElement);
    } else {
      hideError(repasswordElement, repassTextElement);
    }
  }
  
  function finishForm() {
    
    checkUsername();
    checkEmail();
    checkPassword();
    checkRePassword();
  
    var user = new User(
      document.getElementById("username").value,
      document.getElementById("email").value,
      document.getElementById("password").value,
      document.getElementById("re-password").value
    );
  
    console.log(user.username, user.email, user.password, user.re_password);
  }
  
  document.getElementById("username").addEventListener('input', checkUsername);
  document.getElementById("email").addEventListener('input', checkEmail);
  document.getElementById("password").addEventListener('input', checkPassword);
  document.getElementById("re-password").addEventListener('input', checkRePassword);
  
  button.onclick = finishForm;
  
  function handleEnterKey(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      finishForm();
    }
  }
  