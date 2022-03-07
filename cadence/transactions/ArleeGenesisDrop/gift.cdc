// This transaction withdraws FUSD from users account and sends to presale contract to purchase Arlees

import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeNFT from "../../contracts/ArleeNFT.cdc"
import ArleeMintPass from "../../contracts/ArleeMintPass.cdc"
import ArleeGenesisDrop from "../../contracts/ArleeGenesisDrop.cdc"
import FUSD from "../../contracts/FUSD.cdc"

// import FungibleToken from "../../contracts/FungibleToken.cdc"

transaction(toAddress: Address, species: String ) {
    // The Vault resource that holds the tokens being transferred
    let adminRef: &ArleeGenesisDrop.Admin

    prepare(signer: AuthAccount) {
        self.adminRef = signer.borrow<&ArleeGenesisDrop.Admin>(from: ArleeGenesisDrop.ArleeGenesisDropAdminStoragePath )!    
    }

    execute {
        let account = getAccount(toAddress) 
        let mpReceiverCap = account.getCapability<&AnyResource{ArleeMintPass.ArleeMintPassCollectionPublic}>(ArleeMintPass.CollectionPublicPath) 

        // Deposit the withdrawn tokens in the presale account 
        self.adminRef.giftMintPass(species: species, mpReceiverCap: mpReceiverCap)
    }
}