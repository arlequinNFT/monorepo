export const SET_ARLEE_SCENE_MINT_PRICE = `
import Arlequin from 0xArlequin

transaction(price: UFix64) {

    let arleeSceneAdmin : &Arlequin.ArleeSceneAdmin

    prepare(acct: AuthAccount) {
        self.arleeSceneAdmin = acct.borrow<&Arlequin.ArleeSceneAdmin>(from: Arlequin.ArleeSceneAdminStoragePath)
            ?? panic (" Cannot borrow reference to ArleeScene Admin")
    }

    execute {
        self.arleeSceneAdmin.setArleeSceneMintPrice(price: price)
    }

}
`;
