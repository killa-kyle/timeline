import { useState, useEffect, useReducer, useRef } from "react";
import { useFetch, useInfiniteScroll, useLazyLoading } from "./customHooks";
import "./App.css";

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + " " + month + " " + year;
  return time;
}

function App() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    fetch("/images")
      .then((res) => res.json())
      .then((res) => setImageUrls(JSON.parse(res)))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const imgReducer = (state, action) => {
    switch (action.type) {
      case "STACK_IMAGES":
        return { ...state, images: state.images.concat(action.images) };
      case "FETCHING_IMAGES":
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };

  const pageReducer = (state, action) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        return { ...state, page: state.page + 1 };
      default:
        return state;
    }
  };

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
  const [imgData, imgDispatch] = useReducer(imgReducer, {
    images: [],
    fetching: true,
  });

  let bottomBoundaryRef = useRef(null);
  useFetch(pager, imgDispatch);
  useLazyLoading(".card-img-top", imageUrls);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <div className="App">
      <div id="images" className="container">
        <div className="row">
          <h1>2020</h1>
          <p>a photo essay by Kyle Rose</p>
        </div>
        <div className="row">
          {imageUrls.slice(2, imageUrls.length).map((image, index) => {
            let imageDate = image.split(".").filter((s) => s.includes("2020"));
            imageDate = String(imageDate).split("/")[2];

            return (
              <div key={index} className="card">
                <div className="card-body ">
                  <img
                    alt={image}
                    data-src={image}
                    className="card-img-top"
                    src={"https://picsum.photos/id/870/1/1?grayscale&blur=2"}
                  />
                </div>
                <div className="card-footer">
                  <p className="card-text text-center text-capitalize text-primary">
                    {timeConverter(imageDate)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {imgData.fetching && (
        <div className="text-center bg-secondary m-auto p-3">
          <p className="m-0 text-white">Getting images</p>
        </div>
      )}
      <div
        id="page-bottom-boundary"
        style={{ border: "1px solid red" }}
        ref={bottomBoundaryRef}
      ></div>
    </div>
  );
}

export default App;
