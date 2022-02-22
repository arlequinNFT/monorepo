import ArleePresale from "../../contracts/ArleePresale.cdc"

transaction() {
    prepare(signer: AuthAccount) {
        let admin = signer.borrow<&ArleePresale.Admin>(from: ArleePresale.ArleePresaleAdminStoragePath )!
        admin.activateSale()
    }
}