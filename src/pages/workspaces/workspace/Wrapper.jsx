import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWorkspace } from "../../../redux/slices/workspaceSlice";
const { ipcRenderer } = window.require("electron");

/**
 * workspace wrapper
 */
export default function Wrapper() {
  const navigate = useNavigate();
  const { id } = useParams();
  const workspace = useSelector((state) => state.workspace);
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.invoke("getWorkspaceRequest", id).then((result) => {
      if (!result) navigate(-1);

      const { createdAt, updatedAt, _id: id, ...workspace } = result;
      dispatch(
        setWorkspace({
          ...workspace,
          id,
          currentRoute: "",
        })
      );
    });
  }, []);

  return workspace.id ? <Outlet /> : <></>;
}
