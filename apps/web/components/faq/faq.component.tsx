import React from 'react';
import { useInView } from 'react-intersection-observer';

import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table';

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
            <Table className="w-full border bg-white">
              <Thead>
                <Tr className="border-b">
                  <Th>Ranking</Th>
                  <Th>FUSD</Th>
                  <Th>
                    Submission minted and <br /> send to collection
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr className="border-b">
                  <Td>Winner</Td>
                  <Td>$150</Td>
                  <Td>Yes</Td>
                </Tr>
                <Tr className="border-b">
                  <Td>2nd</Td>
                  <Td>$110</Td>
                  <Td>Yes</Td>
                </Tr>
                <Tr className="border-b">
                  <Td>3rd</Td>
                  <Td>$70</Td>
                  <Td>Yes</Td>
                </Tr>
                <Tr className="border-b">
                  <Td>4th</Td>
                  <Td>$40</Td>
                  <Td>No</Td>
                </Tr>
                <Tr className="border-b">
                  <Td>5th</Td>
                  <Td>$20</Td>
                  <Td>No</Td>
                </Tr>
              </Tbody>
            </Table>

            {/* <ul>
              <ol>
                Winner: $150 + her or his submissions minted as NFTs and send to
                her or his collection
              </ol>
              <ol>2nd: $110</ol>
              <ol>3rd: $70</ol>
              <ol>4th: $40</ol>
              <ol>5th: $20</ol>
            </ul> */}
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
              Owning Arlees grants you of Voting Points. <br /> You can
              distribute them to your preferred entries in a secured and fair
              way. <br />
              Each vote distributed grants you some Nimo.
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
              When a painting contest finishes, the top 30% submissions (except
              the top 3) are send to the pool. <br />
              Anyone can buy (at a fixed price in FUSD) an Arlee from that pool
              in a random way: the buyer does not know what look, species or
              ranking the Arlee will be. <br />
              80% of the revenue are send to the Original Artist. It means that
              even if you did not reach the top 5, you will eventually earn
              money!
            </p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton className="justify-center">
              <p className="text-4xl my-2">Is Nimo a fungible token?</p>
            </AccordionButton>
          </h2>
          <AccordionPanel className="max-w-5xl text-center text-2xl mb-4">
            <p>
              At the moment, Nimo is an in-game asset and is not intended to
              be a fungible token. As we don't want to offer unfair gameplay to
              the community, we decided to kept Nimo as in-game currency and focus the economy around NFTs.
            </p>
            <p>
              Nimo are spend in the shop or by leveling up your Arlees. Each
              time an Arlee levels up, he gains more Voting Points and one new
              Painting Slot.
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
            <ul>
              <li>Pig pack: 1 Pig + 1 cosmetic item + Nimo</li>
              <li>Deer pack: 1 Deer + 2 cosmetic items + Nimo</li>
              <li>Shiba Inu pack: 1 Shiba Inu + 3 cosmetic items + Nimo</li>
            </ul>

            <p className="mt-2">
              The number of packs and the prices will be communicate few days
              before the drop.
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
