import React from "react";
import AllLayout from "@/components/Layout";
import { Box, Tabs, useColorModeValue  } from "@chakra-ui/react";
import FlexBetween from "@/components/FlexBetween";
import Header from "@/components/Header";
import { DownloadIcon } from "@chakra-ui/icons";
import Table from "@/components/Table";
import LineChart from "@/components/LineChart";
import TableStatus from "@/components/TableStatus";
import LineStatus from "@/components/LineStatus";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoaderComponent from "@/components/Loader";

import StatusColumnChart from "@/components/StatusColumnChart";

interface EIP {
  _id: string;
  eip: string;
  title: string;
  author: string;
  status: string;
  type: string;
  category: string;
  discussion: string;
  deadline: string;
  requires: string;
  unique_ID: number;
  __v: number;
}

import {TabList, Tab } from "@chakra-ui/react";
import Link from "next/link";

const categories = [
  { name: "Core", path: "/core" },
  { name: "Networking", path: "/networking" },
  { name: "Interface", path: "/interface" },
  { name: "Meta", path: "/meta" },
  { name: "Informational", path: "/informational" },
  { name: "ERC", path: "/erc" },
];

const Info = () => {
  const [isLoading, setIsLoading] = useState(true);
  const bg = useColorModeValue("#f6f6f7", "#171923");
  const [data, setData] = useState<EIP[]>([]); // Set initial state as an empty array
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/new/all`);
        console.log(response);
        const jsonData = await response.json();
        setData(jsonData.eip);
        setIsLoading(false); // Set loader state to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loader state to false even if an error occurs
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Simulating a loading delay
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup function
    return () => clearTimeout(timeout);
  }, []);
  return (
    <AllLayout>
      {isLoading ? ( // Check if the data is still loading
        // Show loader if data is loading
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Your loader component */}
            <LoaderComponent />
          </motion.div>
        </Box>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box className="ml-40 mr-40 pl-10 pr-10 mt-10 mb-20">
                        {/* Navigation Tabs with Links */}
                        <Tabs isFitted variant="enclosed">
              <TabList>
                {categories?.map((category) => (
                  <Link key={category.name} href={category.path} passHref>
                    <Tab as="a">{category.name}</Tab>
                  </Link>
                ))}
              </TabList>
            </Tabs>
            <FlexBetween>
              <Header
                title={`Informational [ ${
                  data?.filter((item) => item.type === "Informational")?.length
                } ]`}
                subtitle="Informational EIPs describe other changes to the Ethereum ecosystem."
                description="Informational EIPs provide general guidelines or information to the Ethereum community but do not propose a new feature."
              />
            </FlexBetween>
            <TableStatus cat="Informational" />
            <Box
                        marginTop={"2rem"}
                        bg={bg}
                        p="0.5rem"
                        borderRadius="0.55rem"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        height={400}
                        _hover={{
                          border: "1px",
                          borderColor: "#30A0E0",
                        }}
                        as={motion.div}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 } as any}
                        className="hover: cursor-pointer ease-in duration-200"
                      ><StatusColumnChart category={"Core"} type={"EIPs"} /></Box>
            
          </Box>

        </motion.div>
      )}
    </AllLayout>
  );
};

export default Info;
