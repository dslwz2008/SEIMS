var NAVTREE =
[
  [ "SEIMS", "index.html", [
    [ "SEIMS：轻量级、模块化、并行化的流域建模框架", "index.html", null ],
    [ "下载", "md_doc_zh-cn_doc_intro_download_8zh-cn.html", [
      [ "直接下载Zip", "md_doc_zh-cn_doc_intro_download_8zh-cn.html#DownloadZip", null ],
      [ "利用Git管理源码", "md_doc_zh-cn_doc_intro_download_8zh-cn.html#UsingGit", [
        [ "安装Git", "md_doc_zh-cn_doc_intro_download_8zh-cn.html#InstallGit", null ],
        [ "Git中AutoCRLF与SafeCRLF换行符问题", "md_doc_zh-cn_doc_intro_download_8zh-cn.html#LineBreakIssue", null ],
        [ "从Github中克隆代码库及代码修改", "md_doc_zh-cn_doc_intro_download_8zh-cn.html#CloneRepo", null ],
        [ "代码同步与更新", "md_doc_zh-cn_doc_intro_download_8zh-cn.html#PullPush", null ],
        [ "Subtree操作", "md_doc_zh-cn_doc_intro_download_8zh-cn.html#SubtreeAdmin", [
          [ "第一次添加子目录，并建立与git项目的关联", "md_doc_zh-cn_doc_intro_download_8zh-cn.html#AddSubtree", null ]
        ] ],
        [ "从远程仓库更新子目录", "md_doc_zh-cn_doc_intro_download_8zh-cn.html#FetchUpstream", null ],
        [ "从子目录push到远程仓库（确认你有写权限）", "md_doc_zh-cn_doc_intro_download_8zh-cn.html#PushOrigin", null ]
      ] ]
    ] ],
    [ "依赖环境", "md_doc_zh-cn_doc_intro_prerequisites_8zh-cn.html", [
      [ "CMake", "md_doc_zh-cn_doc_intro_prerequisites_8zh-cn.html#CMake", null ],
      [ "C++编译环境", "md_doc_zh-cn_doc_intro_prerequisites_8zh-cn.html#CppCompiler", null ],
      [ "MPI库", "md_doc_zh-cn_doc_intro_prerequisites_8zh-cn.html#MPI", null ],
      [ "GDAL库", "md_doc_zh-cn_doc_intro_prerequisites_8zh-cn.html#GDAL", null ],
      [ "MongoDB数据库及mongo-c-driver库", "md_doc_zh-cn_doc_intro_prerequisites_8zh-cn.html#MongoDB", null ],
      [ "Python及第三方包", "md_doc_zh-cn_doc_intro_prerequisites_8zh-cn.html#PythonPackages", null ]
    ] ],
    [ "安装", "md_doc_zh-cn_doc_intro_install_8zh-cn.html", [
      [ "Windows和Visual Studio", "md_doc_zh-cn_doc_intro_install_8zh-cn.html#WindowsVisualStudio", null ],
      [ "Linux和GCC", "md_doc_zh-cn_doc_intro_install_8zh-cn.html#LinuxGCC", null ],
      [ "macOS和Clang", "md_doc_zh-cn_doc_intro_install_8zh-cn.html#macOSClang", null ]
    ] ],
    [ "快速开始", "md_doc_zh-cn_doc_intro_quickstart_8zh-cn.html", [
      [ "数据预处理", "md_doc_zh-cn_doc_intro_quickstart_8zh-cn.html#Preprocessing", null ],
      [ "运行模型", "md_doc_zh-cn_doc_intro_quickstart_8zh-cn.html#RunModel", null ],
      [ "查看结果", "md_doc_zh-cn_doc_intro_quickstart_8zh-cn.html#Postprocessing", null ],
      [ "模型率定", "md_doc_zh-cn_doc_intro_quickstart_8zh-cn.html#Calibration", null ]
    ] ],
    [ "文章著作", "md_doc_zh-cn_doc_intro_publications_8zh-cn.html", [
      [ "期刊文章", "md_doc_zh-cn_doc_intro_publications_8zh-cn.html#PeerReviewedJournalPapers", [
        [ "流域建模框架相关", "md_doc_zh-cn_doc_intro_publications_8zh-cn.html#ModelingFramework", null ],
        [ "流域最佳管理措施（BMPs）情景分析", "md_doc_zh-cn_doc_intro_publications_8zh-cn.html#BMPsScenarioAnalysis", null ],
        [ "流域过程模拟与情景分析相关综述", "md_doc_zh-cn_doc_intro_publications_8zh-cn.html#ReviewsWatershedModelingScenarioAnalysis", null ]
      ] ],
      [ "学位论文", "md_doc_zh-cn_doc_intro_publications_8zh-cn.html#Dissertations", null ]
    ] ],
    [ "SEIMS组织结构", "md_doc_zh-cn_doc_guide_organization_8zh-cn.html", [
      [ "程序目录结构", "md_doc_zh-cn_doc_guide_organization_8zh-cn.html#ProgramStructure", null ],
      [ "主程序调用格式", "md_doc_zh-cn_doc_guide_organization_8zh-cn.html#MainInvoke", null ]
    ] ],
    [ "数据准备", "md_doc_zh-cn_doc_guide_datapreparation_8zh-cn.html", [
      [ "文本数据基本格式", "md_doc_zh-cn_doc_guide_datapreparation_8zh-cn.html#BasicTextFormat", null ],
      [ "降水数据", "md_doc_zh-cn_doc_guide_datapreparation_8zh-cn.html#Precipitation", null ],
      [ "气象数据", "md_doc_zh-cn_doc_guide_datapreparation_8zh-cn.html#Climate", null ],
      [ "空间数据", "md_doc_zh-cn_doc_guide_datapreparation_8zh-cn.html#Spatial", [
        [ "DEM", "md_doc_zh-cn_doc_guide_datapreparation_8zh-cn.html#DEM", null ],
        [ "降水气象站点位置", "md_doc_zh-cn_doc_guide_datapreparation_8zh-cn.html#Stations", null ],
        [ "土壤数据", "md_doc_zh-cn_doc_guide_datapreparation_8zh-cn.html#Soil", null ],
        [ "土地利用数据", "md_doc_zh-cn_doc_guide_datapreparation_8zh-cn.html#Landuse", null ],
        [ "植被覆盖数据", "md_doc_zh-cn_doc_guide_datapreparation_8zh-cn.html#Landcover", null ]
      ] ]
    ] ],
    [ "开发环境及代码规范", "md_doc_zh-cn_doc_technical_codeprotocol_8zh-cn.html", [
      [ "开发环境推荐", "md_doc_zh-cn_doc_technical_codeprotocol_8zh-cn.html#RecommendedIDE", null ],
      [ "Git分支管理", "md_doc_zh-cn_doc_technical_codeprotocol_8zh-cn.html#GitBranch", null ],
      [ "代码风格规范", "md_doc_zh-cn_doc_technical_codeprotocol_8zh-cn.html#CodingStyle", [
        [ "C++", "md_doc_zh-cn_doc_technical_codeprotocol_8zh-cn.html#CppStyle", null ],
        [ "Python", "md_doc_zh-cn_doc_technical_codeprotocol_8zh-cn.html#PythonStyle", null ]
      ] ]
    ] ],
    [ "SEIMS代码结构", "md_doc_zh-cn_doc_technical_codestructure_8zh-cn.html", [
      [ "整体代码文件树", "md_doc_zh-cn_doc_technical_codestructure_8zh-cn.html#OverallCodeTree", null ],
      [ "CMake结构", "md_doc_zh-cn_doc_technical_codestructure_8zh-cn.html#CMakeStructure", null ],
      [ "Python工具", "md_doc_zh-cn_doc_technical_codestructure_8zh-cn.html#PythonTools", null ]
    ] ],
    [ "SEIMS主程序模拟工作流", "md_doc_zh-cn_doc_technical_simulationworkflow_8zh-cn.html", [
      [ "OpenMP版本", "md_doc_zh-cn_doc_technical_simulationworkflow_8zh-cn.html#OpenMPVersion", null ],
      [ "MPI&OpenMP版本", "md_doc_zh-cn_doc_technical_simulationworkflow_8zh-cn.html#MPIOpenMPVersion", null ]
    ] ],
    [ "模块化结构", "md_doc_zh-cn_doc_technical_modular_8zh-cn.html", [
      [ "模块接口", "md_doc_zh-cn_doc_technical_modular_8zh-cn.html#ModuleInterface", null ],
      [ "开发新模块的一般步骤", "md_doc_zh-cn_doc_technical_modular_8zh-cn.html#ModuleDevSteps", null ]
    ] ],
    [ "并行计算中间件", "md_doc_zh-cn_doc_technical_parallelcomputing_8zh-cn.html", [
      [ "空间离散化", "md_doc_zh-cn_doc_technical_parallelcomputing_8zh-cn.html#SpatialDiscretization", null ],
      [ "基本计算单元层次的并行化", "md_doc_zh-cn_doc_technical_parallelcomputing_8zh-cn.html#BasicUnitLevel", null ],
      [ "子流域层次的并行化", "md_doc_zh-cn_doc_technical_parallelcomputing_8zh-cn.html#SubbasinLevel", null ],
      [ "模型层次的并行化", "md_doc_zh-cn_doc_technical_parallelcomputing_8zh-cn.html#ModelLevel", null ]
    ] ],
    [ "数据库设计", "md_doc_zh-cn_doc_technical_database_8zh-cn.html", [
      [ "需求分析", "md_doc_zh-cn_doc_technical_database_8zh-cn.html#Requirements", null ],
      [ "数据结构", "md_doc_zh-cn_doc_technical_database_8zh-cn.html#DataStructure", null ],
      [ "数据库选型", "md_doc_zh-cn_doc_technical_database_8zh-cn.html#DBSelection", null ],
      [ "代码实现和扩展", "md_doc_zh-cn_doc_technical_database_8zh-cn.html#Implementation", null ]
    ] ],
    [ "主要流域过程", "md_doc_zh-cn_doc_theory_watershedprocesses_8zh-cn.html", [
      [ "分布式流域过程模型基本框架", "md_doc_zh-cn_doc_theory_watershedprocesses_8zh-cn.html#BaseFrame", null ],
      [ "水文过程", "md_doc_zh-cn_doc_theory_watershedprocesses_8zh-cn.html#Hydrology", null ],
      [ "侵蚀过程", "md_doc_zh-cn_doc_theory_watershedprocesses_8zh-cn.html#Erosion", null ],
      [ "植物生长过程", "md_doc_zh-cn_doc_theory_watershedprocesses_8zh-cn.html#PlantGrowth", null ],
      [ "养分循环过程", "md_doc_zh-cn_doc_theory_watershedprocesses_8zh-cn.html#NutrientCycling", null ]
    ] ],
    [ "待办事项列表", "todo.html", null ],
    [ "弃用列表", "deprecated.html", null ],
    [ "模块", "modules.html", "modules" ],
    [ "命名空间", null, [
      [ "命名空间列表", "namespaces.html", "namespaces" ],
      [ "命名空间成员", "namespacemembers.html", [
        [ "全部", "namespacemembers.html", null ],
        [ "函数", "namespacemembers_func.html", null ],
        [ "类型定义", "namespacemembers_type.html", null ]
      ] ]
    ] ],
    [ "类", "annotated.html", [
      [ "类列表", "annotated.html", "annotated_dup" ],
      [ "类继承关系", "hierarchy.html", "hierarchy" ],
      [ "类成员", "functions.html", [
        [ "全部", "functions.html", "functions_dup" ],
        [ "函数", "functions_func.html", "functions_func" ],
        [ "变量", "functions_vars.html", null ]
      ] ]
    ] ],
    [ "文件", null, [
      [ "文件列表", "files.html", "files" ],
      [ "文件成员", "globals.html", [
        [ "全部", "globals.html", "globals_dup" ],
        [ "函数", "globals_func.html", null ],
        [ "变量", "globals_vars.html", null ],
        [ "类型定义", "globals_type.html", null ],
        [ "枚举", "globals_enum.html", null ],
        [ "枚举值", "globals_eval.html", null ],
        [ "宏定义", "globals_defs.html", null ]
      ] ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"_b_m_p_areal_source_factory_8h.html",
"classbmps_1_1_b_m_p_plant_mgt_factory.html#a709730f39091345fcc8f12a151e70c6b",
"dir_24d0af58b2644ad205aa9a0d9adbb65a.html",
"group__data.html#a6b467dd2cfa003c57e1609f59cd23c5b",
"group__module__setting.html#ad38e9f3ef28b26f42bfaaf834a9a9f32",
"structccgl_1_1utils__time_1_1_date_time.html#aeaf742c83e00def43e48ca61d65f4944"
];

var SYNCONMSG = '点击 关闭 面板同步';
var SYNCOFFMSG = '点击 开启 面板同步';