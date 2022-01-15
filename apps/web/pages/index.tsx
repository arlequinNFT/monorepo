import Faq from '@components/faq/faq.component';
import Footer from '@components/footer/footer.component';
import Header from '@components/header/header.component';
import Intro from '@components/intro/intro.component';
import Roadmap from '@components/roadmap/roadmap.component';
import Team from '@components/team/team.component';
import WhatIsArlequin from '@components/what-is-arlequin/what-is-arlequin.component';

export function Index() {
  return (
    <>
      <div className="bg-clouds bg-fixed bg-cover">
        <Header></Header>
        <Intro></Intro>
      </div>

      <div className="bg-bubbles bg-cover">
        <WhatIsArlequin></WhatIsArlequin>
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
