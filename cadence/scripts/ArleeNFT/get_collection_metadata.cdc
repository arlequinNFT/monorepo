import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"

// This script returns the size of an account's ArleeNFT collection.

pub fun main(address: Address): [ArleeNFT.ArleeMeta] {
    // get the public account object for the token owner
    let account = getAccount(address)

    let collectionRef = account.getCapability(ArleeNFT.CollectionPublicPath)
        .borrow<&{ArleeNFT.ArleeCollectionPublic}>()!
    
     let metadata: [ArleeNFT.ArleeMeta] = [] 
    for id in collectionRef.getIDs() {
        let nftRef = collectionRef.borrowArlee(id: id) ?? panic("couldn't borrow reference to arlee")
        metadata.append(collectionRef.getArleeMetadata(id: id))
    }

    return metadata
}
