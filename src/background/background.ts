// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
})


chrome.tabs.onUpdated.addListener(async function(tabId,changeInfo,tab){
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);

    chrome.tabs.sendMessage(tabs[0].id, {changeSite: true}, function(response) {
        console.log(response.status);
    });
});

