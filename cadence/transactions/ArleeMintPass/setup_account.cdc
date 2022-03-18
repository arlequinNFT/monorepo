import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeMintPass from "../../contracts/ArleeMintPass.cdc"
// This transaction is what an account would run
// to set itself up to receive NFTs

transaction {

    prepare(acct: AuthAccount) {

        // Return early if the account already has a collection
        if acct.borrow<&ArleeMintPass.Collection>(from: ArleeMintPass.CollectionStoragePath) != nil {
            return
        }

        // Create a new empty collection
        let collection <- ArleeMintPass.createEmptyCollection()

        // save it to the account
        acct.save(<-collection, to: ArleeMintPass.CollectionStoragePath)

        // create a public capability for the collection
        acct.link<&{ArleeMintPass.ArleeMintPassCollectionPublic}>(
            ArleeMintPass.CollectionPublicPath,
            target: ArleeMintPass.CollectionStoragePath
        )
    }
}
