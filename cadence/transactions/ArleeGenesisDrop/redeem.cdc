import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"
import ArleeMintPass from "../../contracts/ArleeMintPass.cdc"
import ArleeGenesisDrop from "../../contracts/ArleeGenesisDrop.cdc"

// import FungibleToken from "../../contracts/FungibleToken.cdc"

transaction(withdrawID: UInt64, name: String, description: String, ipfsCID: String ) {
    // The resource that holds the mintpass nft being transferred
    let mp: @ArleeMintPass.NFT
    let arleeReceiverCap: Capability<&{ArleeNFT.ArleeCollectionPublic}>

    prepare(signer: AuthAccount) {
        // Get a reference to the signer's stored vault
        let collectionRef = signer.borrow<&ArleeMintPass.Collection>(from: ArleeMintPass.CollectionStoragePath)
            ?? panic("Could not borrow reference to the owner's Vault!")
 
        // Withdraw MP token from the signer's stored collection
        self.mp <- collectionRef.withdrawMP(withdrawID: withdrawID)

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
    }

    execute {
        // Deposit the withdrawn tokens in the presale account 
        ArleeGenesisDrop.redeemMintPass(mintpass: <- self.mp, arleeReceiverCap: self.arleeReceiverCap, ipfsCID: ipfsCID, name: name, description: description)
    }
}