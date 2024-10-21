<div id="dialog" class="dialog-overlay">
    <div class="dialog-box">
        <h2>Dê um feedback sobre o livro!</h2>
        <form id="addUserForm">
            <div class="feedback">
                <span class="estrela" data-value="1">&#9734;</span>
                <span class="estrela" data-value="2">&#9734;</span>
                <span class="estrela" data-value="3">&#9734;</span>
                <span class="estrela" data-value="4">&#9734;</span>
                <span class="estrela" data-value="5">&#9734;</span>
            </div>
            <textarea id="FeedBackinput" placeholder="Deixe seu comentário"></textarea>
        </form>
        <div class="buttons_dialog">
            <button type="button" onclick="closeDialog()">Cancelar</button>
            <button type="button" onclick="saveComment()">Salvar</button>
        </div>
    </div>
</div>