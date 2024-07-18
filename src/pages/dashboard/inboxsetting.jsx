import { Helmet } from 'react-helmet-async';

import { Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* <BlankView title="Inbox" /> */}
      <Typography>
        Inbox Setting
      </Typography>
    </>
  );
}