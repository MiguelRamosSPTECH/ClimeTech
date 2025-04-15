
function openCloseModal(tipoModal) {
    if(tipoModal == "delete") {
        if(modal_delete.classList == "hide" && fade.classList == "hide") {
            modal_delete.classList.remove("hide");
            fade.classList.remove("hide");
        } else {
            modal_delete.classList.add("hide");
            fade.classList.add("hide");
        }
    } else {
        if(modal_update.classList == "hide" && fade.classList == "hide") {
            modal_update.classList.remove("hide");
            fade.classList.remove("hide");
        } else {
            modal_update.classList.add("hide");
            fade.classList.add("hide");
        }
    }
}