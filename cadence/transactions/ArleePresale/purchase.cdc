// This transaction withdraws FUSD from users account and sends to presale contract to purchase Arlees

import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"
import ArleeItems from "../../contracts/ArleeItems.cdc"
import ArleePresale from "../../contracts/ArleePresale.cdc"
import FUSD from "../../contracts/FUSD.cdc"

// import FungibleToken from "../../contracts/FungibleToken.cdc"

transaction( packType: String ) {
    // The Vault resource that holds the tokens being transferred
    let funds: @FUSD.Vault
    let arleeReceiverCap: Capability<&{ArleeNFT.ArleeCollectionPublic}>
    let itemsReceiverCap: Capability<&{ArleeItems.ArleeItemsCollectionPublic}>

    prepare(signer: AuthAccount) {
        // Get a reference to the signer's stored vault
        let vaultRef = signer
        .borrow<&FUSD.Vault>(from: /storage/fusdVault)
        ?? panic("Could not borrow reference to the owner's Vault!")

        // Get total required funds for pack type
        let amount = ArleePresale.getPackPrice(packName: packType )
        
        // Withdraw tokens from the signer's stored vault
        self.funds <- vaultRef.withdraw(amount: amount) as! @FUSD.Vault

        if signer.borrow<&ArleeNFT.Collection>(from: ArleeNFT.CollectionStoragePath) == nil {
            // Create a new empty collection
            let collection <- ArleeNFT.createEmptyCollection()

            // save it to the account
            signer.save(<-collection, to: ArleeNFT.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&{ArleeNFT.ArleeCollectionPublic}>(
                ArleeNFT.CollectionPublicPath,
                target: ArleeNFT.CollectionStoragePath
            )
        }

        self.arleeReceiverCap = signer.getCapability<&{ArleeNFT.ArleeCollectionPublic}>(ArleeNFT.CollectionPublicPath)
        self.itemsReceiverCap = signer.getCapability<&{ArleeItems.ArleeItemsCollectionPublic}>(ArleeItems.CollectionPublicPath)
    }

    execute {
        // Deposit the withdrawn tokens in the presale account 
        ArleePresale.purchasePack(packType: packType , funds: <- self.funds, arleeReceiverCap: self.arleeReceiverCap, itemsReceiverCap: self.itemsReceiverCap)
    }
}