import React from 'react';
import { useInView } from 'react-intersection-observer';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';

const Faq = () => {
  const { ref, inView } = useInView({});

  return (
    <section
      ref={ref}
      className={`${
        inView
          ? 'lg:duration-1000 lg:translate-y-0 lg:opacity-100 lg:transition-all'
          : 'lg:translate-y-10 lg:opacity-0 lg:duration-500 lg:transition-all'
      } flex items-center flex-col max-w-7xl mx-auto py-12 px-6`}
    >
      <p className="mb-8 text-7xl text-purple font-bold">Faq</p>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton className="justify-center">
              <p className="text-4xl my-2">
                What can I win by participating to Painting Contests?
              </p>
            </AccordionButton>
          </h2>
          <AccordionPanel className="max-w-5xl text-center text-2xl mb-4">
            <p>
              Top 5 are rewarded with $FLOW and Top 3 get their entries minted
              as NFTs and send to their collection.
            </p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton className="justify-center">
              <p className="text-4xl my-2">
                How does voting during painting contests work?
              </p>
            </AccordionButton>
          </h2>
          <AccordionPanel className="max-w-5xl text-center text-2xl mb-4">
            <p>
              In order to vote, you have to own at least one Arlee. They also
              act as utility NFTs.
              <br />
              Each Arlee gives you a number of votes to distribute among your
              preferred entries in a secured and fair way.
              <br />
              At the end of each contest, you get credited with $NIMO depending
              on how many votes you distributed
            </p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton className="justify-center">
              <p className="text-4xl my-2">How does The Pool work?</p>
            </AccordionButton>
          </h2>
          <AccordionPanel className="max-w-5xl text-center text-2xl mb-4">
            <p>
              When a painting contest finishes, the top 30% submissions are send
              to the pool. <br />
              Anyone can buy (at a fixed price in $FLOW) an Arlee from that pool
              in a random way: the buyer does not know what look, species or
              ranking the Arlee will be. <br />
              80% of the revenue are send to the Original Artist. It means that
              even if you did not reach the top 5, you will eventually earn
              $FLOW!
            </p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton className="justify-center">
              <p className="text-4xl my-2">What can I do with $NIMO?</p>
            </AccordionButton>
          </h2>
          <AccordionPanel className="max-w-5xl text-center text-2xl mb-4">
            <p>
              You can buy in-game items such as Arlees accessories, poses,
              backgrounds... <br />
              You can also level up your Arlees!
            </p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton className="justify-center">
              <p className="text-4xl my-2">
                What will be sold during Genesis Drop?
              </p>
            </AccordionButton>
          </h2>
          <AccordionPanel className="max-w-5xl text-center text-2xl mb-4">
            <p>
              We will be selling packs containing Arlees. <br />
              These Arlee species won't be accessible ever again in Arlequin
              except by trading with users in the marketplace
            </p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton className="justify-center">
              <p className="text-4xl my-2">Will there be a private presale?</p>
            </AccordionButton>
          </h2>
          <AccordionPanel className="max-w-5xl text-center text-2xl mb-4">
            <p>
              Yep! Whitelisting will be given through giveaways and promotions.
            </p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton className="justify-center">
              <p className="text-4xl my-2">
                Which animal charities will you pick?
              </p>
            </AccordionButton>
          </h2>
          <AccordionPanel className="max-w-5xl text-center text-2xl mb-4">
            <p>
              We are working on gathering a set of the most efficient animal
              charities. Every informations and data will be made public for
              everyone to see!
            </p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton className="justify-center">
              <p className="text-4xl my-2">What blockchain are you using?</p>
            </AccordionButton>
          </h2>
          <AccordionPanel className="max-w-5xl text-center text-2xl mb-4">
            <p>
              Arlequin is powered by Flow Blockchain, a secured, fast and clean
              blockchain created by Dappers Labs.
            </p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
export default Faq;
