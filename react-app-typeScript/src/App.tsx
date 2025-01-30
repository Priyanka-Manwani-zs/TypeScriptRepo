import "./App.css";
import Carousal from "./Carousal";
import useImgaes from "./useImgaes";

function App() {
  const { data } = useImgaes("http://localhost:3000/images");
  console.log(data);

  return (
    <>
      <Carousal />
    </>
  );
}

export default App;
