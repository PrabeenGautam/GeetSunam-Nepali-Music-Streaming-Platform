import Content from "components/Content";
import { SidebarLeft, SidebarRight } from "components/Sidebar";

function HomePage() {
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

export default HomePage;
