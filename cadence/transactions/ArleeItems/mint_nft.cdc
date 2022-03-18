import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeItems from "../../contracts/ArleeItems.cdc"

// For minting winners NFTs and runners up for the pool

// This script uses the NFTMinter resource to mint a new NFT
// It must be run with the account that has the minter resource
// stored in /storage/NFTMinter

transaction(recipient: Address, name: String, description: String, ipfsCID: String) {

    // local variable for storing the minter reference
    let minter: &ArleeItems.NFTMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&ArleeItems.NFTMinter>(from: ArleeItems.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // Borrow the recipient's public NFT collection reference
        let account = getAccount(recipient)
        let cap = account.getCapability(ArleeItems.CollectionPublicPath)
        let receiver = cap.borrow<&{ArleeItems.ArleeItemsCollectionPublic}>()!

        // Mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(recipient: receiver, name: name, description: description, ipfsCID: "0x123")
    }
}
