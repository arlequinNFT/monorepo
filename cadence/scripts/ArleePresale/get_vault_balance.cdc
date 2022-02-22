import FungibleToken from "../../contracts/FungibleToken.cdc"
import FUSD from "../../contracts/FUSD.cdc"
import ArleePresale from "../../contracts/ArleePresale.cdc"

pub fun main(address: Address): UFix64 {
    let account = getAccount(address)
    let vaultRef = account.getCapability(ArleePresale.PresaleVaultBalancePublicPath)!.borrow<&FUSD.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance 
} 