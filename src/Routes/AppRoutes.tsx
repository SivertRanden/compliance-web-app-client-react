import React from "react";
import { Route } from "react-router";
import LawList from "../components/laws/LawList";
import LawDetails from "../components/laws/LawDetails";
import ThemeList from "../components/theme/ThemeList";
import ThemeDetails from "../components/theme/ThemeDetails";
import RegulationDetails from "./../components/regulations/RegulationDetails";
import ConnectedLawDetails from "../components/theme/ConnectedLawDetails";
import ConnectedRegulationDetails from "../components/theme/ConnectedRegulationDetails";
import AnswerDetails from "../components/answers/AnswerDetails";
import CategoryList from "../components/categories/CategoryList";
import AnswersInCategory from "../components/categories/AnswersInCategory";
import SubSectionDetails from "../components/subsections/SubSectionDetails";

// Declare all routes here
function AppRoutes(props: any) {
  return (
    <div>
      <Route exact path="/answers/:answerId" component={AnswerDetails} />
      <Route exact path="/categories" component={CategoryList} />
      <Route exact path="/categories/:categoryId/answers" component={AnswersInCategory} />
      <Route exact path="/laws" component={LawList} />
      <Route exact path="/laws/:lawId" component={LawDetails} />
      <Route exact path="/regulations/:regulationId" component={RegulationDetails} />
      <Route exact path="/subsections/:subSectionId" component={SubSectionDetails} />
      <Route exact path="/themes" component={ThemeList} />
      <Route exact path="/themes/:themeId" component={ThemeDetails} />
      <Route exect path="/themes/:themeId/laws/:lawId" component={ConnectedLawDetails} />
      <Route
        exect
        path="/themes/:themeId/regulations/:regulationId"
        component={ConnectedRegulationDetails}
      />
    </div>
  );
}

export default AppRoutes;
