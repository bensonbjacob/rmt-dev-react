import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header, { HeaderTop } from './Header';
import Logo from './Logo';
import BookmarksButton from './BookmarksButton';
import SearchForm from './SearchForm';
import Sidebar, { SidebarTop } from './Sidebar';
import JobItemContent from './JobItemContent';
import ResultsCount from './ResultsCount';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import SortingControls from './SortingControls';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobList
            jobItems={jobItemsSortedAndSliced}
            isLoading={isLoading}
          />
          <PaginationControls />
        </Sidebar>

        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position='top-right' />
    </>
  );
}

export default App;
