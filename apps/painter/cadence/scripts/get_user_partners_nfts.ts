export const GET_USER_PARTNERS_NFTS = `
  import Arlequin from 0xArlequin
  import ArleePartner from 0xArlequin

  pub fun main(addr: Address) : [&ArleePartner.NFT]? {
      let collectionCap = getAccount(addr).getCapability<&ArleePartner.Collection{ArleePartner.CollectionPublic}>(ArleePartner.CollectionPublicPath)
      if collectionCap.borrow() == nil {return nil}
      let collectionRef = collectionCap.borrow()!

      let ids = Arlequin.getArleePartnerNFTIDs(addr: addr)!
      var list : [&ArleePartner.NFT] = []
      for id in ids {
          list.append(collectionRef.borrowArleePartner(id:id)!)
      }

      return list
  }

`;
