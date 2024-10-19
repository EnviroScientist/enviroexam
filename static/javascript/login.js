// 获取模态框和关闭按钮
var loginModal = document.getElementById("login-box");
var registerModal = document.getElementById("register-box");
var loginBtn = document.getElementById("loginBtn");
var registerBtn = document.getElementById("registerBtn");
var loginCloseBtn = loginModal.getElementsByClassName("close")[0];
var registerCloseBtn = registerModal.getElementsByClassName("close")[0];
// var switchLink = document.getElementById("switch-link");

// 发送 GET 请求获取用户登录状态
fetch('../app/check_login.php')
  .then(response => response.json())
  .then(data => {
        if (data.success) {
          // 用户已登录，显示用户名
          document.getElementById('loginMsg').textContent = 'Current user: ' + data.username;
          document.getElementById('loginMsg').style.display = 'inline-block'
          document.getElementById('logoutBtn').style.display = 'inline-block';
          document.getElementById('loginBtn').style.display = 'none';
          document.getElementById('registerBtn').style.display = 'none';
        } else {
          // 用户未登录，显示登录注册按钮
          document.getElementById('logoutBtn').style.display = 'none';
          document.getElementById('loginBtn').style.display = 'inline-block';
          document.getElementById('registerBtn').style.display = 'inline-block';
        }
  });

// 当用户点击登录按钮时，显示登录模态框
loginBtn.onclick = function () {
    loginModal.style.display = "block";
    registerModal.style.display = "none";
}

// 当用户点击注册按钮时，显示注册模态框
registerBtn.onclick = function () {
    registerModal.style.display = "block";
    loginModal.style.display = "none";
}

// 当用户点击登录模态框的关闭按钮时，隐藏登录模态框
loginCloseBtn.onclick = function () {
    loginModal.style.display = "none";
}

// 当用户点击注册模态框的关闭按钮时，隐藏注册模态框
registerCloseBtn.onclick = function () {
    registerModal.style.display = "none";
}

// // 当用户点击模态框之外的区域时，隐藏模态框
// window.onclick = function (event) {
//     if (event.target == loginModal) {
//         loginModal.style.display = "none";
//     }
//     if (event.target == registerModal) {
//         registerModal.style.display = "none";
//     }
// }

// 处理登录请求
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    fetch('../app/login.php', {
        method: 'POST',
        credentials: 'include', //发送session
        body: new FormData(event.target),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login successful!');
                // showContent();
                // window.location = location.origin + '/UserSystem_useful.php';
                window.location = location.origin + '/static/user_interface.html';

            } else {
                alert(data.message);
            }
        });

});

document.getElementById('email').addEventListener('click', function() {
    var newUsername = document.getElementById('new-username').value;
    var newPassword = document.getElementById('new-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    var passwordRegex = /^[a-zA-Z0-9!@#$%_+]+$/;
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    var minLengthPassword = 8;
    var maxLengthPassword = 20;
    var minLengthUsername = 4;
    var maxLengthUsername = 20;

    if (newUsername.length < minLengthUsername || newUsername.length > maxLengthUsername) {
        alert('Username must be between ' + minLengthUsername + ' and ' + maxLengthUsername + ' characters!');
        return;
    }
    if (!usernameRegex.test(newUsername)) {
        alert('Username can only contain letters and numbers!');
        return;
    }

    if (newPassword.length < minLengthPassword || newPassword.length > maxLengthPassword) {
        alert('Password must be between ' + minLengthPassword + ' and ' + maxLengthPassword + ' characters!');
        return;
    }
    if (!passwordRegex.test(newPassword)) {
        alert('Password can only contain letters, numbers, and !@#$%_+');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
});

// 处理注册请求
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var newUsername = document.getElementById('new-username').value;
    var newPassword = document.getElementById('new-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    // 发送注册请求到后端
    fetch('../app/login.php', {
        method: 'POST',
        body: new FormData(event.target),
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data); // 在控制台输出响应数据
            if (data.success) {
                alert('Registration successful!');
                document.getElementById('register-box').style.display = 'none';
                document.getElementById('login-box').style.display = 'block';
                // showContent();
            } else {
                alert(unescape(data.message));
            }
        })
    // .catch(error => {
    //     // 发生错误，处理错误逻辑
    //     console.error(error);
    // });
});


var interval;
var remainingSeconds = 0;

document.getElementById("send-code-btn").addEventListener("click", function() {
    // 获取电子邮件地址
    var username = document.getElementById('new-username').value;
    var email = document.getElementById("email").value;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }


    // 创建FormData对象
    var formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);

    // 发送POST请求
    // fetch("../app/send_verification_code_gmail.php", {
    fetch("../app/send_verification_code_outlook.php", {
        method: "POST",
        body: formData
    })
    .then(function(response) {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Network response was not ok.");
        }
    })
    .then(function(result) {
        if (result === "Message has been sent.") {
            alert("Verification code sent successfully. Please check your inbox.");
            startCountdown();
        } else if (result === "Email already in use.") {
            alert("Failed to send verification code. This email is already registered.");
        } else if (result === "Username already in use.") {
            alert("Failed to send verification code. This username is already taken.");
        } else {
            alert("Failed to send verification code. Please try again.");
        }
    })
    .catch(function(error) {
        console.log("Error: ", error);
    });
});

function startCountdown() {
    remainingSeconds = 60;
    interval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

function updateCountdown() {
    var button = document.getElementById("send-code-btn");

    if (remainingSeconds <= 0) {
        button.removeAttribute("disabled");
        button.innerHTML = "Send code";
        clearInterval(interval);
    } else {
        button.setAttribute("disabled", "disabled");
        button.innerHTML = "Resend (" + remainingSeconds + "s)";
        remainingSeconds--;
    }
}


// 处理注销
var logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function (){
        // 创建一个空的 FormData 对象
    var formData = new FormData();
    // 添加一个名为 "action"，值为 "logout" 的键值对到 FormData 对象中
    formData.append('action', 'logout');
    // 发送注销请求到后端
    fetch('../app/login.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('logout!');
                window.location = location.origin + '/index.html';
            } else {
                alert(data.message);
            }
        });
    });
}

// 切换登录框和注册框
var switchLinks = document.getElementsByClassName('switch-link');
for (var i = 0; i < switchLinks.length; i++) {
    switchLinks[i].addEventListener('click', function (event) {
        event.preventDefault();
        var loginBox = document.getElementById('login-box');
        var registerBox = document.getElementById('register-box');
        if (this.innerHTML === 'Register now') {
            loginBox.style.display = 'none';
            registerBox.style.display = 'block';
        } else {
            loginBox.style.display = 'block';
            registerBox.style.display = 'none';
        }
    });
}
