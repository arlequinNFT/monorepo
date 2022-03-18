import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeMintPass from "../../contracts/ArleeMintPass.cdc"

// This transaction returns an array of all the nft ids in the collection

pub fun main(account: Address): [UInt64] {
    let collectionRef = getAccount(account)
        .getCapability(ArleeMintPass.CollectionPublicPath)
        .borrow<&{ArleeMintPass.ArleeMintPassCollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")

    return collectionRef.getIDs()
}
