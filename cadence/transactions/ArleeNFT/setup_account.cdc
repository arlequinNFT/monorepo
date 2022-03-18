import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"
// This transaction is what an account would run
// to set itself up to receive NFTs

transaction {

    prepare(acct: AuthAccount) {

        // Return early if the account already has a collection
        if acct.borrow<&ArleeNFT.Collection>(from: ArleeNFT.CollectionStoragePath) != nil {
            return
        }

        // Create a new empty collection
        let collection <- ArleeNFT.createEmptyCollection()

        // save it to the account
        acct.save(<-collection, to: ArleeNFT.CollectionStoragePath)

        // create a public capability for the collection
        acct.link<&{ArleeNFT.ArleeCollectionPublic}>(
            ArleeNFT.CollectionPublicPath,
            target: ArleeNFT.CollectionStoragePath
        )
    }
}
