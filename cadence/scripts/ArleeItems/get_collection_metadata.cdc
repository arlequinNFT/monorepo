import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeItems from "../../contracts/ArleeItems.cdc"

// This script returns the size of an account's ArleeItems collection.

pub fun main(address: Address): [ArleeItems.ArleeItemMeta] {
    // get the public account object for the token owner
    let account = getAccount(address)

    let collectionRef = account.getCapability(ArleeItems.CollectionPublicPath)
        .borrow<&{ArleeItems.ArleeItemsCollectionPublic}>()!
    
     let metadata: [ArleeItems.ArleeItemMeta] = [] 
    for id in collectionRef.getIDs() {
        let nftRef = collectionRef.borrowArleeItem(id: id) ?? panic("couldn't borrow reference to arlee")
        metadata.append(collectionRef.getArleeItemMetadata(id: id))
    }

    return metadata
}
