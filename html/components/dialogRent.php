<div id="dialogRent" class="dialog-overlay">
    <div class="dialog-box">
        <h2>Selecione o Usuário</h2>
        <form id="addUserForm">
            <div class="topoRentDialog">
                <div class="search-container">
                    <input placeholder="Buscar pelo nome ou CPF" id="searchRentUser" class="searchChosed">
                    </input>
                    <div class="lupa">
                        <img src="../../imgs/search.svg" alt="">
                        </img>
                    </div>
                </div>
                <input id="chosed" class="inputDisableDialog">
                </input>
            </div>
        </form>
        <div class="buttons_dialog">
            <button type="button" onclick="cancelSetUser()">Cancelar</button>
            <button type="button" onclick="setUser()">OK</button>
        </div>
    </div>
</div>