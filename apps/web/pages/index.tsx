import Footer from '../components/footer/footer.component';
import Header from '../components/header/header.component';
import Intro from '../components/intro/intro.component';

export function Index() {
  return (
    <>
      <div className="bg-clouds bg-fixed bg-cover h-screen flex flex-col">
        <Header></Header>
        <Intro></Intro>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Index;
