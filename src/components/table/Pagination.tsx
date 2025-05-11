import { type Dispatch, type SetStateAction } from "react";
import PaginationButton from "./PaginationButton";
import PaginationSelect from "./PaginationSelect";
import type { TPagination } from "@/types/global.type";
import type { TPaginationSchema } from "@/schema/pagination.schema";

const Pagination = ({
  pagination,
  setPaginationParams,
}: {
  pagination: TPagination;
  paginationParams: TPaginationSchema;
  setPaginationParams: Dispatch<SetStateAction<TPaginationSchema>>;
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
      <div className="flex items-center gap-2">
        <p>
          Page {pagination.total_page > 0 ? pagination.page : 0} of{" "}
          {pagination.total_page}
        </p>
        <p>|</p>
        <p>Total {pagination.total_item} Items</p>
        <p>|</p>
        <PaginationSelect setPaginationParams={setPaginationParams} />
      </div>
      <div className="flex items-center gap-2">
        <PaginationButton
          title="Prev"
          action={() => {
            setPaginationParams((prev) => ({
              page: prev.page! - 1,
              limit: prev.limit,
            }));
          }}
          isDisabled={pagination.page === 1}
        />
        <PaginationButton
          title="Next"
          action={() => {
            setPaginationParams((prev) => ({
              page: prev.page! + 1,
              limit: prev.limit,
            }));
          }}
          isDisabled={pagination.page === pagination.total_page}
        />
      </div>
    </div>
  );
};

export default Pagination;
