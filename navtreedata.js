var NAVTREE =
[
  [ "SEIMS", "index.html", [
    [ "A lightweight, modular, and parallelized watershed modeling framework", "index.html", [
      [ "Brief introduction", "index.html#BriefIntroduction", null ],
      [ "Get Started", "index.html#GetStarted", [
        [ "Get Source Code", "index.html#GetSourceCode", null ],
        [ "Compile & Install", "index.html#CompileInstall", null ],
        [ "Config MongoDB", "index.html#ConfigMongoDB", null ],
        [ "Run Demo Data", "index.html#RunDemoData", null ],
        [ "Build Your Own Model", "index.html#BuildYourOwnModel", null ]
      ] ],
      [ "Contact Us", "index.html#ContactUs", null ]
    ] ],
    [ "Download", "md_doc_en_doc_intro_download.html", [
      [ "Download compressed Zip file", "md_doc_en_doc_intro_download.html#DownloadZip", null ],
      [ "Version control by Git", "md_doc_en_doc_intro_download.html#UsingGit", [
        [ "Install Git", "md_doc_en_doc_intro_download.html#InstallGit", null ],
        [ "AutoCRLF or SafeCRLF", "md_doc_en_doc_intro_download.html#LineBreakIssue", null ],
        [ "Clone SEIMS from Github", "md_doc_en_doc_intro_download.html#CloneRepo", null ],
        [ "Synchronization and update", "md_doc_en_doc_intro_download.html#PullPush", null ],
        [ "Subtree operations", "md_doc_en_doc_intro_download.html#SubtreeAdmin", [
          [ "Add subtree", "md_doc_en_doc_intro_download.html#AddSubtree", null ]
        ] ],
        [ "Fetch upstream for updates", "md_doc_en_doc_intro_download.html#FetchUpstream", null ],
        [ "Push modification to upstream", "md_doc_en_doc_intro_download.html#PushOrigin", null ]
      ] ]
    ] ],
    [ "Prerequisites", "md_doc_en_doc_intro_prerequisites.html", [
      [ "CMake", "md_doc_en_doc_intro_prerequisites.html#CMake", null ],
      [ "C++ compiler", "md_doc_en_doc_intro_prerequisites.html#CppCompiler", null ],
      [ "MPI library", "md_doc_en_doc_intro_prerequisites.html#MPI", null ],
      [ "GDAL library", "md_doc_en_doc_intro_prerequisites.html#GDAL", null ],
      [ "MongoDB database and mongo-c-driver library", "md_doc_en_doc_intro_prerequisites.html#MongoDB", null ],
      [ "Python and 3rd-party packages", "md_doc_en_doc_intro_prerequisites.html#PythonPackages", null ]
    ] ],
    [ "Installation", "md_doc_en_doc_intro_install.html", [
      [ "Windows with Visual Studio", "md_doc_en_doc_intro_install.html#WindowsVisualStudio", null ],
      [ "Linux with GCC", "md_doc_en_doc_intro_install.html#LinuxGCC", null ],
      [ "macOS with Clang", "md_doc_en_doc_intro_install.html#macOSClang", null ]
    ] ],
    [ "Quick Start", "md_doc_en_doc_intro_quickstart.html", [
      [ "Data preprocessing", "md_doc_en_doc_intro_quickstart.html#Preprocessing", null ],
      [ "Run SEIMS-based model", "md_doc_en_doc_intro_quickstart.html#RunModel", null ],
      [ "Postprocessing", "md_doc_en_doc_intro_quickstart.html#Postprocessing", null ],
      [ "Calibration", "md_doc_en_doc_intro_quickstart.html#Calibration", null ]
    ] ],
    [ "Publications", "md_doc_en_doc_intro_publications.html", [
      [ "Peer-reviewed journal papers", "md_doc_en_doc_intro_publications.html#PeerReviewedJournalPapers", [
        [ "Modeling framework related", "md_doc_en_doc_intro_publications.html#ModelingFramework", null ],
        [ "BMPs scenario analysis", "md_doc_en_doc_intro_publications.html#BMPsScenarioAnalysis", null ],
        [ "Reviews of watershed modeling and scenario analysis", "md_doc_en_doc_intro_publications.html#ReviewsWatershedModelingScenarioAnalysis", null ]
      ] ],
      [ "Dissertations", "md_doc_en_doc_intro_publications.html#Dissertations", null ]
    ] ],
    [ "SEIMS organization", "md_doc_en_doc_guide_organization.html", [
      [ "Program structure", "md_doc_en_doc_guide_organization.html#ProgramStructure", null ],
      [ "Call format of main program", "md_doc_en_doc_guide_organization.html#MainInvoke", null ]
    ] ],
    [ "Data preparation", "md_doc_en_doc_guide_datapreparation.html", [
      [ "Basic text format", "md_doc_en_doc_guide_datapreparation.html#BasicTextFormat", null ],
      [ "Precipitation data", "md_doc_en_doc_guide_datapreparation.html#Precipitation", null ],
      [ "Climate data", "md_doc_en_doc_guide_datapreparation.html#Climate", null ],
      [ "Spatial data", "md_doc_en_doc_guide_datapreparation.html#Spatial", [
        [ "DEM", "md_doc_en_doc_guide_datapreparation.html#DEM", null ],
        [ "Climate stations", "md_doc_en_doc_guide_datapreparation.html#Stations", null ],
        [ "Soil data", "md_doc_en_doc_guide_datapreparation.html#Soil", null ],
        [ "Landuse data", "md_doc_en_doc_guide_datapreparation.html#Landuse", null ],
        [ "Landcover data", "md_doc_en_doc_guide_datapreparation.html#Landcover", null ]
      ] ]
    ] ],
    [ "IDE and coding protocol", "md_doc_en_doc_technical_codeprotocol.html", [
      [ "Recommended IDE", "md_doc_en_doc_technical_codeprotocol.html#RecommendedIDE", null ],
      [ "Git branch", "md_doc_en_doc_technical_codeprotocol.html#GitBranch", null ],
      [ "Coding style", "md_doc_en_doc_technical_codeprotocol.html#CodingStyle", [
        [ "C++", "md_doc_en_doc_technical_codeprotocol.html#CppStyle", null ],
        [ "Python", "md_doc_en_doc_technical_codeprotocol.html#PythonStyle", null ]
      ] ]
    ] ],
    [ "SEIMS code structure", "md_doc_en_doc_technical_codestructure.html", [
      [ "Overall code tree", "md_doc_en_doc_technical_codestructure.html#OverallCodeTree", null ],
      [ "CMake structure", "md_doc_en_doc_technical_codestructure.html#CMakeStructure", null ],
      [ "Python tools", "md_doc_en_doc_technical_codestructure.html#PythonTools", null ]
    ] ],
    [ "Workflow of main simulation", "md_doc_en_doc_technical_simulationworkflow.html", [
      [ "OpenMP version", "md_doc_en_doc_technical_simulationworkflow.html#OpenMPVersion", null ],
      [ "MPI&OpenMP version", "md_doc_en_doc_technical_simulationworkflow.html#MPIOpenMPVersion", null ]
    ] ],
    [ "Modular structure", "md_doc_en_doc_technical_modular.html", [
      [ "Module interface", "md_doc_en_doc_technical_modular.html#ModuleInterface", null ],
      [ "Steps of developing a new module", "md_doc_en_doc_technical_modular.html#ModuleDevSteps", null ]
    ] ],
    [ "Parallel computing middleware", "md_doc_en_doc_technical_parallelcomputing.html", [
      [ "Spatial discritization", "md_doc_en_doc_technical_parallelcomputing.html#SpatialDiscretization", null ],
      [ "Basic-unit level parallelization", "md_doc_en_doc_technical_parallelcomputing.html#BasicUnitLevel", null ],
      [ "Subbasin level parallelization", "md_doc_en_doc_technical_parallelcomputing.html#SubbasinLevel", null ],
      [ "Model level parallelization", "md_doc_en_doc_technical_parallelcomputing.html#ModelLevel", null ]
    ] ],
    [ "Database design", "md_doc_en_doc_technical_database.html", [
      [ "Requirement analysis", "md_doc_en_doc_technical_database.html#Requirements", null ],
      [ "Data structure", "md_doc_en_doc_technical_database.html#DataStructure", null ],
      [ "Database selection", "md_doc_en_doc_technical_database.html#DBSelection", null ],
      [ "Implementation and extension", "md_doc_en_doc_technical_database.html#Implementation", null ]
    ] ],
    [ "Main watershed processes", "md_doc_en_doc_theory_watershedprocesses.html", [
      [ "Basic framework of distributed watershed process-based models", "md_doc_en_doc_theory_watershedprocesses.html#BaseFrame", null ],
      [ "Hydrology", "md_doc_en_doc_theory_watershedprocesses.html#Hydrology", null ],
      [ "Erosion", "md_doc_en_doc_theory_watershedprocesses.html#Erosion", null ],
      [ "Plant growth", "md_doc_en_doc_theory_watershedprocesses.html#PlantGrowth", null ],
      [ "Nutrient cycling", "md_doc_en_doc_theory_watershedprocesses.html#NutrientCycling", null ]
    ] ],
    [ "Todo List", "todo.html", null ],
    [ "Modules", "modules.html", "modules" ],
    [ "Namespaces", null, [
      [ "Namespace List", "namespaces.html", "namespaces" ],
      [ "Namespace Members", "namespacemembers.html", [
        [ "All", "namespacemembers.html", null ],
        [ "Functions", "namespacemembers_func.html", null ],
        [ "Typedefs", "namespacemembers_type.html", null ]
      ] ]
    ] ],
    [ "Classes", "annotated.html", [
      [ "Class List", "annotated.html", "annotated_dup" ],
      [ "Class Hierarchy", "hierarchy.html", "hierarchy" ],
      [ "Class Members", "functions.html", [
        [ "All", "functions.html", "functions_dup" ],
        [ "Functions", "functions_func.html", "functions_func" ],
        [ "Variables", "functions_vars.html", null ]
      ] ]
    ] ],
    [ "Files", null, [
      [ "File List", "files.html", "files" ],
      [ "File Members", "globals.html", [
        [ "All", "globals.html", null ],
        [ "Functions", "globals_func.html", null ],
        [ "Variables", "globals_vars.html", null ],
        [ "Typedefs", "globals_type.html", null ],
        [ "Enumerations", "globals_enum.html", null ],
        [ "Enumerator", "globals_eval.html", null ],
        [ "Macros", "globals_defs.html", null ]
      ] ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"_b_m_p_areal_source_factory_8h.html",
"classbmps_1_1_b_m_p_plant_mgt_factory.html#a3ebb8ae1dec184906e0f987d2a5f2a04",
"dir_c4eaa6a6e6c4ee7b087e3de60cab1bbc.html",
"group__data.html#a9008da40f8e418b817446df7fc67d406",
"group__seims__mpi.html",
"utils__math_8h.html#af20e7b88a1be2b79ba671870dbc488f6"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';