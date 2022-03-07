import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"

// This transaction is for transferring and NFT from
// one account to another

transaction(id: UInt64, name: String) {

    prepare(acct: AuthAccount) {

        // borrow a reference to the signer's NFT collection
        let collectionRef = acct.borrow<&ArleeNFT.Collection>(from: ArleeNFT.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")

        let alreeRef = collectionRef.borrowArlee(id: id) ?? panic("couldn't borrow reference to arlee ID:".concat(id.toString()))
        alreeRef.updateName(name: name)
    }
}