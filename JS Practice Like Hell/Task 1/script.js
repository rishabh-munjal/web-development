const button = document.getElementById('button')
const para = document.getElementById('para')

button.addEventListener('click' , function(e){
    para.innerHTML = `You clicked the button !`
})