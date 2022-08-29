/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { appapi } from "./Api";
import { Circles } from "react-loader-spinner";
// import { styled } from "@fluentui/react";
import $ from "jquery";
import { textAreaProperties } from "@fluentui/react";

// import "rsuite/dist/rsuite.min.css";

export default function ImaageUpload() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [count, setCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [flag, setFlag] = useState(false);
  const [display,setDisplay] = useState("static") 

  const apikey = "563492ad6f91700001000001f0ccc03744814453a23b08ffe4738d9d"; //use the apikey you have generated
  const [spinner, setSpinner] = useState(true);

  function getSelectedSlideIndex() {
    return new OfficeExtension.Promise<number>(function (resolve, reject) {
      Office.context.document.getSelectedDataAsync(Office.CoercionType.SlideRange, function (asyncResult) {
        try {
          const newObj: any = asyncResult.value;
          if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            reject(console.error(asyncResult.error.message));
          } else {
            resolve(newObj.slides[0].index);
          }
        } catch (error) {
          reject(console.log(error));
        }
      });
    });
  }
  async function addSlideWithMatchingLayout() {
    await PowerPoint.run(async function (context) {
      let selectedSlideIndex = await getSelectedSlideIndex();

      // Decrement the index because the value returned by getSelectedSlideIndex()
      // is 1-based, but SlideCollection.getItemAt() is 0-based.
      const realSlideIndex = selectedSlideIndex - 1;
      const selectedSlide = context.presentation.slides.getItemAt(realSlideIndex).load("slideMaster/id, layout/id");

      await context.sync();

      context.presentation.slides.add({
        slideMasterId: selectedSlide.slideMaster.id,
        layoutId: selectedSlide.layout.id,
      });

      await context.sync();
    });
  }
  async function deleteSlide() {
    await PowerPoint.run(async function (context) {
      // The slide index is zero-based.
      const slide = context.presentation.slides.getItemAt(1);
      slide.delete();

      await context.sync();
    });
  }
  const getPhotos = async (activePage) => {
    $("ul li.active").removeClass("active");
    $("ul li#" + activePage).addClass("active");

    const data = await fetch(`https://api.pexels.com/v1/curated?page=${activePage}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: apikey, //use the apikey you have generated
      },
    });
    const response = await data.json();
    console.log("responseeeeeeeeee", response); //convert the response to json
    setUsers(response.photos);
    console.log("response.photos", response.photos);
    setSpinner(false);
  };
  console.log("useeerssss", users);

  useEffect(() => {
    getPhotos(activePage);
  }, []);

  const btnClick = async (url) => {
    setSpinner(true);

    const getPhotoResponse = appapi.getPhoto(url).then((resp) => {
      console.log("resp", resp);
      setSpinner(false);
    });
  };
  async function SearchPhotos(query, page) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: apikey,
      },
    });
    const response = await data.json();
    console.log("responseeeee", response);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const searchData = response.photos.filter((name) => name.photographer == query);
    setSearchText(response.photos);
    setSearchActive(true);

    if(response.photos.length == 0 ){
      setDisplay("none")
    }else{
      console.log("length is max then 0000000")
    }
  }

  const handleCurrentPage = (activeNumber) => {
    setCount(activeNumber);
    setActivePage(count);
    console.log("current--count-", count, activePage);
  };
  var usersLength = 2000;
  console.log("users length before maxxxxx", usersLength);

  if (flag) {
    var pagesOnSearch = [];
    for (var j = 1; j <= usersLength / itemsPerPage; j++) {
      pagesOnSearch.push(j);
    }
  } else {
    var pages = [];
    for (var i = 1; i <= usersLength / itemsPerPage; i++) {
      pages.push(i);
    }
  }
  const searchImage = (search, activePage) => {
    // setSearch("");
    setActivePage(1);
    setFlag(true);
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
    SearchPhotos(search, activePage);
    console.log("the length of search text is ",searchText.length)
    console.log("searchText.length == 0searchText.length == 0",searchText.length == 0)
    
  };

  const handleClick = (e) => {
    setActivePage(Number(e.target.id));
    console.log("targetttttt.iddd", e.target.id);
    console.log("activePageeeeee", activePage);
    if (searchActive) {
      SearchPhotos(search, e.target.id);
    } else {
      getPhotos(e.target.id);
    }
  };

  const renderPageNumbers = flag
    ? pagesOnSearch.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li key={number} id={number} onClick={handleClick} className={activePage === number ? "active" : ""}>
              {number}
            </li>
          );
        } else {
          return null;
        }
      })
    : pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li key={number} id={number} onClick={handleClick} className={activePage === number ? "active" : ""}>
              {number}
            </li>
          );
        } else {
          return null;
        }
      });

  const handlePrevBtn = () => {
    setActivePage(activePage - 1);
    if (searchActive) {
      SearchPhotos(search, activePage);
    } else {
      getPhotos(activePage);
    }

    if ((activePage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNextBtn = () => {
    setActivePage(activePage + 1);
    if (searchActive) {
      SearchPhotos(search, activePage + 1);
    } else {
      getPhotos(activePage + 1);
    }

    if (activePage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  return (
    <>
    {console.log("searchTextsearchTextsearchText",searchText)}
      <div className="row">
        <div className="columnInput">
          <div className="cardInput">
            <input
              placeholder="Search..."
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  searchImage(search, activePage);
                }
              }}
            />
            <input type="submit" onClick={() => searchImage(search, activePage)} />
            {/* <button onClick={() => SearchPhotos(search)}>search</button> */}
          </div>
        </div>
      </div>

      {searchActive ? (
        <div>
          {spinner ? (
            <div style={{ padding: "40%" }}>
              <Circles color="#00BFFF" height={80} width={80} />
            </div>
          ) : searchText.length <= 0 ? (
            <div style={{ fontWeight: "bold", color: "red", paddingLeft: "23%" }}>Please Enter Valid Description.</div>
          ) : (
            <div>
              {searchText.map((response) => {
                return (
                  <>
                    <div className="card" style={{ float: "left" }}>
                      <div key={response.id}>
                        <img
                          className="img"
                          alt="#"
                          onClick={() => btnClick(response.src.original)}
                          src={response.src.small}
                        />
                        {/* <p> Photographer: <span style={{ fontWeight: "bold" }}> {response.photographer}</span> </p> */}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div>
          {spinner ? (
            <div style={{ padding: "40%" }}>
              <Circles color="#00BFFF" height={80} width={80} />
            </div>
          ) : (
            users.length &&
            users.map((response) => {
              return (
                <>
                  <div key={response.id} style={{ float: "left" }}>
                    <div className="card">
                      <img
                        className="img"
                        alt="#"
                        onClick={() => btnClick(response.src.original)}
                        src={response.src.small}
                      />
                      {/* <div style={{height:'40px',width:'140px'}}> Photographer:  <span style={{ fontWeight: "bold" }}> {response.photographer}</span> </div> */}
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
      )}
      <div>
        <div></div>
        <div className="button-group">
        {console.log("search text have length of", searchText.length)}
          {              
            <ul className="pageNumbers" style={{display:display}}>
              <li>
                <button onClick={handlePrevBtn} disabled={activePage === 1}>
                  Prev
                </button>
              </li>
              {renderPageNumbers}
              <li>
                <button onClick={handleNextBtn}>Next</button>
              </li>
            </ul>           
          }
        </div>
        {/* < Pagination itemsPerPage = {4} />,   */}
      </div>
    </>
  );
}
