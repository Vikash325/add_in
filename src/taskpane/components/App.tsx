import * as React from "react";
import { DefaultButton } from "@fluentui/react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import Progress from "./Progress";
import ImageUpload from "./ImageUpload";
import Base from "./Base";
import ChechApi from "./ChechApi";

/* global console, Office, require */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: HeroListItem[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
    };
  }



  // click = async () => {
  //   /**
  //    * Insert your PowerPoint code here
  //    */
  //   Office.context.document.setSelectedDataAsync(
  //     "Hello World!",
  //     {
  //       coercionType: Office.CoercionType.Text,
  //     },
  //     (result) => {
  //       if (result.status === Office.AsyncResultStatus.Failed) {
  //         console.error(result.error.message);
  //       }
  //     }
  //   );
  // };

  render() {
    const { title, isOfficeInitialized } = this.props;

    // if (!isOfficeInitialized) {
    //   return (
    //     <Progress
    //       title={title}
    //       logo={require("./../../../assets/logo-filled.png")}
    //       message="Please sideload your addin to see app body."
    //     />
    //   );
    // }

    return (
      <div className="ms-welcome">
        {/* <Header logo={require("./../../../assets/logo-filled.png")} title={this.props.title} message="Welcome" />
        <HeroList message="Discover what Office Add-ins can do for you today!" items={this.state.listItems}>
          <p className="ms-font-l">
            Modify the source files, then click <b>Run</b>.
          </p>
          <DefaultButton className="ms-welcome__action" iconProps={{ iconName: "ChevronRight" }} onClick={this.click}>
            Run
          </DefaultButton>
        </HeroList> */}
          <Base/>
          {/* <ChechApi/> */}
        {/* <ImaageUpload/> */}
      
      </div>
    );
  }
}
