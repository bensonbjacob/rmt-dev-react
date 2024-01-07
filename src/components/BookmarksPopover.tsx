import JobList from './JobList';

export default function BookmarksPopover() {
  const { bookmarkedJobItems, isLoading} = 

  return (
    <div className='bookmarks-popover'>
      <JobList jobItems={[]} isLoading={false} />
    </div>
  );
}
