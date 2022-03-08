import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/MetadataViews.cdc"
import ArleePotion from "../../contracts/ArleePotion.cdc"

// This script returns the metadata for an NFT in an account's collection.

pub fun main(address: Address, itemID: UInt64): AnyStruct? {
    // get the public account object for the token owner
    let account = getAccount(address)

    let collectionRef = account.getCapability(ArleePotion.CollectionPublicPath)
        .borrow<&{ArleePotion.ArleePotionCollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")

    // borrow a reference to a specific NFT in the collection
    let potion = collectionRef.borrowArleePotion(id: itemID)!
    
    // return collectionRef.getArleeMetadata(id: itemID) // Arlee.metadata
    return potion.resolveView(Type<ArleePotion.ArleePotionMeta>())
}
