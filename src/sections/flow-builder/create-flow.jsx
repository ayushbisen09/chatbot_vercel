import 'react-modal-video/css/modal-video.min.css';

import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';
import ListNode from 'src/components/flow-nodes/message-type-nodes/list-node';
import ConditionNode from 'src/components/flow-nodes/action-nodes/condition-node';
import AskAddressNode from 'src/components/flow-nodes/action-nodes/ask-address-node';
import AskLocationNode from 'src/components/flow-nodes/action-nodes/ask-location-node';
import ConnectFlowNode from 'src/components/flow-nodes/action-nodes/connect-flow-node';
import AskQuestionNode from 'src/components/flow-nodes/action-nodes/ask-question-node';
import FlowStartNode from 'src/components/flow-nodes/message-type-nodes/flow-start-node';
import TextButtonNode from 'src/components/flow-nodes/message-type-nodes/text-button-node';
// ----------------------------------------------------------------------

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const dialog = useBoolean();
  const navigate = useNavigate();

  const handleAddFlow = () => {
    navigate('/app/flows/createflow');
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="Flow Builder"
          Subheading="You can connect with Facebook to fetch catalog and manage it from our platform."
          link_added="#"
        />
      </Box>

      <Box
        sx={{
          mt: '40px',
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }, // 3 columns on medium screens
          gap: 3, // Adjust gap as needed
        }}
      >
        
          <FlowStartNode />
        
        
          <ConditionNode />
     
        
          <TextButtonNode />
      
       
          <ListNode />
          <AskLocationNode />
          <ConnectFlowNode />
          <AskAddressNode/>
          <AskQuestionNode/>
     
        
         
        
      </Box>
    </DashboardContent>
  );
}
