import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleePotion from "../../contracts/ArleePotion.cdc"

// For minting potion NFTs

// This script uses the NFTMinter resource to mint a new NFT
// It must be run with the account that has the minter resource
// stored in /storage/NFTMinter

transaction(recipient: Address, name: String, amount: UInt64, ipfsCID: String) {

    // local variable for storing the minter reference
    let minter: &ArleePotion.NFTMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&ArleePotion.NFTMinter>(from: ArleePotion.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // Borrow the recipient's public NFT collection reference
        let account = getAccount(recipient)
        let cap = account.getCapability(ArleePotion.CollectionPublicPath)
        let receiver = cap.borrow<&{ArleePotion.ArleePotionCollectionPublic}>()!

        // Mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(recipient: receiver, name: name, amount: amount, ipfsCID: ipfsCID)
    }
}
