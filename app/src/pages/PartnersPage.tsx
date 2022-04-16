import React from 'react';


import { Alignment, Direction, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { PartnersView } from '../components/PartnersView';

export const PartnersPage = (): React.ReactElement => {
  const partners = [
    {
      imageUrl: '/assets/mdtp.png',
      type: 'NFT',
      title: 'MillionDollarTokenPage',
      description: 'The homepage of the metaverse. Mint an NFT and customise the space you own to show off what you love most.',
    },
    {
      imageUrl: '/assets/mc.png',
      type: 'ALPHA GROUP',
      title: 'Mint Calendar',
      description: 'Access to perks such as WL opportunities from future bluechips, community events, skillshare\'s and community information sharing.',
    },
    // {
    //   imageUrl: '/assets/cameopass.png',
    //   type: 'IRL EVENTS',
    //   title: 'Cameo Pass',
    //   description: 'Access to Cameo in the metaverse, along with exclusive art from Burnt Toast, Vinnie Hager, and Luke McGarry.',
    // },
  ];

  return (
    <Stack direction={Direction.Vertical} isFullWidth={true} childAlignment={Alignment.Fill} shouldAddGutters={true}>
      <Text variant='header2' alignment={TextAlignment.Center}>Our Partners</Text>
      <Spacing variant={PaddingSize.Wide} />
      {partners.map((partner, index: number) : React.ReactElement => (
        <PartnersView
          key={index}
          imageUrl={partner.imageUrl}
          title={partner.title}
          description={partner.description}
          type={partner.type}
        />
      ))}
    </Stack>
  );
};
