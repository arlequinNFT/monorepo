import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArlequinNFT from "../../contracts/ArlequinNFT.cdc"

// This transaction returns an array of all the nft ids in the collection

pub fun main(account: Address): [UInt64] {
    let collectionRef = getAccount(account)
        .getCapability(ArlequinNFT.CollectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")

    return collectionRef.getIDs()
}
