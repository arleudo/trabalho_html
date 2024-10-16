<div id="dialog" class="dialog-overlay">
    <div class="dialog-box">
        <h2>Novo Usuário</h2>
        <form id="addUserForm" method="POST" onsubmit="saveUser(event)">
            <input type="text" id="input_name" name="nome" required placeholder="Nome" />
            <input type="email" id="input_email" name="email" required placeholder="Email" />
            <input type="password" id="input_password" name="password" required placeholder="Senha" />
            <input type="text" id="input_cpf" name="cpf" required placeholder="CPF" />
            <input type="tel" id="input_phone" name="telefone" required placeholder="Telefone" />
            <div class="buttons_dialog">
                <button type="button" onclick="closeDialog()">Cancelar</button>
                <button type="submit">Salvar</button>
            </div>
        </form>
    </div>
</div>