function State(){
    this.container = null;
    this.button = null;
}

export function init(){
    state.container = document.querySelector("#modal-contact");
    state.btn = document.querySelector(".btn-close");
    state.btn.addEventListener('click', handleButtonCloseClick);
    state.container.addEventListener('click', handleClickContainer);
}

const state = new State();

export function showModal(){
    state.container.classList.add("active");
}

export function closeModal(){
    state.container.classList.remove("active");
}

function handleButtonCloseClick(event){
    event.preventDefault();
    closeModal();
}

function handleClickContainer(event){
    event.preventDefault();
    if(event.target === this){
        closeModal();
    }
}