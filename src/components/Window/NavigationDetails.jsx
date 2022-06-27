import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavigationDetails() {
  const [children, setChildren] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const routesArr = location.pathname.slice(1).split("/");

    setChildren(
      [<Route path="/" name="HOME" />].concat(
        routesArr.map((path, i) =>
          path ? (
            <Route
              path={routesArr.slice(0, i + 1).join("/")}
              name={path.toUpperCase()}
              listKey={i + 1}
            />
          ) : (
            <></>
          )
        )
      )
    );
  }, [location]);

  return <div className="p-4 font-medium">{children}</div>;
}

/**
 *
 * @param {object} props
 * @param {string} props.path
 * @param {string} props.name
 * @param {boolean} props.lastRoute
 */
function Route({ path, name, lastRoute }) {
  return (
    <>
      {path !== "/" && <span className="text-white-200 px-3 font-bold">/</span>}

      {lastRoute ? (
        <span className="text-white-700 cursor-default">{name}</span>
      ) : (
        <Link to={path} className="hover:underline text-white-500">
          {name}
        </Link>
      )}
    </>
  );
}
