import { motion } from "framer-motion";
import {
  Box,
  Button,
  Heading,
  Icon,
  Text,
  useColorModeValue,
  useMediaQuery,
  useTheme,
  Link as LI,
  Stack,
  useToast,
  Flex
} from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
import React, { useEffect, useState, useLayoutEffect } from "react";
import Header from "@/components/Header";
import { DownloadIcon } from "@chakra-ui/icons";
import DashboardDonut2 from "@/components/DashboardDonut2";
import DashboardDonut from "@/components/DashboardDonut";
// import { useRouter } from "next/router";
import {
  Anchor,
  BookOpen,
  Radio,
  Link,
  Clipboard,
  Briefcase,
} from "react-feather";
import { BsArrowUpRight, BsGraphUp } from "react-icons/bs";
import StackedColumnChart from "@/components/StackedBarChart";
import AreaC from "@/components/AreaC";
import NextLink from "next/link";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import { mockEIP } from "@/data/eipdata";
import { usePathname } from "next/navigation";
import FlexBetween from "./FlexBetween";
import StatBox from "./StatBox";
import LoaderComponent from "./Loader";
import Table from "./Table";
import Banner from "@/components/NewsBanner";
import SearchBox from "@/components/SearchBox";
import BoyGirl from "@/components/BoyGirl";
import BoyGirl2 from "@/components/BoyGirl2";
import BoyGirl3 from "@/components/BoyGirl3";
import AllChart from "./AllChart2";
import EIPS_dashboard_img from "../../public/EIPS_dashboard_img.png";
import ToolsSection from "./AvailableTools";
import TypeGraphs from "@/components/TypeGraphs2";
import CopyLink from "./CopyLink";
import {
  FiMenu,
  FiHome,
  FiSettings,
  FiBarChart2,
  FiTool,
  FiInfo,
  FiDatabase,
} from "react-icons/fi";

import { useSidebar } from "@/components/Sidebar/SideBarContext";

import DashboardCards from "./DashboardCards";
import FeedbackWidget from "./FeedbackWidget";
import { Clients } from "./Clients";
import { useScrollSpy } from "@/hooks/useScrollSpy";

interface EIP {
  _id: string;
  eip: string;
  title: string;
  author: string;
  status: string;
  type: string;
  category: string;
  created: Date;
  discussion: string;
  deadline: string;
  requires: string;
  repo: string;
  unique_ID: number;
  __v: number;
}

interface APIResponse {
  eip: EIP[];
  erc: EIP[];
  rip: EIP[];
}

const Dashboard = () => {
  const { setSections } = useSidebar();
  const [data, setData] = useState<APIResponse>({
    eip: [],
    erc: [],
    rip: [],
  });

  const [isLoading, setIsLoading] = useState(true); // Loader state
  const [isDarkMode, setIsDarkMode] = useState(false);

  const textColorLight = "#2C3E50"; // Darker color for better visibility in light mode
  const textColorDark = "#F5F5F5"; // Light color for dark mode
  const bgGradientLight = "linear(to-r, #2980B9, #3498DB)"; // Clear gradient for better visibility in light mode
  const bgGradientDark = "linear(to-r, #30A0E0, #F5F5F5)";
  const toast = useToast();
  // useEffect(() => {
  //   setSections([
  //     { label: 'All EIPs', icon: FiHome, id: 'all' },
  //     { label: 'Our Tools', icon: FiTool, id: 'ourtools' },
  //     { label: 'What is EIPs Insights?', icon: FiInfo, id: 'what' },
  //     { label: 'EIP Status Changes by Year', icon: FiBarChart2, id: 'statuschanges' },
  //     { label: 'Dashboard', icon: FiDatabase, id: 'dashboard' },
  //   ]);
  // }, []);

  const scrollToFeedbackSection = () => {
    const element = document.getElementById("feedback");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/new/all`);
        console.log(response);
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false); // Set loader state to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loader state to false even if an error occurs
      }
    };

    fetchData();
  }, []);
  const allData: EIP[] = data?.eip?.concat(data?.erc?.concat(data?.rip)) || [];
  const uniqueStatuses = [...new Set(allData.map((item) => item.status))];
  console.log(uniqueStatuses);
  const uniqueeip = allData.filter((item) => item.status === "");
  console.log("unique eip1:", uniqueeip);
  const uniqueeip2 = allData.filter((item) => item.status === " ");
  console.log("unique eip2:", uniqueeip2);
const textColor = useColorModeValue("gray.800", "gray.200");
const linkColor = useColorModeValue("blue.600", "blue.300");

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const bg = useColorModeValue("#f6f6f7", "#171923");
  const text = useColorModeValue("white", "black");
  const router = useRouter();
  useEffect(() => {
    if (bg === "#f6f6f7") {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  });

  const monthName = new Date().toLocaleString([], {
    month: "long",
  });
  const year = new Date().getFullYear();

  // const router = useRouter();

  const scrollToHash = () => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (!isLoading) {
      scrollToHash();
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    router.events.on("routeChangeComplete", scrollToHash);
    return () => {
      router.events.off("routeChangeComplete", scrollToHash);
    };
  }, [router]);

  //  const [showThumbs, setShowThumbs] = useState(false);

  const submitFeedback = async (type: "like" | "dislike") => {
    try {
      const res = await fetch("/api/Feedback/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (!res.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Unexpected response format");
      }

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Thanks for your feedback!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (err: any) {
      toast({
        title: "Error submitting feedback",
        description: err?.message || "Unknown error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useScrollSpy([
    "all",
    "ourtools",
    "trending",
    "what",
    "statuschanges",
    "dashboard",
  ]);


  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300); // delay ensures DOM is ready
    }
  }, []);

  return (
    <>
      <FeedbackWidget />
  <Box px={{ base: 4, md: 8, lg: 10 }} py={{ base: 6, md: 8, lg: 10 }}>
    {isLoading ? (
      <Flex justify="center" align="center" minH="70vh">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoaderComponent />
        </motion.div>
      </Flex>
    ) : (
          // Show dashboard content if data is loaded
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                id={"hero"}
pt={{ base: 6, lg: 12 }} pb={{ base: 6, lg: 10 }}
              >
                <div className="lg:block hidden">
                  <Box
                    display={{ lg: "grid" }}
                    gridTemplateColumns={{ lg: "2fr 1fr" }}
                  >
                    <Stack direction={"column"}>
                      <Box
                        // bg="rgba(0, 0, 0, 0.5)"
                        borderRadius="md" // Rounded corners
                        padding={4} // Padding around the text
                        paddingLeft="6"
                        // boxShadow="md"
                        maxWidth="550px"
                      >
                        <Text
                          color={useColorModeValue(
                            textColorLight,
                            textColorDark
                          )} // Switch color based on mode
                          fontWeight={"bold"}
                          bgGradient={useColorModeValue(
                            bgGradientLight,
                            bgGradientDark
                          )} // Optional: add a gradient background
                          bgClip="text" // Optional: clip background to the text
                          fontSize={{
                            lg: "6xl",
                            md: "5xl",
                            sm: "3xl",
                            base: "xl",
                          }}
                        >
                          Ethereum <br /> Improvement <br /> Proposal <br />{" "}
                          Insight
                        </Text>
                      </Box>
                      <br />

                      <Stack direction={"row"} spacing={"6"}>
                        <Box>
                          <NextLink href={"/home#1"}>
                            <Button
                              color="#F5F5F5"
                              variant={"outline"}
                              fontSize={{
                                lg: "14px",
                                md: "12px",
                                sm: "12px",
                                base: "10px",
                              }}
                              fontWeight={"bold"}
                              padding={{
                                lg: "10px 20px",
                                md: "5px 10px",
                                sm: "5px 10px",
                                base: "5px 10px",
                              }}
                              rightIcon={<BsArrowUpRight />}
                              bgColor={"#30A0E0"}
                              _hover={{
                                bgColor: useColorModeValue(
                                  "#2B6CB0",
                                  "#4A5568"
                                ),
                                color: useColorModeValue("white", "#F5F5F5"),
                              }}
                            >
                              Dashboard
                            </Button>
                          </NextLink>
                        </Box>

                        <Box>
                          <NextLink
                            href={`/insight/${year}/${getMonth(monthName)}`}
                          >
                            <Button
                              color="#F5F5F5"
                              variant={"outline"}
                              fontSize={{
                                lg: "14px",
                                md: "10px",
                                sm: "12px",
                                base: "10px",
                              }}
                              fontWeight={"bold"}
                              padding={{
                                lg: "10px 20px",
                                md: "5px 10px",
                                sm: "5px 10px",
                                base: "5px 10px",
                              }}
                              rightIcon={<BsGraphUp />}
                              bgColor={"#30A0E0"}
                              _hover={{
                                bgColor: useColorModeValue(
                                  "#2B6CB0",
                                  "#4A5568"
                                ),
                                color: useColorModeValue("white", "#F5F5F5"),
                              }}
                            >
                              {monthName} {year} Insight
                            </Button>
                          </NextLink>
                        </Box>
                      </Stack>
                    </Stack>
                    {/* <BoyGirl2/> */}
                    <BoyGirl3 />
                    {/* <AllChart type="Total" /> */}
                  </Box>
                  <br />
                  <br />
                  <br />
                  <Box
                    // bg="rgba(0, 0, 0, 0.5)"
                    borderRadius="md" // Rounded corners
                    id="all"
                  >
                    <div className="py-10">
                      <Header
                        title="All Categories and Status"
                        subtitle="Overview"
                        description="A high-level overview of Ethereum Standards by categories, and status."
                        sectionId="all"
                      />
                      <AllChart type="Total" dataset={data} />
                    </div>
                  </Box>
                </div>

                {/* <AllChart type="Total" /> */}

                <div className="lg:hidden block">
                  <Text
                    className="text-5xl text-center pb-5 sm:text-6xl md:text-7xl"
                    fontWeight={"bold"}
                    color={useColorModeValue(textColorLight, textColorDark)}
                    bgGradient={useColorModeValue(
                      bgGradientLight,
                      bgGradientDark
                    )}
                    bgClip="text"
                  >
                    Ethereum <br /> Improvement <br /> Proposals <br /> Insight
                  </Text>
                  <Stack
                    direction={"row"}
                    spacing={"6"}
                    paddingTop={"20"}
                    justifyContent={"center"}
                  >
                    <Box>
                      <NextLink href={"/home#1"}>
                        <Button
                          colorScheme="white"
                          variant={"outline"}
                          fontSize={{
                            lg: "14px",
                            md: "12px",
                            sm: "12px",
                            base: "10px",
                          }}
                          fontWeight={"bold"}
                          padding={{
                            lg: "10px 20px",
                            md: "5px 10px",
                            sm: "5px 10px",
                            base: "5px 10px",
                          }}
                          rightIcon={<BsArrowUpRight />}
                          bgColor={"#30A0E0"}
                          _hover={{
                            bgColor: useColorModeValue("#2B6CB0", "#4A5568"),
                            color: useColorModeValue("white", "#F5F5F5"),
                          }}
                        >
                          Dashboard
                        </Button>
                      </NextLink>
                    </Box>

                    <Box>
                      <NextLink
                        href={`/insight/${year}/${getMonth(monthName)}`}
                      >
                        <Button
                          colorScheme="blue"
                          variant={"outline"}
                          fontSize={{
                            lg: "14px",
                            md: "12px",
                            sm: "12px",
                            base: "10px",
                          }}
                          fontWeight={"bold"}
                          padding={{
                            lg: "10px 20px",
                            md: "5px 10px",
                            sm: "5px 10px",
                            base: "5px 10px",
                          }}
                          _hover={{
                            bgColor: useColorModeValue("#2B6CB0", "#4A5568"),
                            color: useColorModeValue("white", "#F5F5F5"),
                          }}
                        >
                          {monthName} {year} Insight
                        </Button>
                      </NextLink>
                    </Box>
                  </Stack>
                  <br />
                  <br />
                  <div>
                    <AllChart type="Total" dataset={data} />
                  </div>
                </div>
              </Box>

              <Box
                className="py-8"
                display={{ base: "block", md: "block", lg: "none" }}
              >
                <Box
                  className="w-full lg:px-48 md:px-32 sm:px-24 px-20 py-5 rounded-[0.55rem] hover:border border-blue-500"
                  bgColor={bg}
                >
                  <SearchBox />
                </Box>
              </Box>
              <div>
                <ToolsSection />
              </div>
              <div>
                <Clients />
              </div>

              {/* <div className="py-8"> */}
              {/* <Box
                  className={
                    "w-full lg:px-48 md:px-32 sm:px-24 px-20 py-5 rounded-[0.55rem] hover:border border-blue-500"
                  }
                  bgColor={bg}
                > */}

              {/* </Box> */}
              {/* </div> */}
<div className="py-10 lg:py-16" id="what">
  <Header
    title="What is EIPsInsight?"
    subtitle="Overview"
    description="EIPsInsight visualizes Ethereum proposal activity to track progress and editor workloads."
    sectionId="what"
  />

  <Box
    className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-12"
    borderRadius="md"
  >
    {/* Left Side - YouTube Video */}
    <div className="w-full flex justify-center">
      <iframe
        width="100%"
        height="315"
        className="rounded-lg max-w-xl"
        src="https://www.youtube.com/embed/AyidVR6X6J8?start=8"
        title="EIPsInsight Overview"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>

    {/* Right Side - Text Content */}
    <div className="flex justify-center items-start">
      <div className="text-left max-w-xl space-y-6">
<p className="text-xl leading-relaxed" style={{ color: textColor }}>
  <span style={{ color: linkColor, fontWeight: "600" }}>EIPsInsight</span> is a
  tooling platform designed to provide visual insights into the activity of
  Ethereum Improvement Proposals (
  <NextLink href="/eip">
    <span  className="text-blue-400">EIPs</span>
  </NextLink>
  ), Ethereum Request for Comments (
  <NextLink href="/erc">
    <span className="text-blue-400">ERCs</span>
  </NextLink>
  ), and Rollup Improvement Proposals (
  <NextLink href="/rip">
    <span className="text-blue-400">RIPs</span>
  </NextLink>
  ). It helps track proposal progress and workload of
  <NextLink href="/eips/eip-1">
    <span className="text-blue-400"> EIP Editors</span>
  </NextLink>
  , enhancing transparency and efficiency in the review process.
</p>

<NextLink href="/resources">
  <span
    className="text-xl flex items-center space-x-2 hover:underline"
  >
    Learn More <BsArrowUpRight className="pt-1" size={22} />
  </span>
</NextLink>

      </div>
    </div>
  </Box>
</div>


              <br />
            </motion.div>
            <br />
            <div className="py-16" id="statuschanges">
              <Box>
                <Header
                  title="EIP Status Changes by Year"
                  subtitle="Overview"
                  description="Insights of EIPs"
                  sectionId="statuschanges"
                />
              </Box>
              <Box paddingTop={8} paddingBottom={8}>
                <TypeGraphs />
              </Box>
            </div>
            <Box id="dashboard" sx={{ scrollMarginTop: "100px" }}>
              <Box
                // bg="rgba(0, 0, 0, 0.5)"
                borderRadius="md" // Rounded corners
                // padding={6} // Padding around the text
                // boxShadow="md"
                // className="border border-red-700"
                maxWidth="100%"
                overflow="hidden"
                mx="auto"
              >
                  <Box>
                    <Header
                      title="Dashboard"
                      subtitle="Welcome to Dashboard"
                      description="A high-level overview of Ethereum Standards by type, status, and lifecycle progress.
"
                      sectionId="dashboard"
                    />
                  </Box>

                  <Box>
                    {/*<Button*/}
                    {/*    colorScheme="blue"*/}
                    {/*    variant="outline"*/}
                    {/*    fontSize={{lg:'14px',md:'12px', sm:'12px',base:'10px'}}*/}
                    {/*    fontWeight={'bold'}*/}
                    {/*    padding={{lg:'10px 20px',md:'5px 10px', sm:'5px 10px',base:'5px 10px'}}*/}
                    {/*>*/}
                    {/*  <DownloadIcon marginEnd={'1.5'} />*/}
                    {/*  Download Reports*/}
                    {/*</Button>*/}
                  </Box>
               

                <Box
                  display="grid"
                  gridTemplateColumns={{ lg: "repeat(2, 1fr)" }}
                  gap={"6"}
                  marginTop={"20px"}
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <StatBox
                        title="Meta EIPs"
                        value={
                          new Set(
                            allData
                              .filter((item) => item.type === "Meta")
                              .map((item) => item.eip)
                          ).size
                        }
                        description="Meta EIPs describe changes to the EIP process, or other non-optional changes."
                        icon={
                          <Icon
                            as={Briefcase}
                            fontSize={{ base: "10", lg: "15" }}
                          />
                        }
                        url="meta"
                      />
                    </div>

                    <StatBox
                      title="Core EIPs"
                      value={
                        data?.eip?.filter(
                          (item) =>
                            item.type === "Standards Track" &&
                            item.category === "Core"
                        ).length || 0
                      }
                      description="Core EIPs describe changes to the Ethereum protocol."
                      icon={
                        <Icon as={Anchor} fontSize={{ lg: "15", sm: "10" }} />
                      }
                      url="core"
                    />

                    <StatBox
                      title="ERCs"
                      value={
                        new Set(
                          allData
                            .filter((item) => item.category === "ERC")
                            .map((item) => item.eip)
                        ).size
                      }
                      description="ERCs describe application-level standards for the Ethereum ecosystem."
                      icon={
                        <Icon as={BookOpen} fontSize={{ lg: "15", sm: "10" }} />
                      }
                      url="erc"
                    />

                    <StatBox
                      title="Networking EIPs"
                      value={
                        new Set(
                          allData
                            .filter((item) => item.category === "Networking")
                            .map((item) => item.eip)
                        ).size
                      }
                      description="Networking EIPs describe changes to the Ethereum network protocol."
                      icon={
                        <Icon as={Radio} fontSize={{ lg: "15", sm: "10" }} />
                      }
                      url="networking"
                    />

                    <StatBox
                      title="Interface EIPs"
                      value={
                        new Set(
                          allData
                            .filter((item) => item.category === "Interface")
                            .map((item) => item.eip)
                        ).size
                      }
                      description="Interface EIPs describe changes to the Ethereum client API."
                      icon={
                        <Icon as={Link} fontSize={{ lg: "15", sm: "10" }} />
                      }
                      url="interface"
                    />

                    <StatBox
                      title="Informational EIPs"
                      value={
                        new Set(
                          allData
                            .filter((item) => item.type === "Informational")
                            .map((item) => item.eip)
                        ).size
                      }
                      description="Informational EIPs describe other changes to the Ethereum ecosystem."
                      icon={
                        <Icon
                          as={Clipboard}
                          fontSize={{ base: "10", lg: "15" }}
                        />
                      }
                      url="informational"
                    />

                    <StatBox
                      title="RIPs"
                      value={
                        new Set(
                          allData
                            .filter((item) => item.repo === "rip")
                            .map((item) => item.eip)
                        ).size
                      }
                      description="RIPs describe changes to the RIP process, or other non-optional changes."
                      icon={
                        <Icon
                          as={Briefcase}
                          fontSize={{ base: "10", lg: "15" }}
                        />
                      }
                      url="rip"
                    />
                  </div>

                  <Box
                    as={motion.div}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 } as any}
                    bgColor={bg}
                    paddingY={{ lg: "2rem", sm: "2rem" }}
                    paddingX={{ lg: "2rem", sm: "0.5rem" }}
                    borderRadius="0.55rem"
                    _hover={{
                      border: "1px",
                      borderColor: "#30A0E0",
                    }}
                    className="hover: cursor-pointer ease-in duration-200"
                  >
                    <NextLink href="/all">
                      <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color="#30A0E0"
                        marginTop="4"
                        marginRight="6"
                        paddingBottom={6}
                        padding={2}
                      >
                        {`Category - [${allData.length}]`}
                      </Text>
                    </NextLink>
                    <DashboardDonut2 dataset={data} />
                  </Box>
                </Box>

                <Box
                  display="grid"
                  gridTemplateColumns={{ lg: "repeat(2, 1fr)" }}
                  gap={"6"}
                  marginTop={"20px"}
                >
                  <Box
                    as={motion.div}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 } as any}
                    bgColor={bg}
                    paddingY={{ lg: "2rem", sm: "2rem" }}
                    paddingX={{ lg: "2rem", sm: "0.5rem" }}
                    borderRadius="0.55rem"
                    _hover={{
                      border: "1px",
                      borderColor: "#30A0E0",
                    }}
                    className="hover: cursor-pointer ease-in duration-200"
                  >
                    <NextLink href="/status">
                      <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color="#30A0E0"
                        marginTop="4"
                        marginRight="6"
                        paddingBottom={6}
                        padding={2}
                      >
                        {`Status - [${allData.length}]`}
                      </Text>
                    </NextLink>
                    <DashboardDonut dataset={data} />
                  </Box>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <StatBox
                        title="Draft"
                        value={
                          allData.filter((item) => item.status === "Draft")
                            .length
                        }
                        description="Draft EIPs are proposals still under initial consideration and open for feedback."
                        icon={
                          <Icon
                            as={Briefcase}
                            fontSize={{ base: "10", lg: "15" }}
                          />
                        }
                        url="alltable"
                      />
                    </div>

                    <StatBox
                      title="Review"
                      value={
                        allData.filter((item) => item.status === "Review")
                          .length
                      }
                      description="EIPs in the Review stage are being actively discussed and evaluated by the community."
                      icon={
                        <Icon as={Anchor} fontSize={{ lg: "15", sm: "10" }} />
                      }
                      url="alltable"
                    />

                    <StatBox
                      title="Last Call"
                      value={
                        allData.filter((item) => item.status === "Last Call")
                          .length
                      }
                      description="Last Call EIPs are nearing finalization, with a short period for final community comments."
                      icon={
                        <Icon as={BookOpen} fontSize={{ lg: "15", sm: "10" }} />
                      }
                      url="alltable"
                    />

                    <StatBox
                      title="Final"
                      value={
                        allData.filter((item) => item.status === "Final").length
                      }
                      description="Final EIPs have been formally accepted and implemented as part of the Ethereum protocol."
                      icon={
                        <Icon as={Radio} fontSize={{ lg: "15", sm: "10" }} />
                      }
                      url="alltable"
                    />

                    <StatBox
                      title="Withdrawn"
                      value={
                        allData.filter((item) => item.status === "Withdrawn")
                          .length
                      }
                      description="Withdrawn EIPs have been removed from consideration by the author or due to lack of support."
                      icon={
                        <Icon as={Link} fontSize={{ lg: "15", sm: "10" }} />
                      }
                      url="alltable"
                    />

                    <StatBox
                      title="Stagnant"
                      value={
                        allData.filter((item) => item.status === "Stagnant")
                          .length
                      }
                      description="Stagnant EIPs are inactive and have not progressed for a prolonged period."
                      icon={
                        <Icon
                          as={Clipboard}
                          fontSize={{ base: "10", lg: "15" }}
                        />
                      }
                      url="alltable"
                    />

                    <StatBox
                      title="Living"
                      value={
                        allData.filter((item) => item.status === "Living")
                          .length
                      }
                      description="Living EIPs are continuously updated and reflect evolving standards or documentation."
                      icon={
                        <Icon
                          as={Briefcase}
                          fontSize={{ base: "10", lg: "15" }}
                        />
                      }
                      url="alltable"
                    />
                  </div>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </Box>
    </>
  );
};

function getMonth(monthName: any) {
  switch (monthName) {
    case "January":
      return 1;
    case "February":
      return 2;
    case "March":
      return 3;
    case "April":
      return 4;
    case "May":
      return 5;
    case "June":
      return 6;
    case "July":
      return 7;
    case "August":
      return 8;
    case "September":
      return 9;
    case "October":
      return 10;
    case "November":
      return 11;
    case "December":
      return 12;
    default:
      return "1";
  }
}

export default Dashboard;
