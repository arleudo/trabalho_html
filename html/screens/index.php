<s?php include '../actions/initDatabase.php' ; ?>

  <!DOCTYPE html>
  <html lang="pt-BR">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tela de Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../../css/index.css" />
    <link rel="stylesheet" href="../../css/login.css" />
  </head>

  <body>
    <div class="login-container">
      <form class="login-form" method="POST" onsubmit="validLogin(event)">
        <img src="../../imgs/book.svg" alt="Book" class="book" />
        <h2>Login</h2>
        <input type="email" placeholder="Email" name="email" id="field_email" required />
        <input type="password" placeholder="Senha" name="password" id="field_password" required />

        <button type="submit">Entrar</button>
      </form>
    </div>

    <script src="../../scripts/script.js"></script>
  </body>

  </html>