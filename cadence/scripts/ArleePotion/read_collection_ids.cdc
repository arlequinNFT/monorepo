import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleePotion from "../../contracts/ArleePotion.cdc"

// This transaction returns an array of all the nft ids in the collection

pub fun main(account: Address): [UInt64] {
    let collectionRef = getAccount(account)
        .getCapability(ArleePotion.CollectionPublicPath)
        .borrow<&{ArleePotion.ArleePotionCollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")

    return collectionRef.getIDs()
}
