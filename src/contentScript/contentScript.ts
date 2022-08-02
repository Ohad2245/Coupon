// TODO: content script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const {site, changeSite}= request
        if (site) {
            console.log(site)
            window.location.replace(`https://${site}`);
            sendResponse({status: "done"});
        } else if(changeSite) {
            console.log(location.href)
            chrome.storage.sync.get('CDuserToken',(data) => {
                console.log(data)
            })
            chrome.storage.sync.get('userCoupons',(data) => {
                console.log(data)
            })
        }
    }
)




