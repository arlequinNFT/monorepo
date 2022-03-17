import ArleeGenesisDrop from "../../contracts/ArleeGenesisDrop.cdc"

transaction(addresses: [Address]) {
    prepare(signer: AuthAccount) {
        let admin = signer.borrow<&ArleeGenesisDrop.Admin>(from: ArleeGenesisDrop.ArleeGenesisDropAdminStoragePath )!
        admin.appendToWhitelist(addresses: addresses)
    }
}