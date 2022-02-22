import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/MetadataViews.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"

// This script returns the metadata for an NFT in an account's collection.

pub fun main(address: Address, itemID: UInt64): AnyStruct? {
    // get the public account object for the token owner
    let account = getAccount(address)

    let collectionRef = account.getCapability(ArleeNFT.CollectionPublicPath)
        .borrow<&{ArleeNFT.ArleeCollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")

    
    // borrow a reference to a specific NFT in the collection
    let arlee = collectionRef.borrowArlee(id: itemID)!
    
    if let view = arlee.resolveView(Type<MetadataViews.Display>()) {
        let display = view as! MetadataViews.Display

        log(display.name)
        log(display.description)
        log(display.thumbnail)

        // The owner is stored directly on the NFT object
        let owner: Address = arlee.owner!.address!

        // Inspect the type of this NFT to verify its origin
        let nftType = arlee.getType()
    }

    // return collectionRef.getArleeMetadata(id: itemID) // Arlee.metadata
    return arlee.resolveView(Type<ArleeNFT.ArleeMeta>())
}
