chrome.runtime.onMessage.addListener((function(o,e,n){const{site:s,changeSite:t}=o;s?(console.log(s),window.location.replace(`https://${s}`),n({status:"done"})):t&&(console.log(location.href),chrome.storage.sync.get("CDuserToken",(o=>{console.log(o)})),chrome.storage.sync.get("userCoupons",(o=>{console.log(o)})))}));