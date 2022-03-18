import FungibleToken from "../../contracts/FungibleToken.cdc"
import Nimo from "../../contracts/Nimo.cdc"

// This transaction is a template for a transaction
// to add a Vault resource to their account
// so that they can use the Nimo

transaction {

    prepare(signer: AuthAccount) {

        if signer.borrow<&Nimo.Vault>(from: Nimo.VaultStoragePath) == nil {
            // Create a new Nimo Vault and put it in storage
            signer.save(<-Nimo.createEmptyVault(), to: Nimo.VaultStoragePath)

            // Create a public capability to the Vault that only exposes
            // the deposit function through the Receiver interface
            signer.link<&Nimo.Vault{FungibleToken.Receiver}>(
                Nimo.ReceiverPublicPath,
                target: Nimo.VaultStoragePath
            )

            // Create a public capability to the Vault that only exposes
            // the balance field through the Balance interface
            signer.link<&Nimo.Vault{FungibleToken.Balance}>(
                Nimo.BalancePublicPath,
                target: Nimo.VaultStoragePath
            )
        }
    }
}
