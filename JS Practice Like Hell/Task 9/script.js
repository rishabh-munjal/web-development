var text = document.querySelector('#text')
var counter = document.querySelector('h3')

text.addEventListener('input' , function(e){
    counter.textContent = text.value.length
})