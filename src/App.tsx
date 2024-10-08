import {BrowserRouter as Router, Route, Routes, Outlet} from 'react-router-dom';

import './App.css';
import Home from "./screens/home.tsx";
import Navbar from "./components/navigation/navbar.tsx";
import {ConfigProvider} from "antd";
import MyTasksScreen from "./screens/MyTasks.tsx";
function App() {

    const lightTheme = {
        token: {
            colorPrimary: '#804EEC',
            colorTextBase: '#000000',
            colorBgBase: '#ffffff',
            colorInfo: '#804EEC',
        },
        components: {
            Layout: {
                siderBg: '#191621',
            },
            Menu: {
                darkItemBg: '#191621',
            },
            Select: {
                clearBg: "rgba(255,255,255,0)",
                selectorBg: "rgba(255,255,255,0)",
            },
        },
    };



  return (
    <ConfigProvider theme={lightTheme}>
      <Router>
          <Routes>
              <Route element={<MainShell/>}>
                  <Route path="/" element={ <Home />} />
                  <Route path={'/my-tasks'} element={<MyTasksScreen/>}/>
              </Route>
          </Routes>
      </Router>
    </ConfigProvider>
  )
}

function MainShell (){
    return <div className={'bg-gradient-spots'}>
   <div className={'backdrop-blur bg-light bg-opacity-35'}>
       <Navbar/>
       <Outlet/>
   </div>
    </div>
}

export default App
