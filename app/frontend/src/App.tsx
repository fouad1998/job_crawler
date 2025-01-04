import HttpClient from './modules/common/HttpClient';
import Theme from './modules/common/Theme';
import JobList from './modules/jobs/pages/JobList';

function App() {
  return (
    <Theme>
      <HttpClient>
        <JobList />
      </HttpClient>
    </Theme>
  );
}

export default App;
