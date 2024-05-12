export const getPageNumbers = ({
  totalPages,
  currentPage = 1,
  totalPagesToDisplay = 6,
}: {
  totalPages: number
  currentPage: number
  totalPagesToDisplay?: number
}) => {
  const showLeftEllipsis = currentPage - 1 > totalPagesToDisplay / 2
  const showRightEllipsis =
    totalPages - currentPage + 1 > totalPagesToDisplay / 2

  if (totalPages <= totalPagesToDisplay) {
    return { pages: Array.from({ length: totalPages }, (_, i) => i + 1) }
  } else {
    const half = Math.floor(totalPagesToDisplay / 2)

    let start = currentPage - half
    let end = currentPage + half

    if (start < 1) {
      start = 1
      end = totalPagesToDisplay
    }

    if (end > totalPages) {
      start = totalPages - totalPagesToDisplay + 1
      end = totalPages
    }

    if (showLeftEllipsis) {
      start++
    }

    if (showRightEllipsis) {
      end--
    }
    return {
      pages: Array.from({ length: end - start + 1 }, (_, i) => start + i),
      showRightEllipsis,
      showLeftEllipsis,
    }
  }
}
