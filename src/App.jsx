import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState("false");
  const [charAllowed, setcharAllowed] = useState("false");
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <=length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);

  }, [length, numberAllowed, charAllowed, setpassword]);

  const CopyToClipboard = useCallback(()=>{
   passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)

  }, [password])

 useEffect(()=>{
  
  passwordGenerator()
},[length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-screen max-w-md mx-auto px-4 py-3 my-7 shadow-md rounded-lg text-red-600 bg-gray-400">
      <h1 className="text-white text-center my-3 text-3xl">Password Generator</h1>
      <div className=" flex rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readonly
          ref={passwordRef}
        />
        <button
        onClick={()=> CopyToClipboard()}
         className="outline-none bg-blue-600 text-white px-3 py-1 shrink-0 cursor-pointer  hover:bg-sky-700 ..."
        >
          For copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1 ">
            <input
            type="range"
            min= {6}
            max= {100}
            value={length}
            className="cursor-pointer"
            onChange={(e) =>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
            <input 
             type="checkbox"
             defaultChecked={charAllowed}
             id="characterId"
             onChange={()=>{
              setcharAllowed((prev) => !prev )
             }}
            />
            <label htmlFor="character">Character</label>
        </div>
        <div className="flex items-center gap-x-1">
            <input 
             type="checkbox"
             defaultChecked={numberAllowed}
             id="numberId"
             onChange={()=>{
              setnumberAllowed((prev) => !prev )
             }}
            />
            <label htmlFor="number">Number</label>
        </div>
      </div>
    </div>
  );
}

export default App;
