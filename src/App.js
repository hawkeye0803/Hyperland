import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Admin, Game, Home } from "./pages";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { useStore } from "./hooks/useStore";
import { useEffect } from "react";
import { CONTRACT_ADDRESS } from "./utils/constants";

function App() {

  const client = new SuiClient({
    url: getFullnodeUrl("devnet"),
  });

  const [setNFTData, setWorldData] = useStore((state) => [
    state.setNFTData,
    state.setWorldData,
  ]);


  const fetch = async () => {
    // setLoader(true);
    const objects = await client.getOwnedObjects({
      owner:
        "0x2960279b3a26e5f0de26b820df947720803dd612082d94d8687f3d4cf14beb32",
    });
    let NFTData = [];
    let WorldData = [];
    let objectData = objects.data;

    for (let i = 0; i < objectData.length; i++) {
      const txn = await client.getObject({
        id: objectData[i].data.objectId,
        // fetch the object content field
        options: { showContent: true },
      });
      if (txn.data?.content.type.includes(CONTRACT_ADDRESS)) {
        const response = txn.data;
        if (response.content.fields.description == "land") {
          WorldData.push(response);
        } else {
          NFTData.push(response);
        }
      }
    }
    WorldData.sort(
      (a, b) =>
        parseInt(a.content.fields.name) - parseInt(b.content.fields.name)
    );
    console.log(NFTData, WorldData);
    setNFTData(NFTData);
    let latestWorldData = WorldData[WorldData.length - 1];
    console.log(latestWorldData);
    setWorldData(latestWorldData);
  };

  useEffect(() => {
    fetch()
  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/land/:id" exact element={<Game />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
