import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleePotion from "../../contracts/ArleePotion.cdc"
// This transaction is what an account would run
// to set itself up to receive NFTs

transaction {

    prepare(acct: AuthAccount) {

        // Return early if the account already has a collection
        if acct.borrow<&ArleePotion.Collection>(from: ArleePotion.CollectionStoragePath) != nil {
            return
        }

        // Create a new empty collection
        let collection <- ArleePotion.createEmptyCollection()

        // save it to the account
        acct.save(<-collection, to: ArleePotion.CollectionStoragePath)

        // create a public capability for the collection
        acct.link<&{ArleePotion.ArleePotionCollectionPublic}>(
            ArleePotion.CollectionPublicPath,
            target: ArleePotion.CollectionStoragePath
        )
    }
}
