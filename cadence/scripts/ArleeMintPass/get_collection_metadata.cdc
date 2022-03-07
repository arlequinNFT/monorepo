import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeMintPass from "../../contracts/ArleeMintPass.cdc"
import MetadataViews from "../../contracts/MetadataViews.cdc"

// This script returns the size of an account's ArleeMintPass collection.

pub fun main(address: Address): [AnyStruct] {
    // get the public account object for the token owner
    let account = getAccount(address)

    let collectionRef = account.getCapability(ArleeMintPass.CollectionPublicPath)
        .borrow<&{ArleeMintPass.ArleeMintPassCollectionPublic}>()!
    
     let metadata: [AnyStruct] = [] 
    for id in collectionRef.getIDs() {
        let mpRef = collectionRef.borrowArleeMintPass(id: id) ?? panic("couldn't borrow reference to arlee")
        metadata.append(mpRef.resolveView(Type<MetadataViews.Display>()))
    }

    return metadata
}
