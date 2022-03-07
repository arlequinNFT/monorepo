import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"

// For minting winners NFTs and runners up for the pool

// This script uses the NFTMinter resource to mint a new NFT
// It must be run with the account that has the minter resource
// stored in /storage/NFTMinter

transaction(recipient: Address, species: String, ipfsCID: String, originalArtist: Address, name: String, description: String, wardrobeSize:UInt64, maxNameChange: UInt64, points: UInt64, level: UInt64) {

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
        // self.minter.mintNFT(recipient: receiver, species: species, originalArtist: originalArtist)
        self.minter.mintNFT(recipient: receiver, species: species, originalArtist: originalArtist, ipfsCID: ipfsCID, name: name, description: description, 
            wardrobeSize: wardrobeSize, maxNameChange: maxNameChange, points: points, level: level)
    }
}
