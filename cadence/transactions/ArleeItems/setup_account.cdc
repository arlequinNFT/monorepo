import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeItems from "../../contracts/ArleeItems.cdc"
// This transaction is what an account would run
// to set itself up to receive NFTs

transaction {

    prepare(acct: AuthAccount) {

        // Return early if the account already has a collection
        if acct.borrow<&ArleeItems.Collection>(from: ArleeItems.CollectionStoragePath) != nil {
            return
        }

        // Create a new empty collection
        let collection <- ArleeItems.createEmptyCollection()

        // save it to the account
        acct.save(<-collection, to: ArleeItems.CollectionStoragePath)

        // create a public capability for the collection
        acct.link<&{ArleeItems.ArleeItemsCollectionPublic}>(
            ArleeItems.CollectionPublicPath,
            target: ArleeItems.CollectionStoragePath
        )
    }
}
