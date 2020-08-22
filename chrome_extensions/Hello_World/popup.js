var text = document.getElementById('text');
var greet = document.getElementById('greet');

text.addEventListener('keyup', function() {
    greet.innerText = 'Hello ' + text.value;
});