import c4d, subprocess

TOOL_NAME = "EXE LOADER" 
EXE_PATH = "C:\\WINDOWS\\system32\\cmd.exe"
ARGS = [EXE_PATH, "/K", "echo", "--silent"]

ID_BTN_START = 1001
ID_BTN_POLL  = 1002
ID_BTN_WAIT  = 1003
ID_BTN_KILL  = 1004

class spLoaderDialog(c4d.gui.GeDialog):
    def __init__(self, EXE_PATH, ARGS):
        super(spLoaderDialog, self).__init__()
        self.EXE_PATH = EXE_PATH
        self.ARGS = ARGS
        self.process = None

    def CreateLayout(self):
        self.SetTitle(TOOL_NAME)

        self.GroupBegin(0, c4d.BFH_SCALEFIT, cols=1, rows=4)
        self.GroupBorderSpace(10, 10, 10, 10)
        self.GroupSpace(0, 4)

        self.AddButton(ID_BTN_START, c4d.BFH_SCALEFIT, name="subprocess.Popen")
        self.AddButton(ID_BTN_POLL,  c4d.BFH_SCALEFIT, name="p.poll()")
        self.AddButton(ID_BTN_WAIT,  c4d.BFH_SCALEFIT, name="p.wait()")
        self.AddButton(ID_BTN_KILL,  c4d.BFH_SCALEFIT, name="p.kill()")

        self.GroupEnd()
        return True

    def Command(self, id, msg):
        if id == ID_BTN_START:
            if self.process and self.process.poll() is None:
                c4d.gui.MessageDialog("Process already started!")
                return True
            try:
                self.process = subprocess.Popen(self.ARGS, creationflags=0x00000010)
            except Exception as e:
                c4d.gui.MessageDialog("Error: {}".format(e))

        elif id == ID_BTN_POLL:
                status = self.process.poll()
                if status is None:
                    print("[{}][poll] None -> current working".format(TOOL_NAME))
                else:
                    print("[{}][poll] {status} -> complete".format(TOOL_NAME))

        elif id == ID_BTN_WAIT:
            if self.process:
                print("[{}][wait] Block Interface...".format(TOOL_NAME))
                status = self.process.wait()

        elif id == ID_BTN_KILL:
            if self.process or self.process.poll() is not None:
                self.process.kill()

        return True


def main():
    global PANEL
    PANEL = spLoaderDialog(EXE_PATH, ARGS)
    PANEL.Open(dlgtype=c4d.DLG_TYPE_ASYNC, defaultw=300, defaulth=150)

if __name__=='__main__':
    main()