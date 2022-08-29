import React, { useMemo } from 'react'

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);
        const totalPageNumbers =siblingCount + 5;

        // if(totalPageNumbers >= totalPageCount){
        //     return range(1, totalPageCount)
        // }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)

    }, [totalCount, pageSize, siblingCount, currentPage])
    return paginationRange
}