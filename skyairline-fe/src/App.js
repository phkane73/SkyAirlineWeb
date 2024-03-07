import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import routes from "./Routes/index";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map((route) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.page;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page></Page>
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
