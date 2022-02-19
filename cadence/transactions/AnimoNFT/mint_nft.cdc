import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArlequinNFT from "../../contracts/ArlequinNFT.cdc"

// This script uses the NFTMinter resource to mint a new NFT
// It must be run with the account that has the minter resource
// stored in /storage/NFTMinter

transaction(recipient: Address, species: String, ipfsCID: String, originalArtist: Address) {

    // local variable for storing the minter reference
    let minter: &ArlequinNFT.NFTMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&ArlequinNFT.NFTMinter>(from: ArlequinNFT.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // Borrow the recipient's public NFT collection reference
        let receiver = getAccount(recipient)
            .getCapability(ArlequinNFT.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        // Mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(recipient: receiver, species: species, ipfsCID: ipfsCID, originalArtist: originalArtist)
    }
}
