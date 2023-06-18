import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
    Spacer,
    Hide,
  } from "@chakra-ui/react";
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from "@chakra-ui/icons";
  import "../styles/fontStyles.css";
  
  const NAV_ITEMS: Array<NavItem> = [
    {
      label: "About us",
      href: "/",
    },
    {
      label: "Farmer",
      href: "/register/user",
    },
    {
      label: "Buyer",
      href: "/register/buyer",
    },
    {
      label: "Order",
      href: "/addorder",
    },
  ];
  
  function DesktopSubNav({ label, href }: NavItem) {
    return (
      <Link
        href={href}
        role="group"
        display="block"
        p={2}
        rounded="md"
        _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
      >
        <Stack direction="row" align="center">
          <Box>
            <Text
              transition="all .3s ease"
              _groupHover={{ color: "pink.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
          </Box>
          <Flex
            transition="all .3s ease"
            transform="translateX(-10px)"
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify="flex-end"
            align="center"
            flex={1}
          >
            <Icon color="pink.400" w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  }
  
  function DesktopNav() {
    const linkColor = useColorModeValue("white", "white");
    const linkHoverColor = useColorModeValue("white", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.800");
  
    return (
      <Stack direction="row" spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger="hover" placement="bottom-start">
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? "#"}
                  fontSize="md"
                  fontWeight={700}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow="xl"
                  bg={popoverContentBgColor}
                  p={4}
                  rounded="xl"
                  minW="sm"
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav
                        key={child.label}
                        label={child.label}
                        href={child.href}
                      />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  }
  
  function MobileNavItem({ label, children, href }: NavItem) {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? "#"}
          justify="space-between"
          align="center"
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text fontWeight={700} color="white">
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition="all .25s ease-in-out"
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle="solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            align="start"
          >
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  }
  
  function MobileNav() {
    return (
      <Stack bg="#1C6B28" p={4} display={{ md: "none" }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem
            key={navItem.label}
            label={navItem.label}
            href={navItem.href}
          />
        ))}
      </Stack>
    );
  }
  
  export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Box className="header">
        <Flex
          bg="#1C6B28"
          data-testid="navbar"
          color={useColorModeValue("white.900", "white")}
          minH="60px"
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align="center"
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: "auto" }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              color="whiteAlpha.900"
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Flex>
          <Flex justifyContent="space-between" w="full">
            <Hide above="sm">
              <Spacer />
            </Hide>
            <Text
              fontFamily="heading"
              fontSize="lg"
              fontWeight={800}
              data-testid="logo"
              color="white"
              align="end"
            >
              FarmAI
            </Text>
  
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
  }
  