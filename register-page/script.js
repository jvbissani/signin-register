class User {
    constructor(username, email, password, re_password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.re_password = re_password;
    }
}

var signin_box = document.getElementById("signin-box");
var box_texture = document.getElementById("box-texture");

var user = new User(
    document.getElementById("username"),
    document.getElementById("email"),
    document.getElementById("password"),
    document.getElementById("re-password")
);

var user_text = document.getElementById("user-text");
var mail_text = document.getElementById("mail-text");
var pass_text = document.getElementById("pass-text");
var repass_text = document.getElementById("repass-text");

user_text.hidden = true;
mail_text.hidden = true;
pass_text.hidden = true;
repass_text.hidden = true;

user.username.value = null;
user.email.value = null;
user.password.value = null;
user.re_password.value = null;

function checkUsername() {
    var username = user.username.value;
    if (username.length < 5) {
        user_text.hidden = false;
        user.username.style.borderColor = "#AB1717";
        signin_box.style.height = "550px";
        box_texture.style.height = "596.1px";
        return false;
    } else {
        user_text.hidden = true;
        user.username.style.borderColor = "#1AAB17";
        signin_box.style.height = "480px";
        box_texture.style.height = "521.6px";
    }
    return username;
}

function checkEmail() {
    var emailInput = user.email.value;
    var validEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (emailInput.length < 5 || !validEmailRegex.test(emailInput)) {
        mail_text.hidden = false;
        user.email.style.borderColor = "#AB1717";
        signin_box.style.height = "550px";
        box_texture.style.height = "596.1px";
        return false;
    } else {
        var parts = emailInput.split('@');
        if (parts.length === 2 && parts[0].length >= 5) {
            mail_text.hidden = true;
            user.email.style.borderColor = "#1AAB17";
            signin_box.style.height = "480px";
            box_texture.style.height = "521.6px";
        } else {
            mail_text.hidden = false;
            user.email.style.borderColor = "#AB1717";
            signin_box.style.height = "550px";
            box_texture.style.height = "596.1px";
            return false;
        }
    }
    return emailInput;
}

function checkPasswordStrength(password) {
    var hasNumber = /\d/.test(password);
    var hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
    var hasUpperCase = /[A-Z]/.test(password);

    return password.length >= 6 && hasNumber && hasSpecialChar && hasUpperCase;
}

function checkPassword() {
    var pass = user.password.value;

    if (!checkPasswordStrength(pass)) {
        pass_text.hidden = false;
        user.password.style.borderColor = "#AB1717";
        signin_box.style.height = "550px";
        box_texture.style.height = "596.1px";
        return false;
    } else {
        pass_text.hidden = true;
        user.password.style.borderColor = "#1AAB17";
        signin_box.style.height = "480px";
        box_texture.style.height = "521.6px";
    }

    return pass;
}

function checkRePassword() {
    var pass = user.password.value;
    var repass = user.re_password.value;

    if (repass != pass || repass.length < 6 || !checkPasswordStrength(repass)) {
        repass_text.hidden = false;
        user.re_password.style.borderColor = "#AB1717";
        user.password.style.borderColor = "#AB1717";
        signin_box.style.height = "550px";
        box_texture.style.height = "596.1px";
        return false;
    } else {
        repass_text.hidden = true;
        user.re_password.style.borderColor = "#1AAB17";
        signin_box.style.height = "480px";
        box_texture.style.height = "521.6px";
    }

    return repass;
}

function finishForm() {
    var hasError = false;

    if (!checkUsername()) {
        hasError = true;
    }

    if (!checkEmail()) {
        hasError = true;
    }

    if (!checkPassword()) {
        hasError = true;
    }

    if (!checkRePassword()) {
        hasError = true;
    }

    if (hasError) {
        signin_box.style.height = "550px";
        box_texture.style.height = "596.1px";
    }
    console.log(user.username.value, user.email.value, user.password.value, user.re_password.value);
}

document.getElementById("button").onclick = finishForm;
user.re_password.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); //Interrupting the normal flow of event
    finishForm();
  }
});

