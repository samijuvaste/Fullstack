interface HeaderProps {
    courseName: string;
}

const Header = (props: HeaderProps) => (
    <h1>{props.courseName}</h1>
);

export default Header;