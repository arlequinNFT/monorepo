export const MINT_ARLEE_SCENE_NFT = `
import MetadataViews from 0xMetadataViews
import NonFungibleToken 0xNonFungibleToken
import Arlequin 0xArlequin
import ArleeScene 0xArleeScene
import FlowToken 0xFlowToken

transaction(cid: String, description: String) {

    let payerVaultRef : &FlowToken.Vault

    prepare(acct: AuthAccount) {
        //acct setup
        let sceneNFTStoragePath = ArleeScene.CollectionStoragePath
        let sceneNFTPublicPath = ArleeScene.CollectionPublicPath

        if acct.borrow<&ArleeScene.Collection>(from: sceneNFTStoragePath) == nil {
            acct.save(<- ArleeScene.createEmptyCollection(), to: sceneNFTStoragePath)
            acct.link<&{ArleeScene.CollectionPublic, NonFungibleToken.CollectionPublic, MetadataViews.Resolver}>
                (ArleeScene.CollectionPublicPath, target:ArleeScene.CollectionStoragePath)
        }

        // prepare payer vault
        self.payerVaultRef = acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Cannot find the flow token vault")

    }

    execute {
        // get the price of the mint
        let price = Arlequin.getArleeSceneMintPrice()

        // prepare for payment
        let paymentVault <- self.payerVaultRef.withdraw(amount: price )
        let buyerAddr = self.payerVaultRef.owner!.address

        Arlequin.mintSceneNFT(buyer: buyerAddr, cid: cid, description: description, paymentVault: <- paymentVault)

    }

}
`;
