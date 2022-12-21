import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo } from 'react'
import {
  PaginationContainer,
  PaginationNavigateButton,
  PaginationPageButton,
} from './styles'

interface PaginationProps {
  currentPage: number
  totalItems: number
  totalItemsPerPage: number
  onPrevPage: () => void
  onNextPage: () => void
  onSetPage: (page: number) => void
}

export function Pagination({
  currentPage,
  totalItems,
  totalItemsPerPage,
  onNextPage,
  onPrevPage,
  onSetPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / totalItemsPerPage)
  const isLastPage = currentPage === totalPages
  const isFirstPage = currentPage === 1

  const pageButtons = useMemo(() => {
    const pages = []
    const maxPageButtons = 5
    const interval = maxPageButtons / 2

    const numberOfPageButtonsToAddOnTheRight =
      interval - currentPage >= 0 ? interval - currentPage : 0

    const numberOfPageButtonsToAddOnTheLeft =
      currentPage + interval - totalPages >= 0
        ? currentPage + interval - totalPages
        : 0

    for (let numberPage = 1; numberPage <= totalPages; numberPage++) {
      const isVisible =
        numberPage <=
          currentPage + interval + numberOfPageButtonsToAddOnTheRight &&
        numberPage > currentPage - interval - numberOfPageButtonsToAddOnTheLeft

      if (isVisible) {
        pages.push(numberPage)
      }
    }

    return pages
  }, [currentPage, totalPages])

  if (pageButtons.length <= 1) return null

  return (
    <PaginationContainer data-testid="pagination-component">
      <PaginationNavigateButton disabled={isFirstPage} onClick={onPrevPage}>
        <CaretLeft weight="bold" size={24} />
      </PaginationNavigateButton>

      <div>
        {pageButtons.map((page) => (
          <PaginationPageButton
            key={page}
            isActive={page === currentPage}
            onClick={() => onSetPage(page)}
          >
            {page}
          </PaginationPageButton>
        ))}
      </div>

      <PaginationNavigateButton disabled={isLastPage} onClick={onNextPage}>
        <CaretRight weight="bold" size={24} />
      </PaginationNavigateButton>
    </PaginationContainer>
  )
}
