import Footer from '@components/footer/footer.component';
import Header from '@components/header/header.component';
import Intro from '@components/intro/intro.component';
import Roadmap from '@components/roadmap/roadmap.component';
import Team from '@components/team/team.component';
import WhatIsArlequinMobile from '@components/what-is-arlequin-mobile/what-is-arlequin-mobile.component';
import WhatIsArlequin from '@components/what-is-arlequin/what-is-arlequin.component';

export function Index() {
  return (
    <>
      <div className="bg-clouds bg-fixed bg-cover">
        <Header></Header>
        <Intro></Intro>
      </div>

      <div className="bg-bubbles bg-cover">
        <div className="hidden lg:block">
          <WhatIsArlequin></WhatIsArlequin>
        </div>
        <div className="block lg:hidden">
          <WhatIsArlequinMobile></WhatIsArlequinMobile>
        </div>
      </div>

      <Roadmap></Roadmap>

      <Team></Team>

      <div className="bg-clouds bg-fixed bg-cover">
        <Footer></Footer>
      </div>
    </>
  );
}

export default Index;
