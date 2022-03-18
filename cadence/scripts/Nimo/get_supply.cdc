import Nimo from "../../contracts/Nimo.cdc"

// This script returns the total amount of Nimo currently in existence.

pub fun main(): UFix64 {

    let supply = Nimo.totalSupply

    log(supply)

    return supply
}
