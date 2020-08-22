chrome.storage.sync.get(['total', 'limit'], function(budget) {
    document.getElementById('total').innerText = budget.total;
    document.getElementById('limit').innerText = budget.limit;
})

document.getElementById('spendAmount').addEventListener('click', function() {
    chrome.storage.sync.get(['total', 'limit'], function(budget) {
        var newTotal = 0;
        if (budget.total) {
            newTotal = newTotal + parseInt(budget.total);
        }
        var amount = document.getElementById('amount').value;
        if (amount) {
            newTotal = newTotal + parseInt(amount);
        }
        chrome.storage.sync.set({'total' : newTotal}, function() {
            if (amount && newTotal>=budget.limit) {
                var notifOptions = {
                    type : 'basic',
                    iconUrl : 'icon48.png',
                    title : 'Limit Reached',
                    message : "Uh oh! Looks like you have reached your limit!"
                };
                chrome.notifications.create('limitNotif', notifOptions);
            }
        });
        document.getElementById('total').innerText = newTotal;
        document.getElementById('amount').value = '';
    })
})