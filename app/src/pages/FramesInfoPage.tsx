import React from 'react';

import { Alignment, Direction, Markdown, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

const CONTENT = `
**"What are frames?", I hear you ask.**

Frames are the perfect way for DAO members, alpha-group members and NFT communities to show their allegiance to the cause without replacing their whole profile picture

You can read about why we created frames and how we plan to grow them [on our blog](https://blog.milliondollartokenpage.com/frames).

### Cool, so how do you get a frame for your community?

**TL;DR**: All you have to do is add a field called \`frameImage\` to your metadata.
[Here's ours for example]().

Okay, so if you want the longer version (it's still only about an hour total of work), here we go:

**1. Confirm your NFT is on Mainnet Ethereum.**

At this time PFPKit only supports Mainnet Ethereum NFTs.
We'd love to support more over time so if you wanna help us out, [get in touch](mailto:hello@milliondollartokenpage.com?cc=arthur@kibalabs.com;krishan@kibalabs.com&subject=I%20want%20to%20use%20Frames%20with%20a%20non-eth%20project).
Or feel free to fork PFPKit and build your own!

**2. Design a frame**

Technically this can be any square image with some transparency.
We think circular frames work best, but it's totally up to you.

Here are some example frames we really like:

![Frames images](/assets/framed-nfts.png)

**3. Host your frame somewhere**

We need to get a URI that's publicly accessible for your frame's image.

We suggest using (NFT Storage by Protocol Labs)[https://nft.storage], it's decentralised and so easy to use!

You could of course use any image hosting service at all as long as you get a URI back.

**4. Update your NFT metadata**

This is easy.
You will have created a JSON metadata file when you created your NFT.
It will have had things like \`name\`, \`description\`, and \`image\`.
All we're gonna do is add another field called \`frameImage\` with the value set to the URL from step 3.

If you have an ERC-721 NFT then you can actually give each NFT a different frame. As an example [here's ours from MDTP](https://ipfs.io/ipfs/QmZbMDBzhpiK4nHYkbk9ksAmaZt4oB4Ukk9xJid3jzeLiT/711.json).

If you have an ERC-1155 NFT, each holder will get the same frame. As an example [here's our partner MintCalendar's](https://ipfs.io/ipfs/bafybeicij5pjwvwueqqnr7m5krlt3rnb5ldysiwl7ubhcg7i4bq6syqanu/0.json).

**5. Upload the metadata**

Now you need to upload your JSON file somewhere.
This is basically the same process as step 3.

You should get a URI back.

**6. Update the contract**

Finally you have to update your NFT's metadata on the contract.
There should be a function like \`setBaseMetadataURI\`.
You need to use the URI from step 5 and submit the transaction.

**7. Tell everyone you know**

You're done! 🎉
Sometimes it takes a few days for the metadata to be updated on PFPKit so [reach out to us](mailto:hello@milliondollartokenpage.com?cc=arthur@kibalabs.com;krishan@kibalabs.com&subject=I've%20uploaded%20some%20frames%20to%20my%20NFT%20project) and we'll do it for you straight away.

Now go update your PFP and tell all your friends!

### This sounds hard, can you help?

Yep, [reach out to us](mailto:hello@milliondollartokenpage.com?cc=arthur@kibalabs.com;krishan@kibalabs.com&subject=I%20want%20you%20to%20build%20my%20Frames).
For a small fee, we'd even be happy to help get all the technical details set up.

We've done it as quickly as 1 hour for some teams 🙌
`;

export const FramesInfoPage = (): React.ReactElement => {
  return (
    <Stack direction={Direction.Vertical} isFullWidth={true} childAlignment={Alignment.Fill}>
      <Text variant='header2' alignment={TextAlignment.Center}>Hello Frames 🖼</Text>
      <Spacing variant={PaddingSize.Wide2} />
      <Markdown source={CONTENT} />
    </Stack>
  );
};
