import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArleeMintPass from "../../contracts/ArleeMintPass.cdc"

// This transaction returns a UInt64 

pub fun main(): UInt64 {
    return ArleeMintPass.totalSupply
}
