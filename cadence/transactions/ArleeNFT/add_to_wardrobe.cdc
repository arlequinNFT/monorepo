import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"

// This transaction is for adding a new Skin to an Arlee's wardrobe

transaction(id: UInt64, ipfsCID: String, name: String, description: String) {

    prepare(acct: AuthAccount) {

        // borrow a reference to the signer's NFT collection
        let collectionRef = acct.borrow<&ArleeNFT.Collection>(from: ArleeNFT.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")

        let alreeRef = collectionRef.borrowArlee(id: id)!
        alreeRef.addToWardrobe(ipfsCID: ipfsCID, name: name, description: description)
    }
}