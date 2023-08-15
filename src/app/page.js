"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import FolderList from "@/components/folder/FolderList";
import FileList from "@/components/file/FileList";
import toast from "react-hot-toast";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/cofig/Firebase";
import { ToastContent } from "@/context/ToastContext";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";

export default function Home() {
  const { data: session, status } = useSession();
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const router = useRouter();
  const { showToastMsg, setShowToastMsg } = useContext(ToastContent);
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );

  const db = getFirestore(app);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getFolderList();
      getFileList();
    }
    toast.success(showToastMsg, {
      duration: 3000,
      position: "top-right",
    });
    setParentFolderId(0);
  }, [session, showToastMsg]);

  // console.log("showMsg", showToastMsg);

  const getFolderList = async () => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("createdBy", "==", session.user?.name),
      where("parentFolderId", "==", 0)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setFolderList((folderList) => [...folderList, doc.data()]);
    });
  };

  const getFileList = async () => {
    setFileList([]);
    const q = query(
      collection(db, "files"),
      where("createdBy", "==", session.user?.email),
      where("parentFolderId", "==", 0)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setFileList((fileList) => [...fileList, doc.data()]);
    });
  };

  return (
    <>
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </>
  );
}
