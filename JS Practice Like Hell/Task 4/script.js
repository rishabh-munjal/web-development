const add = document.getElementById('add');
const remove = document.getElementById('remove');

var list = document.querySelector('ul');

add.addEventListener('click', function(e) {
    
    var item = document.querySelector('#item').value; 

    if (item.trim(it ) != '') {
        let li = document.createElement('li'); 
        li.innerHTML = `${item}`; 
        list.appendChild(li); 
        document.querySelector('#item').value = ''; 
    }
});

remove.addEventListener('click', function(e) {
    if (list.lastChild) {
        list.removeChild(list.lastChild); 
    }
});
