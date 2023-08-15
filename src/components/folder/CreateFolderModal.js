import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { app } from "../../cofig/Firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ToastContent } from "@/context/ToastContext";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";

function CreateFolderModal() {
  const [folderName, setFolderName] = useState();
  const db = getFirestore(app);
  const docId = Date.now().toString();
  const { showToastMsg, setShowToastMsg } = useContext(ToastContent);
  const { data: session } = useSession();
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );

  const onCreate = async () => {
    console.log(folderName);
    await setDoc(doc(db, "Folders", docId), {
      name: folderName,
      id: docId,
      createdBy: session.user?.name,
      parentFolderId: parentFolderId
    });
    setFolderName("");
    setShowToastMsg("Folder created successfully!");
  };
  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div
          className="w-full items-center 
        flex flex-col justify-center gap-3"
        >
          <Image src="/folder.png" alt="folder" width={50} height={50} />
          <input
            type="text"
            placeholder="Folder Name"
            className="p-2 border-[1px] outline-none
                rounded-md"
            value={folderName || ""}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button
            className="bg-blue-500
          text-white rounded-md p-2 px-3 w-full"
            onClick={() => onCreate()}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateFolderModal;
