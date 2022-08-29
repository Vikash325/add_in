/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
// eslint-disable-next-line react/prop-types
// function Items({ currentItems }) {
//     return (
//       <>
//         {currentItems &&
//           currentItems.map((item) => (
//             // eslint-disable-next-line react/jsx-key
//             <div>
           
//             </div>
//           ))}
//       </>
//     );
//   }
  const Pagination = ({ itemsPerPage }) => {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
     
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
     
      setItemOffset(newOffset);
    };
  
    return (
      <>
        {/* <Items currentItems={currentItems} /> */}
        <ReactPaginate 
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="previous"
          renderOnZeroPageCount={null}
          activeClassName={"active"}
          previousLinkClassName={"previousBtn"}
          nextLinkClassName={"nextBtn"}
                      
          />
      </>
    );
  }  
  export default Pagination;