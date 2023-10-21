import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header, Loader } from "../components";
import { bgImg } from "../assets";
import { useStore } from "../hooks/useStore";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { makeFileObjects, uploadWeb3 } from "../utils/web3Storage";

const Home = () => {
  const [loader, setLoader] = useState(false);
  const [controlMenu, setControlMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [loadGame, setLoadGame] = useState(false);
  const [worldList, setWorldList] = useState([]);
  const [newWorldMenu, setNewWorldMenu] = useState(false);
  const [worldName, setWorldName] = useState("");
  // const [worldID, setWorldID] = useState("");
  const [worldDescription, setWorldDescription] = useState("");
  const navigate = useNavigate();
  const { mutate: funcCall } = useSignAndExecuteTransactionBlock();

  const createWorld = async () => {
    const CID = await uploadWeb3(
      await makeFileObjects({ cubes: [], items: [] })
    );
    const txb = new TransactionBlock();
    if (worldName && worldDescription) {
      console.log("Hello");
      setLoader(true);
      txb.moveCall({
        target: `${CONTRACT_ADDRESS}::chat::post_with_ref`,
        arguments: [
          txb.pure.address(
            "0x2960279b3a26e5f0de26b820df947720803dd612082d94d8687f3d4cf14beb32"
          ),
          txb.pure(worldName),
          txb.pure.address(
            "0xf2420e8710d25a606457d323149e8d952063a942ed159cf3dccae2ddd5d4f0ab"
          ),
          txb.pure(worldDescription),
        ],
      });
      funcCall(
        {
          transactionBlock: txb,
        },
        {
          onError: (err) => {
            console.log(err);
          },
          onSuccess: (result) => {
            console.log(result);
            setLoader(false);
            navigate(`/land/${CID}`);
          },
        }
      );
    }
  };

  const [setActiveWorldID] = useStore((state) => [state.setActiveWorldID]);

  return (
    <div className="homepage">
      {newWorldMenu && (
        <div className="control setting menu absolute h-screen w-screen make-flex">
          <div>
            <div
              className="absolute w-[500px]  make-flex justify-end px-2 pt-2 cursor-pointer"
              onClick={() => setNewWorldMenu(false)}
            >
              <span>X</span>
            </div>
            <div className="z-100 gameloader-container w-[500px] min-h-[200px] py-7 card-container make-flex justify-start flex-col gap-3 px-7">
              <div className="w-full">
                <label className="">Name of World</label>
                <input
                  type="text"
                  value={worldName}
                  onChange={(e) => setWorldName(e.target.value)}
                  className="border-2 mt-1 border-black w-full px-1 text-xl h-10 rounded-md font-vt"
                />
              </div>
              <div className="w-full">
                <label>Description</label>
                <textarea
                  value={worldDescription}
                  onChange={(e) => setWorldDescription(e.target.value)}
                  className="border-2 mt-1 border-black w-full px-1 text-xl h-20 rounded-md font-vt"
                />
              </div>
              <button
                className="btn py-3 px-6 text-md text-white bg-[#5A5A8E] hover:scale-[102%]"
                onClick={() => createWorld()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {profileMenu && (
        <div className="control setting menu absolute h-screen w-screen make-flex">
          <div>
            <div
              className="absolute w-[500px] make-flex justify-end px-2 pt-2 cursor-pointer"
              onClick={() => setProfileMenu(false)}
            >
              <span>X</span>
            </div>
            <div className=" z-100 menu-container w-[500px]  py-12 px-8 card-container">
              <div className="img-container make-flex mb-8 ">
                <img className="w-60 h-60 rounded-2xl bg-slate-500" />
              </div>
              <ul className=" make-flex flex-col gap-8 ">
                <li className=" flex justify-between w-[80%]">
                  <div className="">Name</div>
                  <div className="">John</div>
                </li>
                <li className=" flex justify-between w-[80%]">
                  <div className="">100</div>
                  <div className="">Destroy</div>
                </li>
                <li className=" flex justify-between w-[80%]">
                  <div className="">Rank</div>
                  <div className="">#13</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {controlMenu && (
        <div className="control setting menu absolute h-screen w-screen make-flex">
          <div>
            <div
              className="absolute w-[500px] make-flex justify-end px-2 pt-2 cursor-pointer"
              onClick={() => setControlMenu(false)}
            >
              <span>X</span>
            </div>
            <ul className=" z-100 menu-container w-[500px]  py-12 card-container make-flex flex-col gap-8 ">
              <li className=" flex justify-between w-[80%] ">
                <div className="">W</div>
                <div className="">Forward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">A</div>
                <div className="">Leftward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">D</div>
                <div className="">Backward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">S</div>
                <div className="">Forward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">C</div>
                <div className="">Chatbox</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Q</div>
                <div className="">Inventory</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">E</div>
                <div className="">Setting</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">B</div>
                <div className="">Buy</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Space</div>
                <div className="">Jump</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Click</div>
                <div className="">Build</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Alt+Click</div>
                <div className="">Destroy</div>
              </li>
            </ul>
          </div>
        </div>
      )}
      <img src={bgImg} className="absolute -z-10 h-screen w-screen" />
      <div className="make-flex w-screen h-screen flex-col">
        <div className="w-[600px] mx-auto h-screen flex-col make-flex justify-start pt-32 gap-2">
          <h2 className="font-bold text-[40px] text-center my-12 make-flex">
            Hyperland
          </h2>
          <button
            className="btn w-[400px] hover:bg-[#f4f4f4] text-base"
            onClick={() => setNewWorldMenu(true)}
          >
            Create Land
          </button>
          <button
            className="btn w-[400px] hover:bg-[#f4f4f4] text-base"
            onClick={() => setProfileMenu(true)}
          >
            Profile
          </button>

          <button
            className="btn w-[400px] hover:bg-[#f4f4f4] text-base"
            onClick={() => setControlMenu(true)}
          >
            Game Settings
          </button>
        </div>
      </div>
      {loader && <Loader />}
      <Header isHome={true} />
    </div>
  );
};

export default Home;
