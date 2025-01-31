import "./App.css";
import Carousal from "./Carousal";
import useImgaes from "./UseImgaes";

function App() {
  const { data , loading, err} = useImgaes("http://localhost:3000/images");
  console.log(data);

  return (
    <>
      <Carousal data={data} />
    </>
  );
}

export default App;
