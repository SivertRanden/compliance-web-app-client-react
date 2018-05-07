import React from "react";
import { Route } from "react-router";
import LawList from "../components/laws/LawList";
import LawDetails from "../components/laws/LawDetails";
import ThemeList from "../components/theme/ThemeList";
import ThemeDetails from "../components/theme/ThemeDetails";
import RegulationDetails from "./../components/regulations/RegulationDetails";
import ConnectedLawDetails from "../components/theme/ConnectedLawDetails";

// Declare all routes here
function AppRoutes(props: any) {
  return (
    <div>
      <Route exact path="/laws" component={LawList} />
      <Route exact path="/laws/:lawId" component={LawDetails} />
      <Route exact path="/themes" component={ThemeList} />
      <Route exact path="/themes/:themeId" component={ThemeDetails} />
      <Route exect path="/themes/:themeId/laws/:lawId" component={ConnectedLawDetails} />
      <Route exact path="/regulations/:regulationId" component={RegulationDetails} />
    </div>
  );
}

export default AppRoutes;
