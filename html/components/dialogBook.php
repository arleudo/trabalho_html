<div id="dialog" class="dialog-overlay">
    <div class="dialog-box">
        <h2>Novo Livro</h2>
        <form id="addBookForm">
            <input type="text" id="input_name" name="nome" required placeholder="Nome" />
            <input type="text" id="input_author" name="author" required placeholder="Autor" />
            <input type="text" id="input_sinopse" name="sinopse" required placeholder="Sinopse" />
            <input type="text" id="input_theme" name="theme" required placeholder="Tema" />
        </form>
        <div class="buttons_dialog">
            <button type="button" onclick="closeDialog()">Cancelar</button>
            <button type="button" onclick="saveBook()">Salvar</button>
        </div>
    </div>
</div>