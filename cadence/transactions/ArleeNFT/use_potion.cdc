import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"
import ArleePotion from "../../contracts/ArleePotion.cdc"

// This transaction is for adding a new Skin to an Arlee's wardrobe

transaction(arleeID: UInt64, potionID: UInt64) {

    prepare(acct: AuthAccount) {

        // borrow a reference to the signer's NFT collection
        let arleeCollectionRef = acct.borrow<&ArleeNFT.Collection>(from: ArleeNFT.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")
        
        // borrow a reference to the signer's NFT collection
        let itemCollectionRef = acct.borrow<&ArleePotion.Collection>(from: ArleePotion.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")

        let alreeRef = arleeCollectionRef.borrowArlee(id: arleeID)!
        let potion <- itemCollectionRef.withdrawPotion(withdrawID: potionID)

        alreeRef.usePotion(nft: <- potion)
    }
}