import ArlequinPresale from "../../contracts/ArlequinPresale.cdc"

transaction() {
    prepare(signer: AuthAccount) {
        let admin = signer.borrow<&ArlequinPresale.Admin>(from: ArlequinPresale.ArlequinPresaleAdminStoragePath )!
        admin.activateSale()
    }
}