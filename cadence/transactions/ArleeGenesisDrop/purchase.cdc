// This transaction withdraws FUSD from users account and sends to presale contract to purchase Arlees

import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"
import ArleeMintPass from "../../contracts/ArleeMintPass.cdc"
import ArleeGenesisDrop from "../../contracts/ArleeGenesisDrop.cdc"
import FUSD from "../../contracts/FUSD.cdc"

// import FungibleToken from "../../contracts/FungibleToken.cdc"

transaction( species: String ) {
    // The Vault resource that holds the tokens being transferred
    let funds: @FUSD.Vault
    let mpReceiverCap: Capability<&{ArleeMintPass.ArleeMintPassCollectionPublic}>
    let arleeReceiverCap: Capability<&{ArleeNFT.ArleeCollectionPublic}>

    prepare(signer: AuthAccount) {
        // Get a reference to the signer's stored vault
        let vaultRef = signer
        .borrow<&FUSD.Vault>(from: /storage/fusdVault)
        ?? panic("Could not borrow reference to the owner's Vault!")

        // Get total required funds for pack type
        let amount = ArleeGenesisDrop.getVoucherPrice(species: species )
        
        // Withdraw tokens from the signer's stored vault
        self.funds <- vaultRef.withdraw(amount: amount) as! @FUSD.Vault

        if signer.borrow<&ArleeMintPass.Collection>(from: ArleeMintPass.CollectionStoragePath) == nil {
            // Create a new empty collection
            let collection <- ArleeMintPass.createEmptyCollection()

            // save it to the account
            signer.save(<-collection, to: ArleeMintPass.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&{ArleeMintPass.ArleeMintPassCollectionPublic}>(
                ArleeMintPass.CollectionPublicPath,
                target: ArleeMintPass.CollectionStoragePath
            )
        }

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

        self.mpReceiverCap = signer.getCapability<&{ArleeMintPass.ArleeMintPassCollectionPublic}>(ArleeMintPass.CollectionPublicPath)
        self.arleeReceiverCap = signer.getCapability<&{ArleeNFT.ArleeCollectionPublic}>(ArleeNFT.CollectionPublicPath)
    }

    execute {
        // Deposit the withdrawn tokens in the presale account 
        ArleeGenesisDrop.purchaseMintPass(species: species , funds: <- self.funds, mpReceiverCap: self.mpReceiverCap)
    }
}