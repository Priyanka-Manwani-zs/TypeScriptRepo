import  {  useState } from "react";

const Parent = () => {
  const [input2, setInput2] = useState();

  const handleInputChange1 = () => {
    let id: number | undefined;
    console.log("HI");
    console.log(id);
    return function fn(e) {
      console.log(id, "curr");
      clearTimeout(id);
      id = setTimeout(() => {
        setInput2(e.target.value);
      }, 1000);
    };
  };

  return (
    <div className="parent">
      <input placeholder="Input 1" onChange={handleInputChange1()} />
      <input placeholder="Input 2" value={input2} />
    </div>
  );
};

export default Parent;
