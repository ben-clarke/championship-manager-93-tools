export const UPLOAD_GAME_FILE = "Click to upload your games files";
export const UPLOAD_GAME_TIP =
  "You must select CMEXE.EXE, LEAGUE.DAT, FOREIGN.DAT and TEAM.DAT files.";
export const UPLOAD_GAME_TIP_2 = "This will generate human readable CSV files for you to edit.";

export const UPLOAD_EDIT_FILE = "Click to upload your edited files";
export const UPLOAD_EDIT_TIP =
  "You must select CMEXE.EXE, LEAGUE.DAT.csv, FOREIGN.DAT.csv and TEAM.DAT.csv files.";
export const UPLOAD_EDIT_TIP_2 =
  "This will convert your edited files back into binary files to be used in the game.";

export const UPLOAD_EXE_FILE = "Click to upload your CMEXE.EXE file";
export const UPLOAD_EXE_TIP = "You must select the CMEXE.EXE file.";
export const UPLOAD_EXE_TIP_2 =
  "This will convert your CMEXE.EXE file back into a CSV file with the contained data.";

export const UPLOAD_CSV_TO_EXE_FILE = "Click to upload your edited CMEXE file";
export const UPLOAD_CSV_TO_EXE_TIP = "You must select the CMEXE.EXE and CMEXE.EXE.csv files.";
export const UPLOAD_CSV_TO_EXE_TIP_2 =
  "This will convert your CMEXE.EXE.csv file back into a EXE file called CMEXE.EXE.new.";

export const UPLOAD_EDIT_FILE_FOREIGN = "Create your FOREIGN.DAT file";
export const UPLOAD_EDIT_FILE_LEAGUE = "Create your LEAGUE.DAT file";
export const UPLOAD_EDIT_FILE_TEAM = "Create your TEAM.DAT file";
export const UPLOAD_EDIT_TIP_FOREIGN = "You must select CMEXE.EXE and FOREIGN.DAT.csv files.";
export const UPLOAD_EDIT_TIP_LEAGUE = "You must select CMEXE.EXE and LEAGUE.DAT.csv files.";
export const UPLOAD_EDIT_TIP_TEAM = "You must select CMEXE.EXE and TEAM.DAT.csv files.";

export const UPLOAD_FILE_DRAG = " or drag and drop";

export const UPLOAD_DATA_PARSED = "Game edit CSV files have been saved to your downloads folder";

export const UPLOAD_EDIT_PARSED = "Game data files have been saved to your downloads folder";
export const UPLOAD_EDIT_EXE_PARSED = "Game EXE file has been saved to your downloads folder";

export const NAV_HEADING = "Championship Manager '93 editing";
export const NAV_CSV = "DAT -> CSV";
export const NAV_DAT = "CSV -> DAT";
export const NAV_EXE_CSV = "EXE -> CSV";
export const NAV_EXE = "CSV -> EXE";

export const DAT_HEADER = "Converting to human readable CSV";

export const DAT_INSTRUCTIONS_INTRO =
  "Upload your data files here. They will then be converted into a human readable spread sheet.";

export const DAT_SPREADSHEET_1 = "This will generate ";
export const DAT_SPREADSHEET_2 = "four";
export const DAT_SPREADSHEET_3 =
  " CSV spreadsheet files, three corresponding to the uploaded .DAT files and the final one detailing the available clubs, grounds, nationalities and names. This one cannot currently be re-uploaded.";

export const DAT_INSTRUCTIONS_PROGRAMS =
  "You can then use any standard spreadsheet program such as Excel, Numbers, OpenOffice Calc or even a simple text editor, however be aware that some of the programs will attempt to convert the CSV into a format they prefer - so don't allow that option.";

export const DAT_INSTRUCTIONS_DOWNLOADS =
  "The generated CSV files will be saved in your default downloads folder.";

export const DAT_INSTRUCTIONS_WARN =
  "Make any changes you require, but be careful of using anything, such as names, that are not in the CMEXE.EXE as this will result in a failure when converting your CSV files back again. CMEXE.EXE editing is currently not supported";
export const DAT_HELP =
  "You will need to select multiple files to upload - use the Ctrl button to click on multiple files (or command button on Mac)";

export const CSV_HEADER = "Convert CSV edits back into DAT files";

export const CSV_INSTRUCTIONS_1 =
  "Upload your CSV files (and CMEXE.EXE) here. They will then be converted back into .DAT files.";

export const CSV_INSTRUCTIONS_DISCLAIMER =
  "It is strongly recommended you make a backup of the .DAT files you are replacing, just in case the worst happens and you hit an obscure bug in the conversion tools.";

export const CSV_INSTRUCTIONS_WARN_1 = "You can upload ";
export const CSV_INSTRUCTIONS_WARN_2 = "ALL the files";
export const CSV_INSTRUCTIONS_WARN_3 =
  " or you can just select the CMEXE.EXE file and a single CSV file, this may be necessary if uploading all the files timeouts.";

export const CSV_INSTRUCTIONS_GENERATE_1 = "This will generate ";
export const CSV_INSTRUCTIONS_GENERATE_2 = "three";
export const CSV_INSTRUCTIONS_GENERATE_3 = " .DAT files corresponding to the uploaded CSV files.";

export const CSV_INSTRUCTIONS_LOCATION =
  "The generated .DAT files will be saved in your default downloads folder. You will then have to move these files into the correct CM93 folder for the game you are editing.";

export const CSV_NOTE_HEADER = "Note:";
export const CSV_NOTE_1 =
  " if you already have .DAT files in your downloads folder your browser will automatically rename them to something like ";
export const CSV_NOTE_EXAMPLE = "TEAMS (1).DAT";
export const CSV_NOTE_2 = ", you will need to rename them after moving to your CM93 folder.";
export const CSV_HELP =
  "You will need to select multiple files to upload - use the Ctrl button to click on multiple files (or command button on Mac). It may be easier to copy and CMEXE.EXE file into the same directory as your CSV files first.";

export const HOME_HEADER = "Welcome";
export const HOME_INTRO =
  "This is the home page of a number of tools to facilitate the editing of Championship Manger '93 era games.";
export const HOME_SUPPORTED = "The following versions are supported:";
export const HOME_SUPPORTED_VERSION = [
  "Championship Manager '93",
  "Championship Manager '93/94",
  "Championship Manager '94 (EOS)",
  "Championship Manager Italia",
  "Championship Manager Italia '95",
];
export const HOME_NOT_SUPPORTED = "The following versions are not currently supported:";
export const HOME_NOT_SUPPORTED_VERSION = ["Championship Manager Norge '95"];

export const HOME_FLOW = "There are currently two main editing flows possible:";
export const HOME_FLOWS = [
  "Editing DAT files by converting into human readable CSV files, making changes and then converting back.",
  "Editing the CMEXE.EXE file directly to change the available hardcoded values used in the DAT files, although there are many restrictions on editing this file.",
];

export const HOME_DAT_EDITING = "DAT editing";
export const HOME_DAT_EDITING_NOTE =
  "This uses data from the CMEXE file, so if you want to add new names or teams etc., it is recommended you edit the CMEXE file first and convert it back, before generating the DAT-CSV files, as the names will not be selectable until you do.";
export const HOME_CONVERT_DAT_TO_CSV = "Convert DAT files to CSV";
export const HOME_REVERT_DAT_FROM_CSV = "Revert CSV files back into to DAT";

export const HOME_EXE_EDITING = "CMEXE editing";
export const HOME_EXE_EDITING_NOTE =
  "Editing the CMEXE is very restricted as it is basically a binary file with very strict rules on what can be changed and how it can be changed.";
export const HOME_CONVERT_EXE_TO_CSV = "Convert CMEXE to CSV";
export const HOME_REVERT_EXE_FROM_CSV = "Revert CSV file back into to CMEXE";
