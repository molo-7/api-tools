import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiIcon from "../images/api.png";
import Modal from "../components/Builders/Modal";
import Input from "../components/Builders/Input";
import Button from "../components/Builders/Button";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
const { ipcRenderer } = window.require("electron");

/**
 * home page
 */
export default function Home() {
  const navigate = useNavigate();
  const [isModalActive, setIsModalActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // let { current: setWrokspaceNameError } = useRef(),
  //   { current: setApiBaseURLError } = useRef(),
  //   { current: setApiVersionError } = useRef();

  const [workspaceNameError, setWrokspaceNameError] = useState(null),
    [apiBaseURLError, setApiBaseURLError] = useState(null),
    [apiVersionError, setApiVersionError] = useState(null);

  // let setWrokspaceNameError, setApiBaseURLError, setApiVersionError;

  const workspaceNameInput = useRef(),
    apiBaseURLInput = useRef(),
    apiVersionIput = useRef();

  const recentWorkspaces = null;

  const openModalHandler = () => setIsModalActive(true);
  const closeModalHandler = () => {
    setIsModalActive(false);
    setWrokspaceNameError(null);
    setApiBaseURLError(null);
    setApiVersionError(null);
  };

  const createWorkspaceHandler = async () => {
    let validInputs = true;

    const name = workspaceNameInput.current.value.trim();
    const baseURL = apiBaseURLInput.current.value.trim();
    const version = apiVersionIput.current.value.trim();

    // validate inputs
    if (!name) setWrokspaceNameError("Workspace name is required");
    if (!baseURL) setApiBaseURLError("Api base url is required");
    if (name.length > 32) setWrokspaceNameError("Maximum length is 32");
    if (!validateURL(baseURL)) setApiBaseURLError("Invalid URL Format");
    if (version && !/^\d+(\.\d+){0,2}$/.test(version))
      setApiVersionError("Invalid versioning format");

    if (
      !name ||
      !baseURL ||
      name.length > 32 ||
      !validateURL(baseURL) ||
      (version && !/^\d+(\.\d+){0,2}$/.test(version))
    )
      validInputs = false;

    // create workspace
    if (validInputs) {
      const workspaceObj = {
        name,
        api: {
          baseURL,
          version: version || null,
        },
      };
      setIsLoading(true);

      ipcRenderer
        .invoke("createWorkspaceRequest", workspaceObj)
        .then((workspace) => {
          setIsLoading(false);
          console.log(workspace);
          if (workspace.notAvailable) {
            setWrokspaceNameError(
              <>
                You already have a workspace named
                <Link
                  to={`/workspaces/${workspace._id}`}
                  className="text-blue ml-1 underline"
                >
                  {workspace.name}
                </Link>
              </>
            );
          } else navigate(`/workspaces/${workspace._id}`);
        });
    }
  };

  return (
    <div>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}

      {/* Create Workspace */}
      {isModalActive && (
        <Modal title="New Workspace" closeModalHandler={closeModalHandler}>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-9">
              <div>
                <h2 className="text-white-700 text-base font-bold mb-4 cursor-default">
                  Workspace Name
                  <span className="select-none text-danger ml-1">*</span>
                </h2>
                <Input
                  placeholder="Emoji Finder"
                  inputRef={workspaceNameInput}
                  max={32}
                  onKeyUp={() => setWrokspaceNameError(null)}
                  error={workspaceNameError}
                >
                  {/* {(setError) => (setWrokspaceNameError = setError)} */}
                </Input>
              </div>
              <div>
                <h2 className="text-white-700 text-base font-bold mb-4 cursor-default">
                  API Base URL
                  <span className="select-none text-danger ml-1">*</span>
                </h2>
                <Input
                  placeholder="https://dummy.restapiexample.com/api/"
                  type="url"
                  inputRef={apiBaseURLInput}
                  onKeyUp={() => setApiBaseURLError(null)}
                  error={apiBaseURLError}
                >
                  {/* {(setError) => (setApiBaseURLError = setError)} */}
                </Input>
              </div>
              <div>
                <h2 className="text-white-700 text-base font-bold mb-4 cursor-default">
                  API Version
                </h2>
                <Input
                  placeholder="2"
                  type="number"
                  inputRef={apiVersionIput}
                  onKeyUp={() => setApiVersionError(null)}
                  error={apiVersionError}
                >
                  {/* {(setError) => (setApiVersionError = setError)} */}
                </Input>
              </div>
            </div>

            <div className="flex justify-center mt-7">
              <Button
                type="primary"
                className="w-2/5 font-bold text-lg"
                onClick={createWorkspaceHandler}
              >
                Create
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Select Workspace */}
      <section>
        <div className="p-4 flex flex-col items-center w-80">
          <h2 className="font-semibold text-lg text-white-900">
            New Workspace
          </h2>
          <img
            src={apiIcon}
            alt="api icon"
            className="my-4 w-16"
            draggable="false"
          />
          <div className="flex gap-3">
            <Button type="tertiary" onClick={openModalHandler}>
              Create New
            </Button>
            <Button type="secondary">Import</Button>
          </div>
        </div>
      </section>

      {/* Recents */}
      <section className="mt-10 ml-4">
        <h1 className="font-semibold text-lg text-white-500 cursor-default mb-6">
          Recent
        </h1>
        {recentWorkspaces ? (
          <></>
        ) : (
          <h2 className="text-white-700 ml-3">
            You don't have any recent workspaces 🤠
          </h2>
        )}
      </section>
    </div>
  );
}

const validateURL = (url) => {
  const urlRegex =
    /https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}\S*/;

  return (
    url.includes("localhost:") ||
    url.includes("127.0.0.1:") ||
    urlRegex.test(url)
  );
};
