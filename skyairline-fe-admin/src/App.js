import DefaultLayout from "./Layouts/DefaultLayout";
import routes from "./Routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            {routes.map((route) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
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
    </div>
  );
}

export default App;
