var menuItem = {
    "id" : "wiki_search",
    "title" : "Wikit",
    "contexts" : ["selection"]
};
chrome.contextMenus.create(menuItem);

function findEncodeURI(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickedData) {
    if (clickedData.menuItemId=="wiki_search" && clickedData.selectionText) {
        var wikiurl = "https://en.wikipedia.org/wiki/" + findEncodeURI(clickedData.selectionText);
        var createData = {
            "focused" : true,
            "url" : wikiurl,
            "type" : "popup",
            "top" : 5,
            "left" : 5,
            "width" : screen.availWidth/2,
            "height" : screen.availHeight/2
        };
        chrome.windows.create(createData, function(){});
    }
})