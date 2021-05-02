// import axios from "axios";
// import React from "react";

// export default axios.create({
//   baseURL: "https://api.unsplash.com",
//   headers: {
//     Authorization: "Client-ID USlO7ONMxpaG7ffnkl-6vgw2cAAQv6nEaXqNoSJuuHc",
//   },
// });

import axios from "axios";

let unsplashApi = "https://api.unsplash.com";
let pixabayApi = "https://pixabay.com/api/";

const unsplash = axios.create({
  baseURL: unsplashApi,
  headers: {
    Authorization: "Client-ID USlO7ONMxpaG7ffnkl-6vgw2cAAQv6nEaXqNoSJuuHc",
  },
});

const pixabay = axios.create({
  baseURL: pixabayApi,
  header: {
    "X-RateLimit-Limit": 100,
  },
});

const resultFromApi = async (result) => {
  let resultsFromUnsplash = [];
  let resultsFromPixabay = [];

  try {
    const getImgUnsplash = await unsplash.get(
      "https://api.unsplash.com/search/photos",
      {
        params: { query: result, per_page: 100 },
      }
    );

    const dataFromUnsplash = getImgUnsplash.data.results.map((img) => {
      return { urls: img.urls.full };
    });

    resultsFromUnsplash = [...resultsFromUnsplash, ...dataFromUnsplash];

    const getImgPixabay = await pixabay.get(`https://pixabay.com/api/`, {
      params: {
        key: "21224893-c61153f1d9b5a52314e204800",
        q: result,
        per_page: 25,
      },
    });

    const dataFromPixabay = getImgPixabay.data.hits.map((img) => {
      return { urls: img.webformatURL };
    });
    resultsFromPixabay = [...resultsFromPixabay, ...dataFromPixabay];
  } catch (err) {
    console.log(err.message);
  }

  return [...resultsFromPixabay, ...resultsFromUnsplash];
};

const getNewPins = async () => {
  let pinDataFromUnsplash = [];
  let pinDataFromPixabay = [];
  let pinData;
  let sampleInput = ["piano"];

  try {
    for (let term in sampleInput) {
      const getImgUnsplash = await unsplash.get(
        "https://api.unsplash.com/photos/random",
        {
          params: { query: term, count: 30 },
        }
      );

      const dataFromUnsplash = getImgUnsplash.data.map((img) => {
        return { urls: img.urls.regular };
      });

      pinDataFromUnsplash = [...pinDataFromUnsplash, ...dataFromUnsplash];

      const getImgPixabay = await pixabay.get(`https://pixabay.com/api/`, {
        params: {
          key: "21224893-c61153f1d9b5a52314e204800",
          q: term,
          per_page: 25,
        },
      });

      const dataFromPixabay = getImgPixabay.data.hits.map((img) => {
        return { urls: img.webformatURL };
      });
      pinDataFromPixabay = [...pinDataFromPixabay, ...dataFromPixabay];
    }
  } catch (err) {
    console.log(err.message);
  }
  pinData = [...pinDataFromUnsplash, ...pinDataFromPixabay];
  return pinData;
};

export { getNewPins, resultFromApi };
