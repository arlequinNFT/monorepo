export const GET_VAULT_BALANCE = `
  import FungibleToken from 0xFungibleToken
  import FUSD from "../../contracts/FUSD.cdc"
  import ArleeGenesisDrop from 0xArlequin

  pub fun main(address: Address): UFix64 {
      let account = getAccount(address)
      let vaultRef = account.getCapability(ArleeGenesisDrop.PresaleVaultBalancePublicPath).borrow<&FUSD.Vault{FungibleToken.Balance}>()
          ?? panic("Could not borrow Balance reference to the Vault")

      return vaultRef.balance
  } `;
