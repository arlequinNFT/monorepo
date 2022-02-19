// This transaction withdraws FUSD from users account and sends to presale contract to purchase Arlees

import ArlequinPresale from "../../contracts/ArlequinPresale.cdc"
import FUSD from "../../contracts/FUSD.cdc"

// import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
// import FungibleToken from "../../contracts/FungibleToken.cdc"
// import ArlequinNFT from "../../contracts/ArlequinNFT.cdc"

transaction( packType: String, sendTo: Address ) {
    // The Vault resource that holds the tokens being transferred
    let funds: @FUSD.Vault

    prepare(signer: AuthAccount) {
        // Get a reference to the signer's stored vault
        let vaultRef = signer
        .borrow<&FUSD.Vault>(from: /storage/fusdVault)
        ?? panic("Could not borrow reference to the owner's Vault!")

        // Get total required funds for pack type
        let amount = ArlequinPresale.getPackPrice(packName: packType )
        
        // Withdraw tokens from the signer's stored vault
        self.funds <- vaultRef.withdraw(amount: amount) as! @FUSD.Vault
    }

    execute {
        // Deposit the withdrawn tokens in the presale account 
        ArlequinPresale.purchaseArlee(packType: packType , funds: <- self.funds, userAddress: sendTo)
    }
}