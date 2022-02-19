import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArlequinNFT from "../../contracts/ArlequinNFT.cdc"
// This transaction is what an account would run
// to set itself up to receive NFTs

transaction {

    prepare(acct: AuthAccount) {

        // Return early if the account already has a collection
        if acct.borrow<&ArlequinNFT.Collection>(from: ArlequinNFT.CollectionStoragePath) != nil {
            return
        }

        // Create a new empty collection
        let collection <- ArlequinNFT.createEmptyCollection()

        // save it to the account
        acct.save(<-collection, to: ArlequinNFT.CollectionStoragePath)

        // create a public capability for the collection
        acct.link<&{NonFungibleToken.CollectionPublic, ArlequinNFT.CollectionPublic}>(
            ArlequinNFT.CollectionPublicPath,
            target: ArlequinNFT.CollectionStoragePath
        )
    }
}
