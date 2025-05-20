function openCloseIndice() {
    if(modal_indice.classList == "hide" && fade.classList == "hide") {
        modal_indice.classList.remove("hide");
        fade.classList.remove("hide");
    } else {
        modal_indice.classList.add("hide");
        fade.classList.add("hide");
    }
}