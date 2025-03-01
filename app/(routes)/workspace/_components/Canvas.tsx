import React, { useEffect, useState } from 'react';
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Canvas({ onSaveTrigger, fileId, fileData }: { onSaveTrigger: any, fileId: any, fileData: FILE }) {
  
    const [whiteBoardData, setWhiteBoardData] = useState<any>();
    const updateWhiteboard = useMutation(api.files.updateWhiteboard);
    
    useEffect(() => {
        if (onSaveTrigger) {
            saveWhiteboard();
        }
    }, [onSaveTrigger]);
    
    const saveWhiteboard = () => {
        // If whiteBoardData is undefined, fallback to an empty array for a valid JSON string.
        const whiteboardStr = whiteBoardData ? JSON.stringify(whiteBoardData) : "[]";
        updateWhiteboard({
            _id: fileId,
            whiteboard: whiteboardStr
        }).then(resp => console.log(resp))
         .catch(err => console.error(err));
    };

    return (
        <div style={{ height: "670px" }}>
            {fileData && 
                <Excalidraw 
                    theme='light'
                    initialData={{
                        elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard)
                    }}
                    onChange={(excalidrawElements, appState, files) => setWhiteBoardData(excalidrawElements)}
                    UIOptions={{
                        canvasActions:{
                            saveToActiveFile: false,
                            loadScene: false,
                            export: false,
                            toggleTheme: false
                        }
                    }}
                >
                    <MainMenu>
                        <MainMenu.DefaultItems.ClearCanvas />
                        <MainMenu.DefaultItems.SaveAsImage />
                        <MainMenu.DefaultItems.ChangeCanvasBackground />
                    </MainMenu>
                    <WelcomeScreen>
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.ToolbarHint />
                        <WelcomeScreen.Center>
                            <WelcomeScreen.Center.MenuItemHelp />
                        </WelcomeScreen.Center>
                    </WelcomeScreen>
                </Excalidraw>
            }
        </div>
    );
}

export default Canvas;