import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import ArlequinNFT from "../../contracts/ArlequinNFT.cdc"

// This transaction returns a UInt64 

pub fun main(): UInt64 {
    return ArlequinNFT.totalSupply
}
