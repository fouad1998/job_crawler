import DisplayError from './DisplayError';
import Network from './Illustration/Network';

import { Container } from '@mui/material';

type Props = {
  /**
   * Loading state, if true, will show a loading spinner in a button
   */
  loading?: boolean;
  /**
   * Custom text for the button which has already default text
   */
  buttonText?: string;
  /**
   * Handler function to be called when the button is clicked
   * this is available only when the error is of unknown, network, and server issue
   * for other issues, the button will have their default handler
   */
  handler?(): void;
};
function ErrorHelper({ loading, buttonText, handler }: Props) {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <DisplayError
        title={'An error occurred while processing your request, please try again.'}
        buttonText={buttonText || 'Try again'}
        illustration={<Network />}
        loading={loading}
        onClick={handler}
      />
    </Container>
  );
}

export default ErrorHelper;
