import "./App.css";
import Content from "./component/Content";

import SidebarLeft from "./component/Sidebar/SidebarLeft";
import SidebarRight from "./component/Sidebar/SidebarRight";

function App() {
  return (
    <div className="grid main-container">
      <SidebarLeft />
      <div className="content">
        <Content />
      </div>
      <div className="right-sidebar">
        <SidebarRight />
      </div>
      <div className="player">Hello</div>
    </div>
  );
}

export default App;
