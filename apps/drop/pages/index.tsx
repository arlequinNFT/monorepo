import Authentication from '../components/authentication/authentication.component';
import * as fcl from '@onflow/fcl';
import { useEffect, useState } from 'react';

export function Index() {
  const [packs, setPacks] = useState(null);
  useEffect(() => {
    const fn = async () => {
      const result = await fcl.query({
        cadence: `
        import ArleeGenesisDrop from 0xArlequin

        pub fun main() : {String:ArleeGenesisDrop.VoucherMeta} {
            let status = ArleeGenesisDrop.getSaleStatus()
            log(status)
            return status
        }
        `,
      });
      console.log(result);
    };

    fn();
  }, []);

  return (
    <>
      <Authentication></Authentication>
    </>
  );
}

export default Index;
