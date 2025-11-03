import React from "react";
import poster from "./Pashupati_Prasad_poster.png";

export default function Card()
{

return(
<div>
<div>
  <h1 className="text-xl font-bold ml-4">Comedy</h1>
  </div>

  <div className="card bg-white text-black w-42 h-55 m-3 rounded-md ">
    <img className="h-41 w-39  p-2 rounded-xl justify-self-center" src={poster} alt="poster" />
    <h2 className="justify-self-center font-bold">Pashupati Parsad</h2>
   <div className="flex items-center w-full justify-between ml-2"> <button type="button" className="text-white bg-[#050708] rounded-sm m-1.5 px-1.5 py-0.7 text-center inline-flex items-center ">
Recommend
</button>
<button type="button" className="w-6 h-6 bg-black hover:bg-gray text-white rounded-full flex items-center justify-center transition-colors duration-200">+</button>

</div>
  </div>
</div>
);
}


