// This transaction Gifts a mint pass of the species designated to the address passed. 

import ArleeGenesisDrop from "../../contracts/ArleeGenesisDrop.cdc"
import ArleeMintPass from "../../contracts/ArleeMintPass.cdc"

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