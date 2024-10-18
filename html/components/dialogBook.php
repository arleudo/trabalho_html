<div id="dialog" class="dialog-overlay">
    <div class="dialog-box">
        <h2>Novo Livro</h2>
        <form id="addBookForm">
            <input type="text" id="input_name" name="nome" required placeholder="Nome" />
            <input type="text" id="input_url" name="url" required placeholder="URL para a imagem" />
            <input type="text" id="input_author" name="author" required placeholder="Autor" />
            <input type="text" id="input_sinopse" name="sinopse" required placeholder="Sinopse" />
            <select type="text" id="input_theme" name="theme" required placeholder="Tema" >
                <option value="">Selecione um gênero</option>
                <option value="aventura">Aventura</option>
                <option value="biografia">Biografia</option>
                <option value="ciencia">Ciência</option>
                <option value="contos">Contos</option>
                <option value="drama">Drama</option>
                <option value="fantasia">Fantasia</option>
                <option value="ficcao-cientifica">Ficção Científica</option>
                <option value="historia">História</option>
                <option value="humor">Humor</option>
                <option value="misterio">Mistério</option>
                <option value="poesia">Poesia</option>
                <option value="policial">Policial</option>
                <option value="romance">Romance</option>
                <option value="suspense">Suspense</option>
                <option value="terror">Terror</option>
            </select>
        </form>
        <div class="buttons_dialog">
            <button type="button" onclick="closeDialog()">Cancelar</button>
            <button type="button" onclick="saveBook()">Salvar</button>
        </div>
    </div>
</div>