import ArlequinPresale from "../../contracts/ArlequinPresale.cdc"

pub fun main() : {Address:Bool} {
    let queue = ArlequinPresale.getQueue()
    log(queue)
    return queue
}