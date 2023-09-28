import { lazy, Suspense } from "react";

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

const Devtools = () => {
  return (
    <Suspense fallback={null}>
      <ReactQueryDevtoolsProduction position="bottom-right"/>
    </Suspense>
  );
};

export default Devtools;
