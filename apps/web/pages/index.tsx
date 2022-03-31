import Faq from '../components/faq/faq.component';
import Footer from '../components/footer/footer.component';
import Header from '../components/header/header.component';
import ScratchMe from 'react-scratch-me';
import Intro from '../components/intro/intro.component';
import Roadmap from '../components/roadmap/roadmap.component';
import Team from '../components/team/team.component';
import WhatIsArlequinMobile from '../components/what-is-arlequin-mobile/what-is-arlequin-mobile.component';
import WhatIsArlequin from '../components/what-is-arlequin/what-is-arlequin.component';

export function Index() {
  return (
    <>
      <div className="bg-clouds bg-fixed bg-cover h-screen">
        <Header></Header>
        {/* <Intro></Intro> */}
        <ScratchMe
          width={800}
          height={600}
          foregroundImageSrc={'/images/white.png'}
          backgroundImageSrc={'/images/colored.png'}
          strokeWidth={20}
          onProgress={(percent) => console.log(`${percent}% cleared`)}
          onCompleted={() => console.log(`Scratch Card Completed!`)}
          completedAt={30}
        />
      </div>

      {/* <div className="bg-bubbles bg-cover">
        <div className="hidden lg:block">
          <WhatIsArlequin></WhatIsArlequin>
        </div>
        <div className="block lg:hidden">
          <WhatIsArlequinMobile></WhatIsArlequinMobile>
        </div>
      </div>

      <Roadmap></Roadmap>

      <Team></Team>

      <div className="bg-bubbles bg-cover">
        <Faq></Faq>
      </div>

      <div className="bg-clouds bg-fixed bg-cover">
        <Footer></Footer>
      </div> */}
    </>
  );
}

export default Index;
