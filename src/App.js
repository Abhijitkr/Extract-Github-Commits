import { useForm } from "react-hook-form";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [dataSet, setDataSet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [hasMoreData, setHasMoreData] = useState(true);

  function fetchData(page, username, repo) {
    return new Promise(async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${username}/${repo}/commits?page=${page}&per_page=100`
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(`API Error: ${error.message}`);
        }
        const data = await response.json();
        setDataSet({ data });

        // if (data.length < 100) {
        //   setHasMoreData(false);
        // }
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    });
  }

  function afterSubmit(GitInfo) {
    const username = GitInfo.username;
    const repo = GitInfo.repo;
    fetchData(currentPage, username, repo);
  }

  // const loadMoreData = () => {
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };

  useEffect(() => {
    const username = "Abhijitkr";
    const repo = "QuantumBazaar";
    fetchData(currentPage, username, repo);
  }, [currentPage]);

  return (
    <div className="App">
      {dataSet && (
        <div className="w-1/2 m-auto">
          <h1 className="text-4xl my-5 font-semibold tracking-tight text-gray-900">
            Get your Github Commits
          </h1>
          <form
            noValidate
            onSubmit={handleSubmit((GitInfo) => {
              // e.preventDefault();
              console.log(GitInfo);
              afterSubmit(GitInfo);
            })}
            className="w-1/2 m-auto"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Github Username
              </label>
              <input
                type="text"
                {...register("username", {
                  required: "Username is required",
                })}
                id="username"
                className="w-full bg-gray-200 border-2 border-teal-400 focus:border-teal-600 py-2 px-4 mb-2"
                placeholder="Enter Github Username"
              />
            </div>
            <div>
              <label
                htmlFor="repo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Github Repository
              </label>
              <input
                type="text"
                {...register("repo", {
                  required: "Repository is required",
                })}
                id="repo"
                className="w-full bg-gray-200 border-2 border-teal-400 focus:border-teal-600 py-2 px-4"
                placeholder="Enter Github Repository"
              />
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-400 active:scale-95 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded items-center transition-all duration-300"
              >
                Button
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 mt-5">{error}</p>}
          {loading && <p className="text-orange-500 mt-5">Loading...</p>}
          {/* {console.log({ dataSet })} */}
          {dataSet && !error && (
            <div>
              {dataSet.data.map((commits, index) => (
                <a
                  href="#"
                  className="rounded-sm w-full grid grid-cols-12 bg-white shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform mt-2 text-left"
                  key={index}
                >
                  {/* Icon */}
                  {/* <div className="col-span-12 md:col-span-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#2563eb"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                </div> */}

                  {/* Title */}
                  {/* <div className="col-span-11 xl:-ml-5">
              <p className="text-blue-600 font-semibold">
                {" "}
                Deploy a Next.js App to App Platform{" "}
              </p>
            </div> */}
                  {currentPage * 100 - 100 + index + 1}
                  {/* Description */}
                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {commits.commit.message}
                    </p>
                  </div>
                </a>
              ))}
              {/* Pagination */}
              <div className="mt-5 mb-5 flex justify-around">
                {currentPage !== 1 ? (
                  <button
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous Page
                  </button>
                ) : null}
                {/* {console.log(dataSet.data.length)} */}
                {dataSet.data.length === 100 ? (
                  <button
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                  >
                    Next Page
                  </button>
                ) : null}

                {/* Load More */}
                {/* {hasMoreData && <button onClick={loadMoreData}>Load More</button>} */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
