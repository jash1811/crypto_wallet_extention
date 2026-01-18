document.addEventListener("DOMContentLoaded", async () => {
     chrome.storage.local.get(["wallet"], async (result) => {
         if (!result.wallet) {
             const wallet = ethers.Wallet.createRandom();
             chrome.storage.local.set({ wallet: { address: wallet.address, privateKey: wallet.privateKey } });
             document.getElementById("walletAddress").innerText = wallet.address;
         } else {
             document.getElementById("walletAddress").innerText = result.wallet.address;
         }
     });
 
     document.getElementById("approveBtn").addEventListener("click", () => {
         chrome.runtime.sendMessage({ action: "getWalletAddress" }, (response) => {
             if (response.success) {
                 alert("Wallet Connected: " + response.address);
             } else {
                 alert("Wallet Connection Failed!");
             }
         });
     });
 
     document.getElementById("rejectBtn").addEventListener("click", () => {
         chrome.runtime.sendMessage({ action: "walletResponse", success: false, message: "Request rejected!" });
         alert("Request Rejected");
     });
 });
 