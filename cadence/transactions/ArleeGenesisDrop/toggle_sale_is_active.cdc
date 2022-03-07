import ArleeGenesisDrop from "../../contracts/ArleeGenesisDrop.cdc"

transaction() {
    prepare(signer: AuthAccount) {
        let admin = signer.borrow<&ArleeGenesisDrop.Admin>(from: ArleeGenesisDrop.ArleeGenesisDropAdminStoragePath )!
        admin.toggleSaleIsActive()
    }
}