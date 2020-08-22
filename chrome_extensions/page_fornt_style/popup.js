var color = document.getElementById('fontColor').value;
document.getElementById('fontColor').addEventListener('change', function() {
    color = document.getElementById('fontColor').value;
    console.log(color);
    document.getElementById('btnChange').addEventListener('click', function() {
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {todo : "changeColor", clickedColor : color});
        });
    });
});
document.getElementById('fontColor').addEventListener('paste', function() {
    color = document.getElementById('fontColor').value;
    console.log(color);
    document.getElementById('btnChange').addEventListener('click', function() {
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {todo : "changeColor", clickedColor : color});
        });
    });
});
document.getElementById('fontColor').addEventListener('keyup', function() {
    color = document.getElementById('fontColor').value;
    console.log(color);
    document.getElementById('btnChange').addEventListener('click', function() {
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {todo : "changeColor", clickedColor : color});
        });
    });
});