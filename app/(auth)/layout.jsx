const AuthLayout = ({ children }) => {

    return (<>
        <div className="container w-full flex">
                {children}
        </div>
    </>)
}

export default AuthLayout;