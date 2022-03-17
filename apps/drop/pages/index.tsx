import Authentication from '../components/authentication/authentication.component';
import * as fcl from '@onflow/fcl';
import { useEffect, useState } from 'react';
import { GET_MINT_PASS_LIST } from '../cadence/scripts';

export function Index() {
  const [packs, setPacks] = useState(null);
  useEffect(() => {
    const getMintPassList = async () => {
      const mintPassList = await fcl.query({
        cadence: GET_MINT_PASS_LIST,
      });
      console.log(mintPassList);
    };

    getMintPassList();
  }, []);

  return (
    <>
      <Authentication></Authentication>
    </>
  );
}

export default Index;
