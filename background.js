chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
     if (message.action === "getWalletAddress") {
         chrome.storage.local.get(["wallet"], (result) => {
             if (result.wallet) {
                 sendResponse({ success: true, address: result.wallet.address });
             } else {
                 sendResponse({ success: false, error: "No wallet found" });
             }
         });
         return true; // Indicates asynchronous response
     }
 });
 