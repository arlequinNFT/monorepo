import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"

// This script uses the NFTMinter resource to mint a new NFT
// It must be run with the account that has the minter resource
// stored in /storage/NFTMinter

transaction(recipient: Address, species: String, ipfsCID: String, originalArtist: Address, name: String, description: String) {

    // local variable for storing the minter reference
    let minter: &ArleeNFT.NFTMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&ArleeNFT.NFTMinter>(from: ArleeNFT.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // Borrow the recipient's public NFT collection reference
        let receiver = getAccount(recipient)
            .getCapability(ArleeNFT.CollectionPublicPath)
            .borrow<&{ArleeNFT.ArleeCollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        // Mint the NFT and deposit it to the recipient's collection
        
        self.minter.mintNFTWithSkin(recipient: receiver, species: species, originalArtist: recipient, ipfsCID: ipfsCID, name: name, description: description)
    }
}
