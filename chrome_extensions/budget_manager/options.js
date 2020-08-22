chrome.storage.sync.get(['limit'], function(budget) {
    document.getElementById('limit').value = budget.limit;
})

document.getElementById('saveLimit').addEventListener('click', function() {
    var limit = document.getElementById('limit').value;
    if (limit) {
        chrome.storage.sync.set({'limit' : limit}, function() {
            close();
        })
    }
});

document.getElementById('resetTotal').addEventListener('click', function() {
    chrome.storage.sync.set({'total' : 0})
})