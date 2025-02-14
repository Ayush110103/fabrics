"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import Canvas from '../_components/Canvas'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Split from "react-split";

function Workspace({params}: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE|any>();

  useEffect(() => {
    console.log("FILEID", params.fileId);
    params.fileId && getFileData();
  }, []);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, { _id: params.fileId });
    setFileData(result);
  };

  return (
    <div>
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />
      {/* Use react-split for draggable layout */}
      <Split
        sizes={[50, 50]}
        minSize={[300, 300]} // set minimum widths for both panels
        gutterSize={10}     // adjust the draggable divider's width
        direction="horizontal"
        className="flex h-screen"
      >
        {/* Editor panel */}
        <div className="overflow-hidden">
          <Editor
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
        {/* Canvas panel */}
        <div className="overflow-hidden border-l">
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
      </Split>
    </div>
  );
}

export default Workspace;