[Setup]
AppName=VinzapAI
AppVersion=1.0.0
AppPublisher=VinzapAI Technologies
AppPublisherURL=https://github.com/yourusername/vinzapai
DefaultDirName={localappdata}\VinzapAI
DefaultGroupName=VinzapAI
PrivilegesRequired=lowest
OutputBaseFilename=VinzapAI_Setup
OutputDir=..\Output
Compression=lzma2/ultra64
SolidCompression=yes
UninstallDisplayIcon={app}\VinzapAI_Server.exe
WizardStyle=modern
DisableProgramGroupPage=yes

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "vinzapai-backend\dist\VinzapAI_Server\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autoprograms}\VinzapAI"; Filename: "{app}\VinzapAI_Server.exe"; IconFilename: "{app}\VinzapAI_Server.exe"
Name: "{autodesktop}\VinzapAI"; Filename: "{app}\VinzapAI_Server.exe"; IconFilename: "{app}\VinzapAI_Server.exe"; Tasks: desktopicon

[Run]
Filename: "{app}\VinzapAI_Server.exe"; Description: "{cm:LaunchProgram,VinzapAI}"; Flags: nowait postinstall skipifsilent

[Registry]
Root: "HKCU"; Subkey: "Software\VinzapAI"; Flags: uninsdeletekeyifempty
Root: "HKCU"; Subkey: "Software\VinzapAI\VinzapAI_Server"; ValueType: string; ValueName: "InstallPath"; ValueData: "{app}"; Flags: uninsdeletevalue
