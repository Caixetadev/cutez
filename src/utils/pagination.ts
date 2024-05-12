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
    // To ensure that the current page is always in the middle
    let start = currentPage - half
    let end = currentPage + half
    // If the current page is near the start
    if (start < 1) {
      start = 1
      end = totalPagesToDisplay
    }
    // If the current page is near the end
    if (end > totalPages) {
      start = totalPages - totalPagesToDisplay + 1
      end = totalPages
    }
    // If showLeftEllipsis is true, add an ellipsis before the start page
    if (showLeftEllipsis) {
      start++
    }
    // If showRightEllipsis is true, add an ellipsis after the end page
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
