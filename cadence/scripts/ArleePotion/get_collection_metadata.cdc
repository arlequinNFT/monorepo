import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleePotion from "../../contracts/ArleePotion.cdc"

// This script returns the size of an account's ArleePotion collection.

pub fun main(address: Address): [ArleePotion.ArleePotionMeta] {
    // get the public account object for the token owner
    let account = getAccount(address)

    let collectionRef = account.getCapability(ArleePotion.CollectionPublicPath)
        .borrow<&{ArleePotion.ArleePotionCollectionPublic}>()!
    
     let metadata: [ArleePotion.ArleePotionMeta] = [] 
    for id in collectionRef.getIDs() {
        let nftRef = collectionRef.borrowArleePotion(id: id) ?? panic("couldn't borrow reference to arlee")
        metadata.append(collectionRef.getArleePotionMetadata(id: id))
    }

    return metadata
}
