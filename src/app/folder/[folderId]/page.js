"use client";

import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useParams, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { app } from "@/cofig/Firebase";
import { useSession } from "next-auth/react";
import FolderList from "@/components/folder/FolderList";
import { ToastContent } from "@/context/ToastContext";

const ForDetail = () => {
  const { folderId } = useParams();
  const queryParams = useSearchParams();
  const name = queryParams.get("name");
  const [folderList, setFolderList] = useState([]);
  const { showToastMsg, setShowToastMsg } = useContext(ToastContent);
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );

  const { data: session } = useSession();

  const db = getFirestore(app);

  useEffect(() => {
    setParentFolderId(folderId);
    if (session) {
      getFolderList();
    }
  }, [folderId, session, showToastMsg]);

  const getFolderList = async () => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("createdBy", "==", session.user?.name),
      where("parentFolderId", "==", folderId)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setFolderList((folderList) => [...folderList, doc.data()]);
    });
  };

  return (
    <div>
      ForDetail {folderId} : {name}
      <FolderList folderList={folderList}/>
    </div>
  );
};

export default ForDetail;
