let token = localStorage.getItem("token");

function login() {
  fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      mobile: mobile.value,
      password: password.value
    })
  }).then(r => r.json()).then(d => {
    localStorage.setItem("token", d.token);
    window.location = "dashboard.html";
  });
}

function load() {
  fetch("http://127.0.0.1:5000/dashboard", {
    headers: {Authorization: `Bearer ${token}`}
  }).then(r => r.json()).then(d => bal.innerText = d.balance);

  fetch("http://127.0.0.1:5000/transactions", {
    headers: {Authorization: `Bearer ${token}`}
  }).then(r => r.json()).then(d => {
    d.forEach(t => tx.innerHTML += `<li>${t[0]} Rs ${t[1]}</li>`);
  });
}

function add() {
  fetch("http://127.0.0.1:5000/add", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({amount: Number(amt.value)})
  }).then(load);
}

function send() {
  fetch("http://127.0.0.1:5000/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({amount: Number(amt.value)})
  }).then(load);
}

if (window.location.pathname.includes("dashboard")) load();
