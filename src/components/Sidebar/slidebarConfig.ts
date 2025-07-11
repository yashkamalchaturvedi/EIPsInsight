// sidebarConfig.ts
import {
  LuHome,
  LuWrench,
  LuInfo,
  LuBarChartBig,
  LuDatabase,
  LuSearch,
  LuCheckCircle2,
  LuArchive,
  LuClock4,
  LuEye,
  LuFileText,
  LuBan,
  LuPauseCircle,
  LuListChecks,
  LuUsers,
  LuBookOpen,
  LuGitBranch,
  LuGitPullRequest,
  LuGitCommit,
  LuPieChart,
  LuNetwork,
  LuTable,
  LuSparkles,
  LuSmile,
  LuClipboardList,
  LuTrendingUp,
  LuQuote,
  LuFileSignature,
  LuListTree,
  LuTrophy,
  LuBarChart2,
  LuRocket,
  LuGithub
} from "react-icons/lu";

export const sidebarGroupIcons: Record<string, React.ElementType> = {
  "/": LuHome,
  "/home": LuHome,
  "/About": LuInfo,
  "/all": LuSearch,
  "/milestones2024": LuClipboardList,
  "/trivia": LuSparkles,
  "/status": LuPieChart,
  "/issue": LuGitBranch,
  "/PR": LuGitPullRequest,
  "/eips": LuFileText,
  "/ercs": LuFileText,
  "/rips": LuFileText,
  "/insight": LuEye,
  "/rip": LuGitCommit,
  "/eip":  LuBarChart2,
  "/upgrade": LuRocket,
  "/resources": LuRocket,
};

export const sidebarConfig: Record<
  string,
  { label: string; icon: React.ElementType; id: string }[]
> = {
  "/": [
    { label: "All EIPs", icon: LuHome, id: "all" },
    { label: "Our Tools", icon: LuWrench, id: "ourtools" },
    { label: "What is EIPs Insights?", icon: LuInfo, id: "what" },
    {
      label: "EIP Status Changes by Year",
      icon: LuBarChartBig,
      id: "statuschanges",
    },
    { label: "Dashboard", icon: LuDatabase, id: "dashboard" },
  ],
  "/About": [{ label: "What is EIPs Insights", icon: LuInfo, id: "what" }],
  "/resources": [{ label: "What is EIPs Insights", icon: LuInfo, id: "what" }],
  // "/all": [
  //   { label: "Search EIP", icon: LuSearch, id: "searchEIP" },
  //   { label: "Living", icon: LuCheckCircle2, id: "living" },
  //   { label: "Final", icon: LuArchive, id: "final" },
  //   { label: "Last Call", icon: LuClock4, id: "lastcall" },
  //   { label: "Review", icon: LuEye, id: "review" },
  //   { label: "Draft", icon: LuFileText, id: "draft" },
  //   { label: "Withdrawn", icon: LuBan, id: "withdrawn" },
  //   { label: "Stagnant", icon: LuPauseCircle, id: "stagnant" },
  // ],
  "/milestones2024": [
    {
      label: "Analytics Scheduler",
      icon: LuClipboardList,
      id: "analytics-scheduler",
    },
    { label: "Reviewers Tracker", icon: LuUsers, id: "reviewers-tracker" },
    { label: "EIP Board", icon: LuListTree, id: "eip-board" },
    { label: "Search Tool", icon: LuSearch, id: "search-tool" },
    {
      label: "Pectra Network Upgrade",
      icon: LuTrendingUp,
      id: "pectra-upgrade",
    },
    {
      label: "Detailed Network Upgrade Information",
      icon: LuBookOpen,
      id: "network-info",
    },
    { label: "Gratitude", icon: LuSmile, id: "gratitude" },
    { label: "Conclusion", icon: LuQuote, id: "conclusion" },
  ],
  "/trivia": [
    { label: "Cool EIP Facts", icon: LuSparkles, id: "cool-facts" },
    { label: "Fun EIP Facts", icon: LuSmile, id: "fun-facts" },
  ],
  "/status": [
    { label: "Draft vs Final", icon: LuGitCommit, id: "draft-vs-final" },
    { label: "Draft", icon: LuFileText, id: "draft" },
    { label: "Review", icon: LuEye, id: "review" },
    { label: "Last Call", icon: LuClock4, id: "lastcall" },
    { label: "Final", icon: LuArchive, id: "final" },
    { label: "Stagnant", icon: LuPauseCircle, id: "stagnant" },
    { label: "Withdrawn", icon: LuBan, id: "withdrawn" },
    { label: "Living", icon: LuCheckCircle2, id: "living" },
  ],
  "/issue": [
    { label: "Description", icon: LuInfo, id: "description" },
    { label: "All Conversations", icon: LuGitBranch, id: "conversations" },
  ],
  "/PR": [
    { label: "Description", icon: LuInfo, id: "description" },
    { label: "All Conversations", icon: LuGitPullRequest, id: "conversations" },
    { label: "Review Comments", icon: LuListChecks, id: "review-comments" },
  ],
  "/eips": [
    { label: "Status Timeline", icon: LuBarChartBig, id: "timeline" },
    { label: "Simple Summary", icon: LuFileText, id: "summary" },
    { label: "Abstract", icon: LuFileSignature, id: "abstract" },
    { label: "Motivation", icon: LuTrendingUp, id: "motivation" },
    { label: "Specification", icon: LuClipboardList, id: "specification" },
    { label: "Rationale", icon: LuBookOpen, id: "rationale" },
    {
      label: "Backwards Compatibility",
      icon: LuGitBranch,
      id: "compatibility",
    },
    { label: "Copyright", icon: LuTrophy, id: "copyright" },
  ],
  "/ercs": [
    { label: "Status Timeline", icon: LuBarChartBig, id: "timeline" },
    { label: "Simple Summary", icon: LuFileText, id: "summary" },
    { label: "Abstract", icon: LuFileSignature, id: "abstract" },
    { label: "Motivation", icon: LuTrendingUp, id: "motivation" },
    { label: "Specification", icon: LuClipboardList, id: "specification" },
    { label: "Rationale", icon: LuBookOpen, id: "rationale" },
    {
      label: "Backwards Compatibility",
      icon: LuGitBranch,
      id: "compatibility",
    },
    { label: "Copyright", icon: LuTrophy, id: "copyright" },
  ],
  "/rips": [
    { label: "Status Timeline", icon: LuBarChartBig, id: "timeline" },
    { label: "Simple Summary", icon: LuFileText, id: "summary" },
    { label: "Abstract", icon: LuFileSignature, id: "abstract" },
    { label: "Motivation", icon: LuTrendingUp, id: "motivation" },
    { label: "Specification", icon: LuClipboardList, id: "specification" },
    { label: "Rationale", icon: LuBookOpen, id: "rationale" },
    {
      label: "Backwards Compatibility",
      icon: LuGitBranch,
      id: "compatibility",
    },
    { label: "Copyright", icon: LuTrophy, id: "copyright" },
  ],
  "/insight": [
    { label: "Summary", icon: LuFileText, id: "Summary" },
    { label: "Draft", icon: LuFileText, id: "draft" },
    { label: "Review", icon: LuEye, id: "review" },
    { label: "Last Call", icon: LuClock4, id: "lastcall" },
    { label: "Living", icon: LuCheckCircle2, id: "living" },
    { label: "Final", icon: LuArchive, id: "final" },
    { label: "Stagnant", icon: LuPauseCircle, id: "stagnant" },
    { label: "Withdrawn", icon: LuBan, id: "withdrawn" },
  ],
  // '/Reviewers': [
  //   { label: 'Editors & Reviewers Leaderboard', icon: LuTrophy, id: 'leaderboard' },
  //   { label: 'Leaderboard FAQ', icon: LuInfo, id: 'faq' },
  //   { label: 'Active Editors Timeline Scatterplot', icon: LuBarChartBig, id: 'scatterplot' },
  //   { label: 'PRs Reviewed (Monthly, since 2015)', icon: LuPieChart, id: 'monthly-prs' },
  //   { label: 'Editors', icon: LuUsers, id: 'editors' },
  //   { label: 'Reviewers', icon: LuUsers, id: 'reviewers' },
  //   { label: 'Active Editors PR reviews in each Repository', icon: LuGitBranch, id: 'active-prs' }
  // ],
  "/rip": [
    { label: "Graphs", icon: LuBarChartBig, id: "graphs" },
    { label: "Draft vs Final", icon: LuBarChart2, id: "draftvsfinal" },
    { label: "Draft", icon: LuFileText, id: "draft" },
    { label: "Final", icon: LuArchive, id: "final" },
    { label: "Living", icon: LuCheckCircle2, id: "living" },
    { label: "Meta", icon: LuListChecks, id: "meta" },
    { label: "Informational", icon: LuListChecks, id: "informational" },
    { label: "Core", icon: LuHome, id: "core" },
    { label: "Networking", icon: LuListChecks, id: "networking" },
    { label: "Interface", icon: LuListChecks, id: "interface" },
    { label: "RIP", icon: LuInfo, id: "rip" },
    { label: "RRC", icon: LuFileSignature, id: "rrc" },
  ],
  "/eip": [
    {
      label: "Ethereum Improvement",
      icon: LuWrench,
      id: "Ethereum Improvement",
    
    }
  ], 
  "/all": [
    {
      label: "All EIP ERC RIP",
      icon: LuWrench,
      id: "All EIP ERC RIP",
    },
   
  ],
  "/Analytics": [
    { label: "Github PR Analytics", icon: LuUsers, id: "GithubAnalytics" },
    { label: "EIPs Label Chart", icon: LuUsers, id: "EIPsLabelChart" },
  ],
  "/boards": [{ label: "EIPs BOARD", icon: LuUsers, id: "EIPsBOARD" }],

  "/Reviewers": [
    { label: "editors", icon: LuUsers, id: "/Reviewers#editors" },
    { label: "Reviewers", icon: LuUsers, id: "/Reviewers#Reviewers" },
    { label: "LeaderBoard", icon: LuUsers, id: "/Reviewers#LeaderBoard" },
    {
      label: "Leaderboard FAQ",
      icon: LuUsers,
      id: "/Reviewers#Leaderboard FAQ",
    },
    {
      label: "ActivityTimeline",
      icon: LuUsers,
      id: "/Reviewers#ActivityTimeline",
    },
    { label: "PRs Reviewed", icon: LuUsers, id: "/Reviewers#PRs Reviewed" },
    { label: "active editors", icon: LuUsers, id: "/Reviewers#active editors" },
    { label: "comments", icon: LuUsers, id: "/Reviewers#comments" },
  ],
  "/proposalbuilder": [
    {
      label: "EIP Builder",
      icon: LuUsers,
      id: "#split#eip#new#EipTemplateEditor",
    },
  ],
  "/authors": [{ label: "Search Author", icon: LuUsers, id: "Search Author" }],
  "/SearchEip": [{ label: "Search EIP", icon: LuUsers, id: "/Search EIP" }],
  "/SearchEipTitle": [
    {
      label: "Search EIP Title",
      icon: LuUsers,
      id: "Search EIP Title",
    },
  ],
  "/SearchPRSandISSUES": [
    {
      label: "Search PR/ISSUE",
      icon: LuSearch,
      id: "Search PR/ISSUE",
    },
  ],

}
