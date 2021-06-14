import React from "react";
import { EuiPage } from "@elastic/eui";
import Catalog from "./pages/Catalog/Catalog";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AddTrack from "./pages/CreateMusic/AddTrack";
import EditTrack from "./pages/UpdateMusic/EditTrack";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

// footre which expanded to page of audio that playing

function App() {
  return (
    <BrowserRouter>
      <EuiPage>
        <Route exact path={"/*"} component={Navbar} />
        <Switch>
          <Route exact path={["/", "/catalog"]} component={Catalog} />
          {/* redirect if not authorized */}
          <Route exact path={"/create"} component={AddTrack} />
          {/* redirect if not authorized */}
          <Route exact path={"/update/:audioId"} component={EditTrack} />
          <Route exact path={["/auth/signin", "/auth"]} component={SignIn} />
          <Route exact path={"/auth/signup"} component={SignUp} />
        </Switch>
      </EuiPage>
    </BrowserRouter>
  );
}

export default App;
//  <Catalog />;
