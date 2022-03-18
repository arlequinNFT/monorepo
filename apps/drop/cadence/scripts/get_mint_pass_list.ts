export const GET_MINT_PASS_LIST = `
  import ArleeGenesisDrop from 0xArlequin

  pub fun main() : {String:ArleeGenesisDrop.VoucherMeta} {
      let status = ArleeGenesisDrop.getSaleStatus()
      log(status)
      return status
  }`;
