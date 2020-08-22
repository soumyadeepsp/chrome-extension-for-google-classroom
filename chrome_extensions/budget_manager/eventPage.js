var contextMenuItem = {
    "id" : "spendMoney",
    "title" : "SpendMoney",
    "contexts" : ["selection"],
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickedData) {
    if (clickedData.menuItemId=="spendMoney" && clickedData.selectionText) {
        if (!isNaN(clickedData.selectionText)) {
            chrome.storage.sync.get(['limit', 'total'], function(budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal = newTotal + parseInt(budget.total);
                }
                newTotal = newTotal + parseInt(clickedData.selectionText);
                chrome.storage.sync.set({'total' : newTotal}, function() {
                    if (newTotal>=budget.limit) {
                        var notifOptions = {
                            type : 'basic',
                            iconUrl : 'icon48.png',
                            title : 'Limit Reached',
                            message : "Uh oh! Looks like you have reached your limit!"
                        };
                        chrome.notifications.create('limitNotif', notifOptions);
                    }
                })
            })
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName) {
    chrome.browserAction.setBadgeText({"text" : changes.total.newValue.toString()});
});