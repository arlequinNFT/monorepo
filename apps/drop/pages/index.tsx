import Authentication from '../components/authentication/authentication.component';
import * as fcl from '@onflow/fcl';
import { useEffect, useState } from 'react';
import { GET_MINT_PASS_LIST, GET_VAULT_BALANCE } from '../cadence/scripts';
import { useAppSelector } from '../store/hook';
import { PURCHASE_MINT_PASS } from '../cadence/transactions';

export function Index() {
  const [packs, setPacks] = useState(null);

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const getMintPassList = async () => {
      const mintPassList = await fcl.query({
        cadence: GET_MINT_PASS_LIST,
      });
      console.log(mintPassList);
    };

    getMintPassList();
  }, []);

  // useEffect(() => {
  //   const getBalance = async () => {
  //     const vaultBalance = await fcl.query({
  //       cadence: GET_VAULT_BALANCE,
  //       args: (arg, t) => [arg('0x3ae40570bbfa50c5', t.Address)],
  //     });
  //     console.log(vaultBalance);
  //   };

  //   getBalance();
  // }, []);

  const balance = async () => {
    const vaultBalance = await fcl.query({
      cadence: GET_VAULT_BALANCE,
      args: (arg, t) => [arg('0x3ae40570bbfa50c5', t.Address)],
    });
    console.log(vaultBalance);
  };

  const purchase = async () => {
    const purchaseStuff = await fcl.mutate({
      cadence: PURCHASE_MINT_PASS,
      // args: (arg, t) => [arg('0x3ae40570bbfa50c5', t.Address)],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 50,
    });
    const transaction = await fcl.tx(purchaseStuff).onceSealed();
    console.log(transaction);
  };

  return (
    <>
      <Authentication></Authentication>
      <div>
        <button onClick={purchase}>Purchase mint</button>
      </div>
      <div>
        <button onClick={balance}>Get Balance</button>
      </div>
    </>
  );
}

export default Index;
