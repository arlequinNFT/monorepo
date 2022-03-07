import ArleeGenesisDrop from "../../contracts/ArleeGenesisDrop.cdc"

pub fun main() : {String:ArleeGenesisDrop.VoucherMeta} {
    let status = ArleeGenesisDrop.getSaleStatus()
    log(status)
    return status
}