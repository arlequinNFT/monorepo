import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeItems from "../../contracts/ArleeItems.cdc"

// This transaction returns an array of all the nft ids in the collection

pub fun main(account: Address): [UInt64] {
    let collectionRef = getAccount(account)
        .getCapability(ArleeItems.CollectionPublicPath)
        .borrow<&{ArleeItems.ArleeItemsCollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")

    return collectionRef.getIDs()
}
