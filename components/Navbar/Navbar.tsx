import AccountCircle from "@mui/icons-material/AccountCircle";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import MenuIcon from "@mui/icons-material/Menu";
import { SxProps } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Login from "../Login/Login";
import { selectUserTeam } from "../Login/loginSlice";
import NavbarMenu from "./NavbarMenu";

const Navbar = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [loginVisible, setLoginVisible] = useState<boolean>(false);
  const userTeam = useSelector(selectUserTeam);

  const navLinkStyle: SxProps = {
    my: 2,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: "white",
    display: "flex",
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleToggleLoginMenu = () => {
    setLoginVisible(!loginVisible);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "#cc0000" }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CatchingPokemonIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Link href="/" passHref>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              PokeTeam
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <NavbarMenu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {userTeam != null ? (
                <Link href={`/team/${userTeam?.userName}`} passHref>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" color="white">
                      My Team
                    </Typography>
                  </MenuItem>
                </Link>
              ) : null}
              <Link href={`/trainers`} passHref>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="white">
                    Trainers
                  </Typography>
                </MenuItem>
              </Link>
            </NavbarMenu>
          </Box>
          <Box sx={{flexGrow: 1, flexDirection: "row", alignItems: "center", display: { xs: "flex", md: "none" }}}>
            <CatchingPokemonIcon
              sx={{ mr: 1 }}
            />
            <Link href="/" passHref>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                PokeTeam
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "middle",
            }}
          >
            {userTeam != null ? (
              <Link href={`/team/${userTeam?.userName}`} passHref>
                <Button onClick={handleCloseNavMenu} sx={navLinkStyle}>
                  My Team
                </Button>
              </Link>
            ) : null}
            <Link href={`/trainers`} passHref>
              <Button onClick={handleCloseNavMenu} sx={navLinkStyle}>
                Trainers
              </Button>
            </Link>
            <Login
              sx={{
                ml: "auto",
                display: "flex",
                flexDirection: "row",
                my: 2,
                mr: 2,
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 0, display: { md: "none" } }}>
            <Tooltip title="Login">
              <IconButton onClick={handleToggleLoginMenu} sx={{ p: 0 }}>
                <AccountCircle sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
      <Login
        sx={{
          display: { xs: loginVisible === true ? "flex" : "none", md: "none" },
          flexDirection: "row",
          justifyContent: "center",
          mx: 1,
          my: 2,
        }}
      />
    </AppBar>
  );
};

export default Navbar;
