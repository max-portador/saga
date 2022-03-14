import {useSelector} from "react-redux";


function App() {
    const store = useSelector(store => store);
    return (
        <div className="App">
            React Saga Tuts
        </div>
    );
}

export default App;
