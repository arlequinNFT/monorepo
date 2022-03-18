import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeMintPass from "../../contracts/ArleeMintPass.cdc"

// This should never be needed....

// This script uses the NFTMinter resource to mint a new NFT
// It must be run with the account that has the minter resource
// stored in /storage/NFTMinter

transaction(recipient: Address, name: String, species: String, ipfsCID: String) {

    // local variable for storing the minter reference
    let minter: &ArleeMintPass.NFTMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&ArleeMintPass.NFTMinter>(from: ArleeMintPass.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // Borrow the recipient's public NFT collection reference
        let account = getAccount(recipient)
        let cap = account.getCapability(ArleeMintPass.CollectionPublicPath)
        let receiver = cap.borrow<&{ArleeMintPass.ArleeMintPassCollectionPublic}>()!

        // Mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(recipient: receiver, species: species, ipfsCID: ipfsCID)
    }
}
