export const GET_ALL_PARTNERS_MINTABLE = `
  import Arlequin from 0xArlequin

  pub fun main() : {String : Bool} {
      return Arlequin.getArleePartnerMintable()
  }
`;
