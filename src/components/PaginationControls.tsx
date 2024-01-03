import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

type PaginationControlsProps = {
  onClick: (direction: 'next' | 'previous') => void;
  currentPage: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
}: PaginationControlsProps) {
  return (
    <section className='pagination'>
      <PaginationButton
        direction='previous'
        currentPage={currentPage}
        onClick={() => onClick('previous')}
      />
      <PaginationButton
        direction='next'
        currentPage={currentPage}
        onClick={() => onClick('next')}
      />
    </section>
  );
}

type PaginationButtonProps = {
  direction: 'next' | 'previous';
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button onClick={onClick} className='pagination__button'>
      {direction === 'previous' ? (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      ) : (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
