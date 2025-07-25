"use client";
import {
  FileText,
  Layers3,
  Wrench,
  BarChart,
  LayoutDashboard,
  BookOpen,
  Search,
  Settings,
  UserCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import { signOut } from 'next-auth/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { IconButton, Tooltip } from "@chakra-ui/react";
import { Variants } from "framer-motion";
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  useColorModeValue,
  Divider,
  Flex,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { children } from "cheerio/dist/commonjs/api/traversing";
import {
  FiBarChart2,
  FiDatabase,
  FiHome,
  FiInfo,
  FiTool,
} from "react-icons/fi";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";



import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { isValidMotionProp } from "framer-motion";
import { Rajdhani } from "next/font/google";
import { useUserStore } from "@/stores/userStore";

// Extend chakra with motion.div
const MotionDiv = chakra(motion.div, {
  // allow motion props to be forwarded
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});



const mont = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


interface UserData {
  id: string;
  name: string;
  email: string;
  image: string;
  tier: string;
  walletAddress?: string;
}


function generateYearlyInsights() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-based

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const sectionAnchors = [
    { label: "Summary", id: "draft-vs-final" },
    { label: "Draft", id: "Draft" },
    { label: "Review", id: "Review" },
    { label: "Last Call", id: "LastCall" },
    { label: "Living", id: "Living" },
    { label: "Final", id: "Final" },
    { label: "Stagnant", id: "Stagnant" },
    { label: "Withdrawn", id: "Withdrawn" },
  ];

  const years = [];

  for (let y = currentYear; y >= currentYear - 10; y--) {
    const months = [];

    const endMonth = y === currentYear ? currentMonth : 11;

    for (let m = endMonth; m >= 0; m--) {
      months.push({
        label: monthNames[m],
        href: `/insight/${y}/${m + 1}`,
        id: `insight-${y}-${m + 1}`, // optional: consistent ID
        children: sectionAnchors.map((section) => ({
          label: section.label,
          href: `/insight/${y}/${m + 1}#${section.id}`,
          id: section.id,
        })),
      });
    }

    years.push({
      label: String(y),
      id: `year-${y}`,
      children: months,
    });
  }

  return years;
}


const sidebarStructure = [
  {
    icon: BookOpen,
    label: "Home",
    href: "/",
    children: [
      { label: "All EIPs", href: "/#all", id: "all" },
      { label: "Our Tools", href: "/#ourtools", id: "ourtools" },
      { label: "Trending EIPs", href: "/#trending", id: "trending" },
      { label: "What is EIPs Insights?", href: "/#what", id: "what" },
      {
        label: "EIP Status Changes by Year",
        href: "/#statuschanges",
        id: "statuschanges",
      },
      { label: "Dashboard", href: "/#dashboard", id: "dashboard" },
    ],
  },
  {
    icon: LayoutDashboard,
    label: "Upgrade",
    href: "/upgrade",
    id: "upgrade-section",
    children: [
      {
        label: "Upgrade Details",
        children: [
          { label: "PECTRA", id: "pectra", href: "/upgrade?selected=pectra#pectra" },
          { label: "FUSAKA", id: "fusaka", href: "/upgrade?selected=fusaka#fusaka" },
        ],
      },
      { label: "Network Upgrades Graph", id: "NetworkUpgrades", href: "/upgrade#NetworkUpgrades" },
      { label: "Upgrade Blogs", id: "upgrade-blogs", href: "/upgrade#upgrade-blogs" },
      { label: "Upgrade Table", id: "upgrade-table", href: "/upgrade#upgrade-table" },
      {
        label: "Network Upgrades and EIPs Relationship Graph",
        id: "NetworkUpgradesChartp",
        href: "/upgrade#NetworkUpgradesChartp",
      },
      { label: "Network Upgrades Chart", id: "NetworkUpgradeschart", href: "/upgrade#NetworkUpgradeschart" },
      { label: "Author Contributions", id: "AuthorContributions", href: "/upgrade#AuthorContributions" },

    ],
  },
  {
    icon: Layers3,
    label: "Standards",
    children: [
      {
        label: "All",
        href: "/all",
        children: [{ label: "All EIP ERC RIP", href: "/all#All EIP ERC RIP" }],
      },
      {
        label: "EIPs",
        href: "/eip?view=type",
        children: [
          { label: "Overview", href: "/eip#ethereum-improvement" },
          { label: "GitHub Stats", href: "/eip#githubstats" },
          {
            label: "Category View", href: "/eip?view=category", children: [
              { label: "Category Graphs", href: "/eip?view=category#charts" },
              { label: "Category View", href: "/eip?view=category#categories" }

            ]
          },
          {
            label: "Status View", href: "/eip?view=status", children: [
              { label: "Status Graphs", href: "/eip?view=status#charts" },
              { label: "Draft vs Final", href: "/eip?view=status#draftvsfinal" },
              { label: "Category View", href: "/eip?view=status#statuses" }

            ]
          },
          { label: "All EIPs Table", href: "/eip#tables" }
        ]
      },
      {
        label: "ERCs",
        href: "/erc?view=category",
        children: [
          { label: "Overview", href: "/erc#ethereum-improvement" },
          { label: "GitHub Stats", href: "/erc#githubstats" },

          {
            label: "Category View",
            href: "/erc?view=category",
            children: [
              { label: "Category Graphs", href: "/erc?view=category#graphs" },
              { label: "ERC Progress ", href: "/erc?view=category#progress" },
            ],
          },

          {
            label: "Status View",
            href: "/erc?view=status",
            children: [
              { label: "Status Graphs", href: "/erc?view=status#graphs" },
              { label: "Draft vs Final", href: "/erc?view=status#draftvsfinal" },
              { label: "Category View", href: "/erc?view=status#statuses" },
            ],
          },

          { label: "All ERCs Table", href: "/erc#tables" },
        ],
      },
      {
        label: "RIPs",
        href: "/rip?view=category",
        children: [
          { label: "Overview", href: "/rip#ethereum-improvement" },
          { label: "GitHub Stats", href: "/rip#githubstats" },

          {
            label: "Category View",
            href: "/rip?view=category",
            children: [
              { label: "Category Graphs", href: "/rip?view=category#charts" },
              { label: "Category View", href: "/rip?view=category#rip-status-graph" }, // if you add id
            ],
          },

          {
            label: "Status View",
            href: "/rip?view=status",
            children: [
              { label: "Status Graphs", href: "/rip?view=status#charts" },
              { label: "Draft vs Final", href: "/rip?view=status#draftvsfinal" },
              { label: "Status View", href: "/rip?view=status#statuses" }
            ],
          },

          { label: "All RIPs Table", href: "/rip#status-tables" },
        ],
      }

    ],
  },
  {
    icon: Wrench,
    label: "Tools",
    children: [
      {
        label: "Analytics",
        href: "/Analytics",
        children: [
          { label: "Github PR Analytics", href: "/Analytics#GithubAnalytics" },
          { label: "EIPs Label Chart", href: "/Analytics#EIPsLabelChart" },
        ],
      },
      {
        label: "Boards",
        href: "/boards",
        children: [{ label: "EIPs BOARD", href: "/boards#EIPsBOARD" }],
      },
      {
        label: "Editors & Reviewers Leaderboard",
        href: "/Reviewers",
        children: [
          { label: "editors", href: "/Reviewers#editors" },
          { label: "Reviewers", href: "/Reviewers#Reviewers" },
          { label: "LeaderBoard", href: "/Reviewers#LeaderBoard" },
          { label: "Leaderboard FAQ", href: "/Reviewers#Leaderboard FAQ" },
          { label: "ActivityTimeline", href: "/Reviewers#ActivityTimeline" },
          { label: "PRs Reviewed", href: "/Reviewers#PRs Reviewed" },
          { label: "active editors", href: "/Reviewers#active editors" },
          { label: "comments", href: "/Reviewers#comments" },
        ],
      },
      {
        label: "EIP Proposal Builder",
        href: "/proposalbuilder",
        children: [
          {
            label: "EIP Builder",
            href: "/proposalbuilder#split#eip#new#EipTemplateEditor",
          },
        ],
      },
      {
        label: "Search By",
        children: [
          {
            label: "Author",
            href: "/authors",
            children: [
              { label: "Search Author", href: "/authors#Search Author" },
            ],
          },
          {
            label: "EIP",
            href: "/SearchEip",
            children: [{ label: "Search EIP", href: "/SearchEip#Search EIP" }],
          },
          {
            label: "EIP Title",
            href: "/SearchEipTitle",
            children: [
              {
                label: "Search EIP Title",
                href: "/SearchEipTitle#Search EIP Title",
              },
            ],
          },
          {
            label: "PR/ISSUE",
            href: "/SearchPRSandISSUES",
            children: [
              {
                label: "Search PR/ISSUE",
                href: "/SearchPRSandISSUES#Search PR/ISSUE",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    icon: BarChart,
    label: "Insights",
    children: generateYearlyInsights(),
  },
  { icon: BookOpen, label: "Resources", href: "/resources" },
];


export default function AppSidebar() {
  const { isCollapsed, toggleCollapse } = useSidebarStore();
  const activeSection = useSidebarStore((s) => s.activeSection);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [userData, setUserData] = useState<UserData | null>(null);
  const { user, setUser, clearUser } = useUserStore();

  const bottomItems = [
    // { icon: Search, label: "Search", href: "/search" },
    // { icon: UserCircle2, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/" },
  ];

  const bg = useColorModeValue("gray.100", "gray.900");
  const borderColor = useColorModeValue("gray.300", "gray.700");

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  useEffect(() => {
    const expandParents = (items: any[], activeId: string, path: string[] = []): string[] | null => {
      for (const item of items) {
        const itemHash = item.href?.split("#")[1] || item.id;
        if (itemHash === activeId) return path;
        if (item.children) {
          const result = expandParents(item.children, activeId, [...path, item.label]);
          if (result) return result;
        }
      }
      return null;
    };

    if (activeSection) {
      const activePath = expandParents(sidebarStructure, activeSection);
      if (activePath) {
        setExpandedItems((prev) => {
          const updated = { ...prev };
          activePath.forEach((label) => {
            updated[label] = true;
          });
          return updated;
        });
      }
    }
  }, [activeSection]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const toast = useToast();
  const router = useRouter();

  const handleRefresh = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/GetUserStatus');
      const data = await response.json();

      const updatedUser = {
        ...user,
        tier: data.tier || user.tier || 'Free',
      };

      setUser(updatedUser);
      toast({
        title: 'Status refreshed',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Refresh failed',
        description: 'Could not fetch latest status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = async () => {
    try {
      clearUser();
      await signOut({ redirect: false });

      toast({
        title: 'Logged out successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => router.push('/signin'), 500);
    } catch (error) {
      toast({
        title: 'Logout failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };


  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      zIndex="50"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      transition="width 0.3s"
      w={isCollapsed ? "3rem" : "16rem"}
      bg={bg}
      borderRight="1px solid"
      borderColor={borderColor}
      roundedRight="xl"
      overflowY="auto"
      py={4}
      sx={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
      className={`${mont.className} base-page-size`}
    >
      {/* Collapse/Expand Button */}
      <Box px={2} mb={2}>
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          onClick={toggleCollapse}
          size="sm"
          variant="ghost"
          w="100%"
        />
      </Box>

      {/* Main Items */}
      <VStack spacing={1} px={2} align="stretch" flex="1" overflowY="auto">
        {sidebarStructure.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            expanded={!isCollapsed}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
            depth={0}
            isCollapsed={isCollapsed}
          />
        ))}
      </VStack>

      <Divider borderColor={borderColor} my={2} />

      {/* Bottom Items */}
      <VStack spacing={1} px={2} align="stretch">
        {bottomItems.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            expanded={!isCollapsed}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
            depth={0}
            isCollapsed={isCollapsed}
          />
        ))}
      </VStack>

      <Box mt={2} px={isCollapsed ? 0 : 4}>
{!isCollapsed ? (
  <Menu placement="top" isLazy>
    <MenuButton
      as={HStack}
      spacing={3}
      align="center"
      px={3}
      py={2}
      w="full"
      _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
      borderRadius="md"
      transition="background 0.2s"
      justify="flex-start"
      cursor="pointer"
    >
      <Avatar
        size="sm"
        name={userData?.name}
        src={userData?.image || undefined}
      />
      <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
        {userData?.name || "Profile"}
      </Text>
      <Box as={ChevronDown} size="16px" />
    </MenuButton>

    <MenuList zIndex={1000}>
      <MenuItem onClick={() => router.push("/profile")}>👤 Profile</MenuItem>
      <MenuItem onClick={handleRefresh}>🔄 Refresh Status</MenuItem>
      <MenuDivider />
      <MenuItem onClick={handleLogout}>🚪 Logout</MenuItem>
    </MenuList>
  </Menu>
) : (
  <Tooltip label={userData?.name || "Profile"} placement="right" hasArrow>
    <Box
      px={2}
      py={2}
      w="full"
      display="flex"
      justifyContent="center"
      _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
      borderRadius="md"
      transition="background 0.2s"
      cursor="pointer"
      onClick={() => router.push("/profile")}
    >
      <Avatar
        size="sm"
        name={userData?.name}
        src={userData?.image || undefined}
        _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
        transition="all 0.2s"
      />
    </Box>
  </Tooltip>
)}

      </Box>

    </Box>

  );
}

export function SidebarItem({
  item,
  expanded, // Top-level sidebar expanded state
  expandedItems,
  toggleExpand,
  depth = 0,
  isCollapsed,
}: {
  item: any;
  expanded: boolean;
  expandedItems: Record<string, boolean>;
  toggleExpand: (label: string) => void;
  depth?: number;
  isCollapsed?: boolean;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems[item.label];
  const activeSection = useSidebarStore((s) => s.activeSection);

  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const iconColor = useColorModeValue("gray.600", "gray.300");
  const hoverBg = useColorModeValue("gray.200", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.700");

  const getHrefHash = (href: string) => {
    const parts = href.split("#");
    return parts.length > 1 ? parts[1] : null;
  };

  const itemHash = item.href ? getHrefHash(item.href) : item.id || null;
  const isLeafNode = !item.children || item.children.length === 0;
  const isActive = isLeafNode && itemHash === activeSection;

  const router = useRouter();


  const variants: Variants = {
    open: {
      opacity: 1,
      height: "auto",
      pointerEvents: "auto",
      transition: { duration: 0.3 },
    },
    isCollapsed: {
      opacity: 0,
      height: 0,
      pointerEvents: "none",
      transition: { duration: 0.2 },
    },
  };

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    const isHashLink = href.includes("#");
    if (!isHashLink) return;

    e.preventDefault();
    const [path, hash] = href.split("#");

    if (path && window.location.pathname !== path) {
      window.location.href = href;
      return;
    }

    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
    }
  };
  const shouldShowChildren = expanded && isExpanded;
  return (
    <Box>
      {/* Main clickable row */}
      <Tooltip label={isCollapsed ? item.label : ""} placement="right" hasArrow>
        <HStack
          spacing={3}
          px={3}
          py={2}
          bg={
            isActive ? useColorModeValue("blue.100", "blue.700") : "transparent"
          }
          fontWeight={isActive ? "bold" : "normal"}
          borderRadius="md"
          cursor={hasChildren || item.href ? "pointer" : "default"}
          onClick={() => hasChildren ? toggleExpand(item.label) : {}}
          _hover={{ bg: hoverBg }}
          justifyContent={expanded ? "flex-start" : "center"}
          color={textColor}
          userSelect="none"
          transition="all 0.2s"
        >
          {item.icon && (
            <Icon as={item.icon} boxSize={5} color={iconColor} flexShrink={0} />
          )}

          {expanded && (
            <>
              {item.href ? (
                <Text
                  as="a"
                  onClick={(e) => {
                    e.preventDefault();

                    if (!item.href) return;

                    const [path, hash] = item.href.split("#");

                    const isSamePage = window.location.pathname === path;

                    if (isSamePage && hash) {
                      const target = document.getElementById(hash);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                        history.pushState(null, "", item.href); // Update URL hash without reload
                      }
                    } else if (!hash) {
                      router.push(item.href); // Normal page change
                    } else {
                      // Different page + hash — use router.push with hash
                      router.push(item.href);
                    }
                  }}
                  cursor="pointer"
                  flex="1"
                  fontWeight="medium"
                  fontSize="sm"
                  _hover={{ textDecoration: "underline" }}
                >
                  {item.label}
                </Text>

              ) : (
                <Text flex="1" fontWeight="medium" fontSize="sm">
                  {item.label}
                </Text>
              )}

              {hasChildren && (
                <Icon
                  as={isExpanded ? ChevronDown : ChevronRight}
                  boxSize={4}
                  color={iconColor}
                  onClick={() => toggleExpand(item.label)}
                />
              )}
            </>
          )}
        </HStack>
      </Tooltip>

      {/* Submenu Items */}
      {hasChildren && (
        <AnimatePresence initial={false}>
          {expanded && isExpanded && (
            <MotionDiv
              display="flex"
              flexDirection="column"
              pl={`${depth * 1.5}rem`}
              alignItems="stretch"
              gap={1.5}
              mt={1}
              initial="isCollapsed"
              animate="open"
              exit="isCollapsed"
              variants={variants}
              overflow="hidden"
              position="relative"
            >
              <Box
                position="absolute"
                left="1rem"
                top="0"
                bottom="0"
                width="2px"
                bg={useColorModeValue("blue.400", "blue.300")}
                borderRadius="full"
                opacity={0.1}
                zIndex={-1}
              />
              {item.children.map((child: any) => (
                <SidebarItem
                  key={child.label}
                  item={child}
                  expanded={expanded}
                  expandedItems={expandedItems}
                  toggleExpand={toggleExpand}
                  depth={depth + 1}
                  isCollapsed={isCollapsed}
                />
              ))}
            </MotionDiv>
          )}
        </AnimatePresence>
      )}
    </Box>
  );
}