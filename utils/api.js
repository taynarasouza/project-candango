const host = "http://54afb3e16666.ngrok.io/api";


export const
  login = (email, senha) =>
    fetch(`${host}/candango/signin`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "eml_usuario": email, // "admin@gmail.com",
        "pwd_usuario": senha  // "adminroot"
      })
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  cadastrar = (nome, email, senha) =>
    fetch(`${host}/candango/signup`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "nme_usuario": nome,
        "eml_usuario": email,
        "pwd_usuario": senha
      })
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  getPoints = () =>
    fetch(`${host}/candango/pontos-turisticos`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  getCircuits = () =>
    fetch(`${host}/candango/circuitos`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  getMedals = () =>
    fetch(`${host}/candango/medalhas`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.error(err)),

  getUserMedals = (id) =>
    fetch(`${host}/candango/medalhas-usuario`, {
      method: "POST",
      body: JSON.stringify({idtUsuario: id}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.error(err))
;