export const SET_ARLEE_SCENE_MINTABLE = `
  import Arlequin from 0xArlequin

  transaction(mintable: Bool) {

      let arleeSceneAdmin : &Arlequin.ArleeSceneAdmin

      prepare(acct: AuthAccount) {
          self.arleeSceneAdmin = acct.borrow<&Arlequin.ArleeSceneAdmin>(from: Arlequin.ArleeSceneAdminStoragePath)
              ?? panic (" Cannot borrow reference to ArleeScene Admin")
      }

      execute {
          self.arleeSceneAdmin.setMintable(mintable: mintable)
      }

  }
`;
