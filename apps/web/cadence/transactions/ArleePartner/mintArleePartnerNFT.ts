export const MINT_ARLEE_PARTNER_NFT = `
  import MetadataViews from 0xMetadataViews
  import NonFungibleToken from 0xNonFungibleToken
  import FungibleToken from 0xFungibleToken
  import FlowToken from 0xFlowToken
  import Arlequin from 0xArlequin
  import ArleeScene from 0xArlequin
  import ArleePartner from 0xArlequin

  transaction(partner: String) {

      let payerVaultRef : &FlowToken.Vault

      prepare(acct: AuthAccount) {
          //acct setup
          if acct.borrow<&ArleePartner.Collection>(from: ArleePartner.CollectionStoragePath) == nil {
              acct.save(<- ArleePartner.createEmptyCollection(), to: ArleePartner.CollectionStoragePath)
              acct.link<&ArleePartner.Collection{ArleePartner.CollectionPublic, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>
                  (ArleePartner.CollectionPublicPath, target:ArleePartner.CollectionStoragePath)
          }

          if acct.borrow<&ArleeScene.Collection>(from: ArleeScene.CollectionStoragePath) == nil {
              acct.save(<- ArleeScene.createEmptyCollection(), to: ArleeScene.CollectionStoragePath)
              acct.link<&ArleeScene.Collection{ArleeScene.CollectionPublic, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>
                  (ArleeScene.CollectionPublicPath, target:ArleeScene.CollectionStoragePath)
          }

          // prepare payer vault
          self.payerVaultRef = acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
              ?? panic("Cannot find the flow token vault")

      }

      execute {
          // get the price of the mint
          let price = Arlequin.getArleePartnerMintPrice()

          // prepare for payment
          let paymentVault <- self.payerVaultRef.withdraw(amount: price )
          let buyerAddr = self.payerVaultRef.owner!.address

          Arlequin.mintArleePartnerNFT(buyer: buyerAddr, partner: partner, paymentVault: <- paymentVault)

      }

  }
`;
