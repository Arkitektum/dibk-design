// Dependencies
import type { ReactNode } from "react";

// Components
import Container from "./Container";

// Stylesheets
import style from "./Footer.module.scss";

export interface FooterProps {
    children?: ReactNode;
}

const Footer = ({ children }: FooterProps) => {
    return (
        <footer className={style.footer}>
            <Container>{children}</Container>
        </footer>
    );
};

export default Footer;
