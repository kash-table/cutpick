const Logout = () => {
    sessionStorage.clear();
    document.location.href = "/";
}

export default Logout;