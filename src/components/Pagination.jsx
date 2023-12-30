/**
 * @interface PaginationProps
 * @property {Function} onPrevPage - Function to navigate to the previous page.
 * @property {Function} onNextPage - Function to navigate to the next page.
 * @property {Function} totalPages - Total number of pages.
 * @property {number} page - Current page value.
 */

/**
 * Pagination component.
 * @param {PaginationProps} props - The props object containing the pagination functions and current page value.
 * @returns {JSX.Element} - The Pagination component.
 */
export default function Pagination({
  onPrevPage,
  onNextPage,
  page,
  totalPages,
}) {
  return (
    <div className="join">
      <button
        disabled={page <= 1}
        className="join-item btn"
        onClick={onPrevPage}
      >
        «
      </button>

      <button className="join-item btn">Page {page}</button>

      <button
        disabled={page >= totalPages}
        className="join-item btn"
        onClick={onNextPage}
      >
        »
      </button>
    </div>
  );
}
