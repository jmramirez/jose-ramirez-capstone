import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import Dashboard from './pages/Dashboard/Dasboard'
import MainPage from './pages/MainPage/MainPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ Dashboard } />
          <Route path="/login" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
