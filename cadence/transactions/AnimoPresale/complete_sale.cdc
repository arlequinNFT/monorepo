import ArlequinPresale from "../../contracts/ArlequinPresale.cdc"

transaction(address: Address) {
    prepare(signer: AuthAccount) {
        let admin = signer.borrow<&ArlequinPresale.Admin>(from: ArlequinPresale.ArlequinPresaleAdminStoragePath )!
        admin.purchaseComplete(userAddress: address)
    }
}