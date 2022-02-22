import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"

// This script returns the size of an account's ArleeNFT collection.

pub fun main(address: Address): Int {
    // get the public account object for the token owner
    let account = getAccount(address)

    let collectionRef = account.getCapability(ArleeNFT.CollectionPublicPath)!
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    return collectionRef.getIDs().length
}
