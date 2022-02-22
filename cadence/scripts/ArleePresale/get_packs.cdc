import ArleePresale from "../../contracts/ArleePresale.cdc"

pub fun main() : {String:ArleePresale.PackDetails} {
    let status = ArleePresale.getSaleStatus()
    log(status)
    return status
}