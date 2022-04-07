export const GET_USER_ARLEE_SCENE_NFTS = `
  import Arlequin from 0xArlequin
  import ArleeScene from 0xArlequin

  pub fun main(addr: Address) : [&ArleeScene.NFT]? {
      let collectionCap = getAccount(addr).getCapability<&ArleeScene.Collection{ArleeScene.CollectionPublic}>(ArleeScene.CollectionPublicPath)
      if collectionCap.borrow() == nil {return nil}
      let collectionRef = collectionCap.borrow()!

      let ids = Arlequin.getArleeSceneNFTIDs(addr: addr)!
      var list : [&ArleeScene.NFT] = []
      for id in ids {
          list.append(collectionRef.borrowArleeScene(id:id)!)
      }

      return list
  }
`;
