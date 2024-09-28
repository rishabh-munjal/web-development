var button = document.getElementById('swap');
var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');

button.addEventListener('click', function(e) {
    var src1 = img1.src;
    var src2 = img2.src;

    img1.src = src2;
    img2.src = src1;
});
