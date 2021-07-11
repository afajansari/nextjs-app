import React from "react";
import { StylesProvider } from "@material-ui/core/styles";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";

const StyledAvatar = styled(Avatar)`
  background: orange;
  color: #000;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  &:hover {
    background-color: #5469d4;
    color: #fff;
  }
`;

export default function About() {
  return (
  
    <div>
      <Avatar />
      <StyledAvatar />
    </div>
  )
}