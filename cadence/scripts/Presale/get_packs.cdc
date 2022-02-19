import ArlequinPresale from "../../contracts/ArlequinPresale.cdc"

pub fun main() : {String:ArlequinPresale.PackDetails} {
    let status = ArlequinPresale.getSaleStatus()
    log(status)
    return status
}